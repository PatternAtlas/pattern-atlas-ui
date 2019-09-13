import { Injectable } from '@angular/core';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import Loader from 'src/app/core/model/loader';
import LinkData from '../model/link-data';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
/**
 * Loads information of a given link URI.
 */
export class LinkInfoLoaderService extends Loader<LinkData> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  async loadContentFromStore(uri?: string): Promise<Map<string, LinkData>> {
    return this.selectContentFromStore(uri)
      .then(triples => this.mapTriples(triples, uri));
  }

  async getGraphs(): Promise<Array<string>> {
    const graphs = new Set<string>([
      IriConverter.getFileName(this.supportedIRI)
    ]);
    // add imports from base file
    const imports = await this.pos.getOWLImports(IriConverter.getFileName(this.supportedIRI));
    imports.map(i => i.import.value).forEach(i => graphs.add(i));

    // get views
    const qV = `SELECT DISTINCT ?view
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
      }`;
    const views = await this.pos.exec(qV, Array.from(graphs));
    views.map(i => i.view.value).forEach(i => {
      const u = IriConverter.getFileName(i);
      graphs.add(u);
      graphs.add(`${u}/${this.getLang(u)}-Relations`);
    });

    // get involved language uris
    const q = `SELECT DISTINCT ?graph
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
        ?view pp:containsPatternGraph ?graph .
      }`;
    const languages = await this.pos.exec(q, Array.from(graphs));
    languages.map(i => i.graph.value).forEach(i => graphs.add(IriConverter.getFileName(i)));

    // add pattern and relations
    const ontology = IriConverter.getFileName(this.supportedIRI);
    graphs.add(`${ontology}/${this.getLang(ontology)}-Patterns`);
    graphs.add(`${ontology}/${this.getLang(ontology)}-Relations`);

    languages.map(i => i.graph.value).forEach(i => {
      const u = IriConverter.getFileName(i);
      graphs.add(`${u}/${this.getLang(u)}-Patterns`);
      graphs.add(`${u}/${this.getLang(u)}-Relations`);
    });

    return Array.from(graphs);
  }

  // get last part of language uri, add it with -Patterns and -Relations postfix
  private getLang(uri: string): string {
    const parts = uri.split('/');
    const lang = parts[parts.length - 1];
    return lang;
  }

  async selectContentFromStore(uri?: string): Promise<any> {
    if (!uri) {
      return Promise.resolve();
    }

    // get all information about link
    const qry = `SELECT ?sourcePatternUri ?sourcePatternName ?targetPatternUri ?targetPatternName ?description
      WHERE {
        <${uri}> <https://purl.org/patternpedia#hasSource> ?sourcePatternUri .
        ?sourcePatternUri <https://purl.org/patternpedia#hasName> ?sourcePatternName .
        <${uri}> <https://purl.org/patternpedia#hasTarget> ?targetPatternUri .
        ?targetPatternUri <https://purl.org/patternpedia#hasName> ?targetPatternName .
        OPTIONAL { <${uri}> <https://purl.org/patternpedia#hasDescription> ?description }
      }`;

    const graphs = await this.getGraphs();

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, LinkData>> {
    const data: any = {};

    // multiple triples only if multiple description values. Other fields are the same for all triple
    for (const t of triples) {
      data.sourcePatternUri = t.sourcePatternUri.value;
      data.sourcePatternName = t.sourcePatternName.value;
      data.targetPatternUri = t.targetPatternUri.value;
      data.targetPatternName = t.targetPatternName.value;

      if (!data.descriptions) {
        data.descriptions = [];
      }

      if (t.description && t.description.value) {
        data.descriptions.push(t.description.value);
      }
    }

    const result = new Map<string, LinkData>();
    result.set(uri, {
      sourcePattern: {
        id: IriConverter.convertIriToId(data.sourcePatternUri),
        name: data.sourcePatternName
      },
      targetPattern: {
        id: IriConverter.convertIriToId(data.targetPatternUri),
        name: data.targetPatternName
      },
      descriptions: data.descriptions
    });

    return Promise.resolve(result);
  }
}

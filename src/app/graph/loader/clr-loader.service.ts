import { Relation, LanguageRelation } from 'src/app/graph/model';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import Loader from 'src/app/core/model/loader';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class ClrLoaderService extends Loader<LanguageRelation> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  // load all CLRs that contain the given Pattern URI
  async loadContentFromStore(uri?: string): Promise<Map<string, LanguageRelation>> {
    return this.selectContentFromStore(uri)
            .then(
                triples => this.mapTriples(triples, uri)
            );
  }

  async getGraphs(): Promise<Array<string>> {
    const graphs = [ 'https://purl.org/patternpedia' ];

    if (!this.supportedIRI) {
      throw new Error('supportedIRI has not been initialized! Make sure to set the language URI before loading');
    }

    // all from given language
    const uri = IriConverter.getFileName(this.supportedIRI);
    const index = uri.lastIndexOf('/') + 1;

    const base = uri;
    const p = `${uri}/${uri.substr(index)}-Patterns`;
    const r = `${uri}/${uri.substr(index)}-Relations`;

    graphs.push(base, p, r);


    // all from referenced views
    const viewsQry = `SELECT DISTINCT ?view
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
      }`;
    const views = await this.pos.exec(viewsQry, graphs);
    views.map(t => t.view.value).forEach(u => {
      const uri = IriConverter.getFileName(u);
      const index = uri.lastIndexOf('/') + 1;
      graphs.push(uri);
      graphs.push(`${uri}/${uri.substr(index)}-Relations`);
    });


    // all from languges contained in the referred views
    const othersQry = `SELECT DISTINCT ?other
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
        ?view pp:containsPatternGraph ?other .
      }`;
    const others = await this.pos.exec(othersQry, graphs);
    others.map(t => t.other.value).forEach(u => {
      const uri = IriConverter.getFileName(u);
      const index = uri.lastIndexOf('/') + 1;
      graphs.push(uri);
      graphs.push(`${uri}/${uri.substr(index)}-Patterns`);
      graphs.push(`${uri}/${uri.substr(index)}-Relations`);
    });

    return Promise.resolve(graphs);
  }

  async selectContentFromStore(uri?: string): Promise<any> {
    // execute the query on:
    // patternpedia, both languages (complete) and the view
    const start = Date.now();
    const graphs = await this.getGraphs();
    const millis = Date.now() - start;
    console.log(`getGraphs: ${millis}ms`);

    // this query gets all CLRs that contain the given pattern uri either as source or target
    // it also returns the URI and Name of the other patternlanguage
    // basically contains everything needed for the LanguageRelation
    const qry = `SELECT DISTINCT ?otherLangUri ?otherLangName ?linkUri ?sourceUri ?sourceName ?targetUri ?targetName ?desc
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
        ?view pp:containsPatternRelationDescriptor ?linkUri .
        ?linkUri pp:hasTarget ?targetUri ;
                pp:hasSource ?sourceUri .
        OPTIONAL { ?linkUri pp:hasDescription ?desc . }
        { ?otherLangUri pp:containsPattern ?sourceUri } UNION { ?otherLangUri pp:containsPattern ?targetUri }.
        ?otherLangUri pp:hasName ?otherLangName .
        ?sourceUri pp:hasName ?sourceName .
        ?targetUri pp:hasName ?targetName .
        FILTER(?sourceUri = <${uri}> || ?targetUri = <${uri}>) .
            FILTER(?otherLangUri != <${this.supportedIRI}>) .
      }`;

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, LanguageRelation>> {
    const data = new Map<string, LanguageRelation>();

    for (const t of triples) {
      const langId = IriConverter.convertIriToId(t.otherLangUri.value);
      let item = data.get(langId);
      if (!item) {
        item = {
          languageId: langId,
          languageName: t.otherLangName.value,
          relations: []
        };
        data.set(langId, item);
      }

      // check if given uri is source or target
      const source = t.sourceUri.value;
      const target = t.targetUri.value;

      const temp: any = {};

      if (uri === source) {
        // target pattern is relevant
        temp.label = t.targetName.value;
        temp.patternId = IriConverter.convertIriToId(t.targetUri.value);
        temp.outgoing = true;
      } else if (uri === target) {
        // source pattern is relevant
        temp.label = t.sourceName.value;
        temp.patternId = IriConverter.convertIriToId(t.sourceUri.value);
        temp.outgoing = false;
      }

      const relation: Relation = {
        relationId: IriConverter.convertIriToId(t.linkUri.value),
        label: temp.label,
        patternId: temp.patternId,
        direction: temp.outgoing ? 'outgoing' : 'incoming',
        hasDescription: (t.desc) ? true : false
      };

      item.relations.push(relation);
    }

    return Promise.resolve(data);
  }
}

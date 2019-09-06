import { PatternOntologyService } from './../../core/service/pattern-ontology.service';
import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { Relation } from '../model';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
/**
 * Loads all outgoing links of a given pattern uri within its same language.
 * Outgoing links are directed relations that specify the given pattern as source.
 */
export class OutgoingLinkLoaderService extends Loader<Relation> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  async loadContentFromStore(uri?: string): Promise<Map<string, Relation>> {
    return this.selectContentFromStore(uri)
            .then(
                triples => this.mapTriples(triples, uri)
            );
  }

  getGraphs(): Array<string> {
    if (!this.supportedIRI) {
      throw new Error('supportedIRI has not been initialized! Make sure to set the language URI before loading');
    }

    const uri = IriConverter.getFileName(this.supportedIRI);

    // we cut the patternlanguage of the set supportedIRI to create the uris of the patterns and relations file
    const index = uri.lastIndexOf('/');

    const base = uri;
    const p = `${uri}/${uri.substr(index)}-Patterns`;
    const r = `${uri}/${uri.substr(index)}-Relations`;

    return ['https://purl.org/patternpedia', base, p, r];
  }

  async selectContentFromStore(uri?: string): Promise<any> {
    // we need a specific pattern of form 'pattern#Pattern'
    if (!uri) {
      return Promise.resolve();
    }

    const graphs = this.getGraphs();

    // we need the uri of the referenced pattern in order to retrieve the pattern name
    const uriQry = `SELECT ?targetUri
      WHERE {
        ?targetLink a <https://purl.org/patternpedia#DirectedPatternRelationDescriptor> ;
              <https://purl.org/patternpedia#hasSource> <${uri}> ;
              <https://purl.org/patternpedia#hasTarget> ?targetUri .
      }`;
    const patterns = await this.executor.exec(uriQry, graphs);

    // get all information about the given pattern uri
    const qry = `SELECT ?targetUri ?targetName ?linkUri ?description
      WHERE {
        ?linkUri a <https://purl.org/patternpedia#DirectedPatternRelationDescriptor> ;
              <https://purl.org/patternpedia#hasSource> <${uri}> ;
              <https://purl.org/patternpedia#hasTarget> ?targetUri .
        ?targetUri <https://purl.org/patternpedia#hasName> ?targetName .
        OPTIONAL { ?linkUri <https://purl.org/patternpedia#hasDescription> ?description }
      }`;


    for (const entry of patterns) {
      graphs.push(IriConverter.getFileName(entry.targetUri.value));
    }

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, Relation>> {
    const data = [];

    for (const t of triples) {
      const item: Relation = {
        relationId: IriConverter.convertIdToIri(t.linkUri.value),
        label: t.targetName.value,
        patternId: IriConverter.convertIriToId(t.targetUri.value),
        direction: 'outgoing',
        hasDescription: t.description ? true : false
      };

      data.push(item);
    }

    const result = new Map<string, any>();
    for (const item of data) {
      result.set(item.patternId, item);
    }

    return Promise.resolve(result);
  }
}

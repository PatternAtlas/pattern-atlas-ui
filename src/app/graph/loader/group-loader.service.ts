import { PatternOntologyService } from './../../core/service/pattern-ontology.service';
import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import Group from '../model/group';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
/**
 * Loads all the hyperedges of the given language uri representing groups of patterns.
 */
export class GroupLoaderService extends Loader<Group> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
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

    return [base, p, r];
  }

  async selectContentFromStore(): Promise<any> {
    // select all hyperedges that represent groups of patterns
    const qry = `SELECT ?uri ?group ?pattern
      WHERE {
          ?uri <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://purl.org/patternpedia#PatternSetRelationDescriptor> .
          ?uri <https://purl.org/patternpedia#hasLabel> ?group .
          ?uri <https://purl.org/patternpedia#hasPattern> ?pattern .
      }`;

    const graphs = this.getGraphs();
    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any): Promise<Map<string, Group>> {
    const data: Array<Group> = [];
    for (const t of triples) {
      let item = data.find(i => i.uri === t.uri.value);

      // create new group if there is no for current uri
      if (!item) {
        item = new Group();
        item.uri = t.uri.value;
        item.groupName = t.group.value;
        item.patterns = [];

        data.push(item);
      }

      // add pattern to group
      item.patterns.push(IriConverter.convertIriToId(t.pattern.value));
    }

    // there is no group class as we need to inject the data into the individual patterns later on
    const result = new Map<string, any>();
    for (const i of data) {
      result.set(i.uri, i);
    }
    return Promise.resolve(result);
  }
}

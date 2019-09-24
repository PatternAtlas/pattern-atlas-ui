import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class GroupLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns#EnterpriseApplicationArchitecturePatterns', pos);
  }

  async selectContentFromStore(): Promise<any> {
    const qry = `SELECT ?uri ?group ?pattern
      WHERE {
        ?uri <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://purl.org/patternpedia#PatternSetRelationDescriptor> .
        ?uri <https://purl.org/patternpedia#hasLabel> ?group .
        ?uri <https://purl.org/patternpedia#hasPattern> ?pattern .
      }`;

    const graphs = [
      'https://purl.org/patternpedia',
      'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns',
      'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns/enterpriseapplicationarchitecturepatterns-Patterns',
      'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns/enterpriseapplicationarchitecturepatterns-Relations'
    ];

    return this.pos.exec(qry, graphs);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {
    const data = [];
    for (const t of triples) {
      let item = data.find(i => i.uri === t.uri.value);

      // create new group if there is no for current uri
      if (!item) {
        item = {
          uri: t.uri.value,
          groupName: t.group.value,
          patterns: []
        };

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

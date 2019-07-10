import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternsGroupLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) { 
    super('http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns', pos);
  }

  async selectContentFromStore(): Promise<any> {
    // select all hyperedges that represent groups of patterns
    const qry = `SELECT ?uri ?group ?pattern
      WHERE {
          ?uri <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/links#EnterpriseIntegrationPatternRelationDescriptor> .
          ?uri <http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#hasLabel> ?group .
          ?uri <http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#hasPattern> ?pattern .
      }`;

    return this.executor.exec(qry, ["http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/links"]);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {
    /*
    triples is list of objects with:
    {
      group: {
        token: 'literal',
        type: 'string',
        value: string - group name
      },
      pattern: {
        token: 'uri',
        value: string - uri of the pattern in the group
      },
      uri: {
        token: 'uri',
        value: string - uri of the group object
      }
    }
    we combine the data into following structure:
    [
      {
        uri: string - uri of the group,
        groupName: string - group name,
        patterns: [
          list of ids of the patterns contained in the group
        ]
      },
      next group ...
    ]
    */
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

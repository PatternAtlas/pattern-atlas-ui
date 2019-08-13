import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import EnterpriseIntegrationPattern from '../model/enterprise-integration-pattern';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternsLoaderService extends Loader<EnterpriseIntegrationPattern> {

  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns', pos);
  }

  async selectContentFromStore(): Promise<any> {
    // get all patterns from the language as listed in the "containsPattern" predicate
    const qryPatterns = `SELECT DISTINCT ?pattern
      WHERE {
        <${this.supportedIRI}> <https://purl.org/patternpedia#containsPattern> ?pattern .
      }`;
    const patterns = await this.executor.exec(qryPatterns, [IriConverter.getFileName(this.supportedIRI)]);

    // select all information of the individual patterns
    const qry = `SELECT ?pattern ?name ?description
      WHERE {
        ?pattern a <https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPattern> .
        ?pattern <https://purl.org/patternpedia#hasName> ?name .
        ?pattern <https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#hasDescription> ?description .
      }`;

    // const qry = `SELECT ?s ?p ?o
    //   WHERE {
    //     ?s ?p ?o
    //   }`;

    // graphs is a list containing all the ontology uris of the language with all its patterns
    const graphs = [IriConverter.getFileName(this.supportedIRI)];
    for (const entry of patterns) {
      // patterns contains list of objects with field pattern via the query above (qryPatterns)
      graphs.push(IriConverter.getFileName(entry.pattern.value));
    }
    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any): Promise<Map<string, EnterpriseIntegrationPattern>> {
    /*
    list contains objects of type:
    {
      description: {
        token: 'literal', 
        type: string,
        value: 'One description item of the pattern'
      },
      name: {
        token: 'literal',
        type: string,
        value: 'The name of the pattern'
      },
      pattern: {
        token: 'uri',
        value: 'the uri of the pattern'
      }
    }
    */
    /* 
    we need to collect all patterns by uri and map them with their data as
    {
      'pattern uri': {
        uri: 'uri again, might be easier as CCP also does it', 
        name: 'name as string',
        description: [string] // all descriptions collected in array
      },
      next pattern ...
    }
    */
    const data = {};
    for (const t of triples) {
      let uri = t.pattern.value;

      // create new entry for current pattern if non existent
      if (!data[uri]) {
        data[uri] = {
          uri: uri,
          name: null,
          description: []
        };
      }

      // set name
      if (!data[uri].name) {
        data[uri].name = t.name.value;
      }

      // add description
      data[uri].description.push(t.description.value);
    }

    // use combined data to create instances of EnterpriseIntegrationPattern class
    const result = new Map<string, EnterpriseIntegrationPattern>();
    for (const p of Object.keys(data)) {
      const eip = new EnterpriseIntegrationPattern(
        data[p].uri,
        data[p].name,
        data[p].description
      );

      result.set(eip.id, eip);
    }

    return Promise.resolve(result);
  }
}

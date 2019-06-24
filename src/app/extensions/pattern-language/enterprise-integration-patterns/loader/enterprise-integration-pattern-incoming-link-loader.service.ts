import { Injectable } from '@angular/core';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import Loader from 'src/app/core/model/loader';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternIncomingLinkLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) { 
    super('http://purl.org/patternpedia/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns', pos);
  }

  loadContentFromStore(uri?: string): Promise<Map<string, any>> {
    return this.selectContentFromStore(uri)
            .then(
                triples => this.mapTriples(triples, uri)
            );
  }

  async selectContentFromStore(uri?: string): Promise<any> {
    // we need a specific pattern of form 'pattern#Pattern'
    if (!uri) return Promise.resolve();

    // get all information about the given pattern uri
    const qry = `SELECT ?sourceUri ?sourceName
      WHERE {
        ?sourceLink a <http://purl.org/patternpedia/enterpriseintegrationpatterns#EnterpriseIntegrationPatternDirectedRelationDescriptor> ;
              <http://purl.org/patternpedia#hasTarget> <${uri}> ;
              <http://purl.org/patternpedia#hasSource> ?sourceUri .
        ?sourceUri <http://purl.org/patternpedia#hasName> ?sourceName .
      }`;
    
    const graphs = [IriConverter.getFileName(this.supportedIRI), IriConverter.getFileName(uri)];

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, any>> {
    /*
    triples are objects of form:
    {
      sourceUri: {
        token: "uri",
        value: string - uri of the source pattern
      },
      sourceName: {
        token: "literal",
        type: string,
        value: string - the name of the source pattern
      }
    }

    we convert the given triples to the following object:
    {
      id: string - the uri of the source pattern,
      name: string - the name of the source pattern
    }
    */
    const data = [];

    for (const t of triples) {
      let item = {
        id: t.sourceUri.value,
        name: t.sourceName.value
      };

      data.push(item);
    }

    const result = new Map<string, any>();
    for (const item of data) {
      result.set(item.id, item);
    }
    
    return Promise.resolve(result);
  }
}

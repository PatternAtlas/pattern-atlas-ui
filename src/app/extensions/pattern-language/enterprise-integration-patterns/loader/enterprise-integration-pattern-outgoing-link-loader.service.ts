import { Injectable } from '@angular/core';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { IriConverter } from 'src/app/core/util/iri-converter';
import Loader from 'src/app/core/model/loader';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternOutgoingLinkLoaderService extends Loader<any> {

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
    const qry = `SELECT ?targetUri ?targetName
      WHERE {
        ?targetLink a <http://purl.org/patternpedia/enterpriseintegrationpatterns#EnterpriseIntegrationPatternDirectedRelationDescriptor> ;
              <http://purl.org/patternpedia#hasTarget> <${uri}> ;
              <http://purl.org/patternpedia#hasSource> ?targetUri .
        ?targetUri <http://purl.org/patternpedia#hasName> ?targetName .
      }`;
    
    const graphs = [IriConverter.getFileName(this.supportedIRI), IriConverter.getFileName(uri), 'http://purl.org/patternpedia/cloudcomputingpatterns'];

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, any>> {
    /*
    triples are objects of form:
    {
      targetUri: {
        token: "uri",
        value: string - uri of the target pattern
      },
      targetName: {
        token: "literal",
        type: string,
        value: string - the name of the target pattern
      }
    }

    we convert the given triples to the following object:
    {
      id: string - the id of the target pattern derived from the uri,
      name: string - the name of the target pattern
    }
    */
    const data = [];

    for (const t of triples) {
      let item = {
        id: IriConverter.convertIriToId(t.targetUri.value),
        name: t.targetName.value
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

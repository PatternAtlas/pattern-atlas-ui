import { Injectable } from '@angular/core';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import Loader from 'src/app/core/model/loader';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternIncomingLinkLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) { 
    super('http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns', pos);
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

    // we need the uri of the referenced pattern in order to retrieve the pattern name
    const uriQry = `SELECT ?sourceUri
      WHERE {
        ?targetLink a <http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/links#EnterpriseIntegrationPatternDirectedRelationDescriptor> ;
              <http://purl.org/patternpedia#hasTarget> <${uri}> ;
              <http://purl.org/patternpedia#hasSource> ?sourceUri .
      }`;
    const patterns = await this.executor.exec(uriQry, [IriConverter.getFileName(this.supportedIRI), IriConverter.getFileName(uri), 'http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/links']);

    // get all information about the given pattern uri
    const qry = `SELECT ?sourceUri ?sourceName
      WHERE {
        ?sourceLink a <http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/links#EnterpriseIntegrationPatternDirectedRelationDescriptor> ;
              <http://purl.org/patternpedia#hasTarget> <${uri}> ;
              <http://purl.org/patternpedia#hasSource> ?sourceUri .
        ?sourceUri <http://purl.org/patternpedia#hasName> ?sourceName .
      }`;
    
    const graphs = [IriConverter.getFileName(this.supportedIRI), IriConverter.getFileName(uri), 'http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/links'];
    for (const entry of patterns) {
      graphs.push(IriConverter.getFileName(entry.sourceUri.value));
    }

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
      id: string - the id of the source pattern derived from the uri,
      name: string - the name of the source pattern
    }
    */
    const data = [];

    for (const t of triples) {
      let item = {
        id: IriConverter.convertIriToId(t.sourceUri.value),
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

import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternsLinkInfoLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) { 
    super('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns', pos);
  }

  loadContentFromStore(uri? : string): Promise<Map<string, any>> {
    return this.selectContentFromStore(uri)
      .then(triples => this.mapTriples(triples, uri));
  }

  async selectContentFromStore(uri?: string): Promise<any> {
    if(!uri) return Promise.resolve();

    // get source and target nodes first
    const patternQry = `SELECT ?sourceUri ?targetUri
      WHERE {
        <${uri}> <https://purl.org/patternpedia#hasSource> ?sourceUri .
        <${uri}> <https://purl.org/patternpedia#hasTarget> ?targetUri .
      }`;
    const patterns = await this.executor.exec(patternQry, [this.supportedIRI]);

    // get all information about link
    const qry = `SELECT ?sourcePatternUri ?sourcePatternName ?targetPatternUri ?targetPatternName ?description
      WHERE {
        <${uri}> <https://purl.org/patternpedia#hasSource> ?sourcePatternUri .
        ?sourcePatternUri <https://purl.org/patternpedia#hasName> ?sourcePatternName .
        <${uri}> <https://purl.org/patternpedia#hasTarget> ?targetPatternUri .
        ?targetPatternUri <https://purl.org/patternpedia#hasName> ?targetPatternName .
        OPTIONAL { <${uri}> <https://purl.org/patternpedia#hasDescription> ?description }
      }`;

    const graphs = [this.supportedIRI];
    patterns.forEach(p => {
      // uri of the source pattern (for name)
      graphs.push(IriConverter.getFileName(p.sourceUri.value));
      // uri of the target pattern (for name)
      graphs.push(IriConverter.getFileName(p.targetUri.value));
    });

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, any>> {
    const data: any = {};

    // multiple triples only if multiple description values. Other fields are the same for all triple
    for (let t of triples) {
      data.sourcePatternUri = t.sourcePatternUri.value;
      data.sourcePatternName = t.sourcePatternName.value;
      data.targetPatternUri = t.targetPatternUri.value;
      data.targetPatternName = t.targetPatternName.value;

      if (!data.descriptions)
        data.descriptions = [];
      
      if (t.description && t.description.value) 
        data.descriptions.push(t.description.value)
    }

    const result = new Map<string, any>();
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

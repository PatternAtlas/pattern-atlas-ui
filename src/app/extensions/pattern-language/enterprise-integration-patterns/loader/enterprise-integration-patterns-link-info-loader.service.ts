import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import LinkInfo from '../model/link-info';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternsLinkInfoLoaderService extends Loader<LinkInfo> {

  constructor(private pos: PatternOntologyService) { 
    super('http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/links', pos);
  }

  loadContentFromStore(uri? : string): Promise<Map<string, any>> {
    return this.selectContentFromStore(uri)
      .then(triples => this.mapTriples(triples, uri));
  }

  async selectContentFromStore(uri?: string): Promise<any> {
    if(!uri) return Promise.resolve();

    // get source and target nodes first
    const patternQry = `
      SELECT ?sourceUri ?targetUri
      WHERE {
        ${uri} <http://purl.org/patternpedia#hasSource> ?sourceUri .
        ${uri} <http://purl.org/patternpedia#hasTarget> ?targetUri .
      }`;
    const patterns = await this.executor.exec(patternQry, [this.supportedIRI]);

    // get all information about link
    const qry = `
      SELECT ?sourcePatternUri ?sourcePatternName ?targetPatternUri ?targetPatternName ?description
      WHERE {
        ${uri} <http://purl.org/patternpedia#hasSource> ?sourcePatternUri .
        ?sourcePatternUri <http://purl.org/patternpedia#hasName> ?sourcePatternName .
        ${uri} <http://purl.org/patternpedia#hasTarget> ?targetPatternUri .
        ?targetPatternUri <http://purl.org/patternpedia#hasName> ?targetPatternName .
        OPTIONAL { ${uri} <http://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#hasDescription> ?description }
      }`;

    const graphs = [this.supportedIRI];
    patterns.forEach(p => {
      // uri of the source pattern (for name)
      graphs.push(p.sourceUri.value);
      // uri of the target pattern (for name)
      graphs.push(p.targetUri.value);
    });

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, LinkInfo>> {
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

    // determining the current and linked pattern
    let currPatternId, currPatternName, linkedPatternId, linkedPatternName;
    let direction;

    if (data.sourcePatternUri === uri) {
      currPatternId = IriConverter.convertIriToId(data.sourcePatternUri);
      currPatternName = data.sourcePatternName;
      linkedPatternId = IriConverter.convertIriToId(data.targetPatternUri);
      linkedPatternName = data.targetPatternName;
      direction = 'outgoing';
    } else if (data.targetPatternUri === uri) {
      linkedPatternId = IriConverter.convertIriToId(data.sourcePatternUri);
      linkedPatternName = data.sourcePatternName;
      currPatternId = IriConverter.convertIriToId(data.targetPatternUri);
      currPatternName = data.targetPatternName;
      direction = 'incoming';
    }


    const result = new Map<string, LinkInfo>();
    result.set(uri, {
      currPattern: {
        id: currPatternId,
        name: currPatternName
      },
      linkedPattern: {
        id: linkedPatternId,
        name: linkedPatternName
      },
      descriptions: data.descriptions,
      direction: direction
    });

    return Promise.resolve(result);
  }
}

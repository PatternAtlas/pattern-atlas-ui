import { Injectable } from '@angular/core';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import Loader from 'src/app/core/model/loader';
import { IriConverter } from 'src/app/core/util/iri-converter';
import { Relation } from 'src/app/graph/model';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternIncomingLinkLoaderService extends Loader<Relation> {

  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns', pos);
  }

  loadContentFromStore(uri?: string): Promise<Map<string, any>> {
    return this.selectContentFromStore(uri)
            .then(
                triples => this.mapTriples(triples, uri)
            );
  }

  async selectContentFromStore(uri?: string): Promise<any> {
    // we need a specific pattern of form 'pattern#Pattern'
    if (!uri) {
      return Promise.resolve();
    }

    const graphs = [
      'https://purl.org/patternpedia',
      'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns',
      'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Patterns',
      'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Relations'
    ];

    // we need the uri of the referenced pattern in order to retrieve the pattern name
    const uriQry = `SELECT ?sourceUri
      WHERE {
        ?targetLink a <https://purl.org/patternpedia#DirectedPatternRelationDescriptor> ;
              <https://purl.org/patternpedia#hasTarget> <${uri}> ;
              <https://purl.org/patternpedia#hasSource> ?sourceUri .
      }`;
    const patterns = await this.executor.exec(uriQry, graphs);

    // get all information about the given pattern uri
    const qry = `SELECT ?sourceUri ?sourceName ?linkUri ?description
      WHERE {
        ?linkUri a <https://purl.org/patternpedia#DirectedPatternRelationDescriptor> ;
              <https://purl.org/patternpedia#hasTarget> <${uri}> ;
              <https://purl.org/patternpedia#hasSource> ?sourceUri .
        ?sourceUri <https://purl.org/patternpedia#hasName> ?sourceName .
        OPTIONAL { ?linkUri <https://purl.org/patternpedia#hasDescription> ?description }
      }`;

    for (const entry of patterns) {
      graphs.push(IriConverter.getFileName(entry.sourceUri.value));
    }

    // graphs.push('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns');
    // graphs.push('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Patterns');
    // graphs.push('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Relations');

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, Relation>> {
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
      },
      linkUri: {
        token: "uri",
        value: string - the uri of the link itself
      },
      description: {
        token: "literal",
        type: string,
        value: string - the description or undefined since optional
      }
    }

    we convert the given triples to LinkInfo
    */
    const data = [];

    for (const t of triples) {
      const item: Relation = {
        relationId: IriConverter.convertIdToIri(t.linkUri.value),
        label: t.sourceName.value,
        patternId: IriConverter.convertIriToId(t.sourceUri.value),
        direction: 'incoming',
        hasDescription: t.description ? true : false
      };

      data.push(item);
    }

    const result = new Map<string, Relation>();
    for (const item of data) {
      result.set(item.patternId, item);
    }

    return Promise.resolve(result);
  }
}

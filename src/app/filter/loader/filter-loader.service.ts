import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
/**
 * Loads all properties from a pattern of the triplestore that have a xsd:string type restriction.
 * Example: If a pattern defines a property 'hasName' to be a xsd:string, the loader will return 'name'.
 */
export class FilterLoaderService extends Loader<any> {
  
  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia', pos);
  }

  async loadContentFromStore(patternlanguageUri?: string): Promise<Map<string, any>> {
    return this.selectContentFromStore(patternlanguageUri)
            .then(
                triples => this.mapTriples(triples, patternlanguageUri)
            );
  }

  async selectContentFromStore(patternlanguageUri?: string): Promise<any> {
    const query = `SELECT DISTINCT ?predicate
      WHERE {
        {
          ?class <http://www.w3.org/2001/XMLSchema#subClassOf> pp:Pattern .
        }
        UNION
        { 
          ?predicate a <http://www.w3.org/2002/07/owl#DataProperty> .
          ?class <http://www.w3.org/2000/01/rdf-schema#subClassOf> [ a <http://www.w3.org/2002/07/owl#Restriction> ;
            <http://www.w3.org/2002/07/owl#onProperty> ?predicate ;
            <http://www.w3.org/2002/07/owl#allValuesFrom> | <http://www.w3.org/2002/07/owl#onDataRange> <http://www.w3.org/2001/XMLSchema#string> ] .
        }
        UNION
        {
          ?class <http://www.w3.org/2000/01/rdf-schema#subClassOf> ?pp .
          ?pp a <http://www.w3.org/2002/07/owl#Class> .
          ?pp <http://www.w3.org/2000/01/rdf-schema#subClassOf> [ a <http://www.w3.org/2002/07/owl#Restriction> ;
            <http://www.w3.org/2002/07/owl#onProperty> ?predicate ;
            <http://www.w3.org/2002/07/owl#allValuesFrom> | <http://www.w3.org/2002/07/owl#onDataRange> <http://www.w3.org/2001/XMLSchema#string> ] .
        }
      }`;

    // we need /patternpedia and /patternpedia/patternlanguages/PL for this query
    const graphs = [
      IriConverter.getFileName(this.supportedIRI),
      IriConverter.getFileName(patternlanguageUri)
    ];

    return this.executor.exec(query, graphs);
  }

  async mapTriples(triples: any, patternlanguageUri?: string): Promise<Map<string, any>> {
    const data = [];
    for (let t of triples) {
      data.push(this.crop(t.predicate.value));
    }

    const result = new Map<string, any>();
    result.set(patternlanguageUri, data);

    return Promise.resolve(result);
  }

  /**
   * Crops the given predicate uri to a simplified predicate name.
   * 
   * Example: crop('https://purl.org/patternpedia#hasName') -> 'name'
   * 
   * @param value the uri of the predicate
   */
  private crop(value: string) {
    let predicate = value.substr(value.indexOf("#")+1);
    let result = predicate.replace("has", "");
    result = result.toLowerCase();

    return result;
  }

}

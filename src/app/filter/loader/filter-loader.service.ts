import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { UriConverter } from 'src/app/core/util/uri-converter';

@Injectable({
    providedIn: 'root'
})
/**
 * Loads all properties from a patterns of the triplestore that have a xsd:string type restriction.
 * Example: If a patterns defines a property 'hasName' to be a xsd:string, the loader will return 'name'.
 */
export class FilterLoaderService extends Loader<any> {

    constructor() {
        super('https://purl.org/patternpedia', null);
    }

    async loadContentFromStore(patternlanguageUri?: string): Promise<Map<string, any>> {
        return this.selectContentFromStore(patternlanguageUri)
            .then(
                triples => this.mapTriples(triples, patternlanguageUri)
            );
    }

    async selectContentFromStore(patternlanguageUri?: string): Promise<any> {
        // select all properties that are somehow restricted to string
        // consider the class within the given uri graph as well as the possible base class 'Pattern'
        const query = `SELECT DISTINCT ?predicate
    WHERE {
      {
        ?predicate a owl:DatatypeProperty .
        pp:Pattern rdfs:subClassOf ?sub .
        ?sub a owl:Restriction .
        ?sub owl:onProperty ?predicate .
        ?sub ?typeRange xsd:string .
      }
      UNION
      {
        ?predicate a owl:DatatypeProperty .
        ?class rdfs:subClassOf pp:Pattern .
        ?class rdfs:subClassOf ?sub .
        ?sub a owl:Restriction .
        ?sub owl:onProperty ?predicate .
        ?sub ?typeRange xsd:string .
      }
    }`;

        // we need /patternpedia and /patternpedia/patternlanguages/PL for this query
        const graphs = [
            UriConverter.getFileName(this.supportedIRI),
            UriConverter.getFileName(patternlanguageUri)
        ];

        return this.executor.exec(query, graphs);
    }

    async mapTriples(triples: any, patternlanguageUri?: string): Promise<Map<string, any>> {
        const data = [];
        for (const t of triples) {
            if (t.predicate && t.predicate.value) {
                data.push(this.crop(t.predicate.value));
            }
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
        const predicate = value.substr(value.indexOf('#') + 1);
        let result = predicate.replace('has', '');
        result = result.toLowerCase();

        return result;
    }

}

import Loader from '../../model/loader';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../pattern-ontology.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultPatternLoaderService extends Loader<any> {
  patternIri = '';

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  selectContentFromStore(): Promise<any> {
    return this.pos.getPatternProperties(this.supportedIRI, this.patternIri);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {

    const sectionProperties = Array.from(triples);
    const secMap = new Map<string, string[]>();
    for (let i = 0; i < sectionProperties.length; i++) {
      if (!secMap.has(sectionProperties[i].predicate.value)) {
        secMap.set(sectionProperties[i].property.value, [sectionProperties[i].predicate.value]);
      } else {
        const valArray = secMap.get(sectionProperties[i].predicate.value);
        valArray.push(sectionProperties[i].property.value);
        secMap.set(sectionProperties[i].property.value, valArray);
      }
    }
    return Promise.resolve(secMap);
  }

}

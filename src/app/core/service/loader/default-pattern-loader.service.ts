import Loader from '../../model/loader';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../pattern-ontology.service';
import { PatternProperty } from '../data/PatternProperty.interface';

@Injectable({
  providedIn: 'root'
})
export class DefaultPatternLoaderService extends Loader<any> {
  patternIri = '';

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  selectContentFromStore(): Promise<PatternProperty[]> {
    return this.pos.getPatternProperties(this.supportedIRI, this.patternIri);
  }

  mapTriples(sectionProperties: PatternProperty[]): Promise<Map<string, any>> {
    const secMap = new Map<string, string[]>();
    for (let i = 0; i < sectionProperties.length; i++) {
      const newValue = sectionProperties[i];
      secMap.set(newValue.property.value, secMap.has(newValue.property.value) ?
        secMap.get(newValue.property.value).concat(newValue.predicate.value) : [newValue.predicate.value]);
    }
    return Promise.resolve(secMap);
  }

}

import Loader from '../../model/loader';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../pattern-ontology.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultPatternLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  selectContentFromStore(): Promise<any> {
    return this.pos.getPatternProperties(this.supportedIRI);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {
    const map = new Map<string, any>();
    triples.map(x => map.set(x, x));
    return Promise.resolve(map);
  }

}

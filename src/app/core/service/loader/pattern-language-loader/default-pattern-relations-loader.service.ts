import { Injectable } from '@angular/core';
import Loader from '../../../model/loader';
import { PatternOntologyService } from '../../pattern-ontology.service';
import { DirectedPatternRelationDescriptorResponse } from '../../data/DirectedPatternRelationDescriptorResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class DefaultPatternRelationsLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  selectContentFromStore(): Promise<DirectedPatternRelationDescriptorResponse[]> {
    return this.pos.getDirectedPatternRelations(this.supportedIRI);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {
    return undefined;
  }

}

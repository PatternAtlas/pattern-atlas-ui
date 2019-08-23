import { Injectable } from '@angular/core';
import Loader from '../../../model/loader';
import { PatternOntologyService } from '../../pattern-ontology.service';
import { DirectedPatternRelationDescriptorResponse } from '../../data/DirectedPatternRelationDescriptorResponse.interface';
import { DirectedPatternRelationDescriptorIndividual } from '../../../model/PatternRelationDescriptorIndividual';
import Pattern from '../../../model/pattern.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultPatternRelationsLoaderService extends Loader<any> {
  mapTriples(triples: any): Promise<Map<string, any>> {
    return undefined;
  }

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  selectContentFromStore(): Promise<DirectedPatternRelationDescriptorResponse[]> {
    return this.pos.getDirectedPatternRelations(this.supportedIRI);
  }

  mapTriplesToDirectedRelationDescriptorIndividuals(triples: any, patterns: Map<string, Pattern>): Promise<Map<string, DirectedPatternRelationDescriptorIndividual[]>> {
    const relations = new Map<string, DirectedPatternRelationDescriptorIndividual[]>();
    for (const row of triples) {
      const relation = new DirectedPatternRelationDescriptorIndividual(patterns.get(row.source.value), patterns.get(row.target.value), row.description.value);
      relations.has(relation.individualName) ? relations.get(relation.individualName).concat(relation) : relations.set(relation.individualName, [relation]);
    }
    return Promise.resolve(relations);
  }

}

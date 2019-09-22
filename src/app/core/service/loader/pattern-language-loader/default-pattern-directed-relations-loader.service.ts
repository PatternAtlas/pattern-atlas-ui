import { Injectable } from '@angular/core';
import Loader from '../../../model/loader';
import { PatternOntologyService } from '../../pattern-ontology.service';
import { DirectedPatternRelationDescriptorResponse } from '../../data/DirectedPatternRelationDescriptorResponse.interface';
import { DirectedPatternRelationDescriptorIndividual } from '../../../model/directed-pattern-relation-descriptor-individual';
import Pattern from '../../../model/pattern.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultPatternDirectedRelationsLoaderService extends Loader<any> {
  patterns: Pattern[];


  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  selectContentFromStore(): Promise<DirectedPatternRelationDescriptorResponse[]> {
    return this.pos.getDirectedPatternRelations(this.supportedIRI);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {
    const relations = new Map<string, DirectedPatternRelationDescriptorIndividual>();
    for (const row of triples) {

      const relation = new DirectedPatternRelationDescriptorIndividual(this.getPatternForIri(row.source.value), this.getPatternForIri(row.target.value), row.description ? row.description.value : null);
       relations.set(relation.individualName, relation);
    }
    return Promise.resolve(relations);
  }



  private getPatternForIri(iri: string): Pattern {
    return this.patterns.find(it => it.iri === iri);
  }
}

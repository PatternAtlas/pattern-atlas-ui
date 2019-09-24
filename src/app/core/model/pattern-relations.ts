import { DirectedPatternRelationDescriptorIndividual } from './directed-pattern-relation-descriptor-individual';
import { UndirectedPatternRelationDescriptorIndividual } from './undirected-pattern-relation-descriptor-individual';

export class PatternRelations{
  constructor(directed: DirectedPatternRelationDescriptorIndividual[] = [], undirected: UndirectedPatternRelationDescriptorIndividual[] = []) {
    this.directed = directed;
    this.undirected = undirected;
  }

  directed: DirectedPatternRelationDescriptorIndividual[];
  undirected: UndirectedPatternRelationDescriptorIndividual[];
}

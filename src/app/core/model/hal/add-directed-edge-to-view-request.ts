import { DirectedEdgeModel } from './directed-edge.model';

export class AddDirectedEdgeToViewRequest {
  directedEdgeId: string;
  sourcePatternId: string;
  targetPatternId: string;
  description: string;
  type: string;
  newEdge: boolean;

  constructor(edge: DirectedEdgeModel) {
    this.directedEdgeId = edge.id ? edge.id : null;
    this.sourcePatternId = edge.sourcePatternId;
    this.targetPatternId = edge.targetPatternId;
    this.description = edge.description;
    this.type = edge.type;
    // if there is no existing edge id, this must be a new edge:
    this.newEdge = !edge.id;
  }
}

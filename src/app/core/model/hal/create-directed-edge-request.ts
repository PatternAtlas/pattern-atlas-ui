import { DirectedEdgeModel } from './directed-edge.model';

export class CreateDirectedEdgeRequest {
  targetPatternId: string;
  sourcePatternId: string;
  type: string;
  description: string;

  constructor(edge: DirectedEdgeModel) {
    this.sourcePatternId = edge.sourcePatternId;
    this.targetPatternId = edge.targetPatternId;
    this.type = edge.type;
    this.description = edge.description;
  }
}

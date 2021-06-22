import { UndirectedEdgeModel } from './undirected-edge.model';

export class AddUndirectedEdgeToViewRequest {
  undirectedEdgeId: string;
  pattern1Id: string;
  pattern2Id: string;
  description: string;
  type: string;
  newEdge: boolean;

  constructor(edge: UndirectedEdgeModel) {
    this.undirectedEdgeId = edge.id;
    this.pattern1Id = edge.pattern1Id;
    this.pattern2Id = edge.pattern2Id;
    this.description = edge.description;
    this.type = edge.type;
    // if there is no existing edge id, this must be a new edge:
    this.newEdge = !edge.id;
  }
}

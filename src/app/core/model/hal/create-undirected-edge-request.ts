import { UndirectedEdgeModel } from './undirected-edge.model';

export class CreateUndirectedEdgeRequest {
  p2Id: string;
  p1Id: string;
  type: string;
  description: string;

  constructor(edge: UndirectedEdgeModel) {
    this.p1Id = edge.pattern1Id;
    this.p2Id = edge.pattern2Id;
    this.type = edge.type;
    this.description = edge.description;
  }
}

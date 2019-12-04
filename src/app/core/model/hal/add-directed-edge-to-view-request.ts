import {DirectedEdgeModel} from './directed-edge.model';

export class AddDirectedEdgeToViewRequest {
    directedEdgeId: string;
    sourcePatternId: string;
    targetPatternId: string;
    description: string;
    type: string;
    newEdge: boolean;


    constructor(edge: DirectedEdgeModel) {
        this.directedEdgeId = edge.id;
        this.sourcePatternId = edge.sourcePatternId;
        this.targetPatternId = edge.targetPatternId;
        this.description = edge.description;
        this.type = edge.type;
    }
}

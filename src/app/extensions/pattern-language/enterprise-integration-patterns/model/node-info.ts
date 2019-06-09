import { Node } from './node'

export class NodeInfo {
    currNode: Node;

    // from current selected node to other nodes
    outgoing: Node[];
    // from other nodes to the current selected node
    incoming: Node[];

    constructor() {
        this.outgoing = [];
        this.incoming = [];
    }
}
import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
    // optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;

    // must - defining enforced implementation properties
    source: Node | string | number;
    target: Node | string | number;

    weight: string;
    description: string[];

    selected: boolean;
    preview: boolean;
    hide: boolean;

    constructor(source: string | number | Node, target: string | number | Node, weight: string = 'default', description?: string[]) {
        this.source = source;
        this.target = target;

        this.weight = weight;
        this.description = description;
    }
}

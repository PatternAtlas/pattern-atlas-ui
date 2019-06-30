
export class Node implements d3.SimulationNodeDatum {
    // optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;

    // the uri/iri of the pattern
    id: string; 

    // the name of the pattern which will be displayed
    name: string;
    // the group of the pattern
    group: string;
    // multiple descriptions
    description: string[];
    // color of the node
    color: string;

    selected: boolean;
    preview: boolean;
    hide: boolean;

    constructor(id: string) {
        this.id = id;
    }

    isPseudo() {
        return this.name.endsWith('-CLP');
    }
}

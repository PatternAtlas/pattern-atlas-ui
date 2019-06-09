
export class Node implements d3.SimulationNodeDatum {
    // optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;

    name: string;
    group: string;
    description: string[];
    color: string;

    selected: boolean;
    preview: boolean;

    constructor(name) {
        this.name = name;
    }

    isPseudo() {
        return this.name.endsWith('-CLP');
    }
}

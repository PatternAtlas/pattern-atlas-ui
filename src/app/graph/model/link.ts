import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  index?: number;

  // the id of the link as defined from the triple
  id?: string;

  // the source node
  source: Node | string | number;
  // the target node
  target: Node | string | number;

  // the type of the relation, e.g. 'see also'
  weight: string;
  description: string[];

  // state of the link
  selected: boolean;
  preview: boolean;
  hide: boolean;

  constructor(source: string | number | Node, target: string | number | Node, weight: string = 'see also', description?: string[]) {
    this.source = source;
    this.target = target;

    this.weight = weight;
    this.description = description;
  }
}

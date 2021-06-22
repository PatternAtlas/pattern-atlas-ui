export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  // the id of the patterns
  id: string;

  // the name of the patterns which will be displayed
  name: string;
  // color of the node
  color?: string;

  // status of the node
  selected: boolean;
  preview: boolean;
  hide: boolean;

  constructor(id: string) {
    this.id = id;
  }
}

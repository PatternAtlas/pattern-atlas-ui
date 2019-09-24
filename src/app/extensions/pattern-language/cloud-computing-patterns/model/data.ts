
export class Relation {
  id: string;
  sourceId: string;
  targetId: string;
  weight?: string;
  description?: Array<string>;
  isCLR: boolean;
}

export class Pattern {
  id: string;
  name: string;

  intent: string;
  context: string;
  drivingQuestion: string;
  solution: string;
  result: string;
  icon: string;
  solutionSketches: Array<string>;
  variations: Array<string>;

  relations: Array<Relation>;
}

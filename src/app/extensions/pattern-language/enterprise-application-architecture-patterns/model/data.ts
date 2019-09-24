
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
  sketch?: string;
  motivation?: string;
  relations: Array<Relation>;
}

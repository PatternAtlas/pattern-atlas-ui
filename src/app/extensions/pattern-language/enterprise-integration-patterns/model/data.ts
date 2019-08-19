
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
  description: Array<string>;
  relations: Array<Relation>;
}

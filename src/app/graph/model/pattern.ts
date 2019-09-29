import { PatternRelation } from '.';

export class Pattern {
  id: string;
  name: string;

  relations?: Array<PatternRelation>;
  // whether this pattern has any relations to patterns from other languages
  hasClrs?: boolean;
}

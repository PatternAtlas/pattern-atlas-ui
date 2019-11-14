import {PatternView} from './pattern-view.model';

export class Edge {
  description: any;

  type: string;
  patternView?: PatternView;

  constructor(description: any, type: string, patternView: PatternView = null) {
    this.description = description;
    this.type = type;
    this.patternView = patternView;
  }
}

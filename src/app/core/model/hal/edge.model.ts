import {PatternView} from './pattern-view.model';

export class Edge {
  private description: any;

  private type: string;
  patternView?: PatternView;

  constructor(description: any, type: string, patternView: PatternView = null) {
    this.description = description;
    this.type = type;
    this.patternView = patternView;
  }
}

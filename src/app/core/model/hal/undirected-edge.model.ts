import {DirectedEdgeResource} from './hal-resources.interface';
import Pattern from './pattern.model';
import PatternLanguage from './pattern-language.model';
import {PatternView} from './pattern-view.model';
import {Edge} from './edge.model';

export class UndirectedEdge extends Edge {
  p1: Pattern;
  p2: Pattern;
  patternlanguage: PatternLanguage;
  _links: DirectedEdgeResource;
  patternView?: PatternView;

  constructor(p1: Pattern, p2: Pattern, patternlanguage: PatternLanguage, description: any, type: string, patternView: PatternView = null) {
    super(description, type, patternView);
    this.p1 = p1;
    this.p2 = p2;
    this.patternlanguage = patternlanguage;
  }
}

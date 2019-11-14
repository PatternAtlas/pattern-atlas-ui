import {DirectedEdgeResource} from './hal-resources.interface';
import Pattern from './pattern.model';
import PatternLanguage from './pattern-language.model';
import {PatternView} from './pattern-view.model';

export class UndirectedEdge {
  p1: Pattern;
  p2: Pattern;
  patternlanguage: PatternLanguage;
  _links: DirectedEdgeResource;
  patternView?: PatternView;
}

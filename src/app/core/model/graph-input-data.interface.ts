import Pattern from './hal/pattern.model';
import { Edge } from './hal/edge.model';
import PatternLanguage from './hal/pattern-language.model';
import { PatternContainer } from './hal/pattern-container.model';

export interface GraphInputData {
  patterns: Pattern[];
  edges: Edge[];
  copyOfLinks: Edge[];
  patternContainer: PatternContainer;
  patternLanguage: PatternLanguage;
  patternLanguages: PatternLanguage[];
}

import { PatternContainer } from './pattern-container.model';
import PatternLanguage from './pattern-language.model';

export class Edge {
  description: any;
  id: string;
  type: string;
  patternView?: PatternContainer;
  patternlanguage?: PatternLanguage;

  constructor(description: any, type: string, patternView: PatternContainer = null, patternLanguage: PatternLanguage = null) {
    this.description = description;
    this.type = type;
    this.patternView = patternView;
    this.patternlanguage = patternLanguage;
  }
}

import PatternLanguage from './pattern-language.model';
import { PatternRelations } from './pattern-relations';
import Pattern from './pattern.model';

export interface CompletePatternlanguage {
  patternlanguage: PatternLanguage; // contains all the infos from the base file (PATTERNLANGUAGE_NAME.ttl and more)
  patternRelations: PatternRelations;
  patterns: Pattern[];
}

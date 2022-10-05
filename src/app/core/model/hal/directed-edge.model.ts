import { DirectedEdgeResource } from './hal-resources.interface';
import PatternLanguage from './pattern-language.model';
import { Edge } from './edge.model';
import { PatternContainer } from './pattern-container.model';
import Pattern from './pattern.model';

export class DirectedEdgeModel extends Edge {
  sourcePatternName: string;
  sourcePatternId: string;
  sourcePatternUri: string;
  sourcePatternLanguageId: string;
  targetPatternName: string;
  targetPatternId: string;
  targetPatternUri: string;
  targetPatternLanguageId: string;

  _links: DirectedEdgeResource;

  constructor(source: Pattern, target: Pattern, patternlanguage: PatternLanguage, description: any, type: string, patternView: PatternContainer = null) {
    super(description, type, patternView, patternlanguage);
    this.sourcePatternId = source.id;
    this.sourcePatternName = source.name;
    this.sourcePatternUri = source.uri;
    this.sourcePatternLanguageId = source.patternLanguageId;
    this.targetPatternId = target.id;
    this.targetPatternName = target.name;
    this.targetPatternUri = target.uri;
    this.targetPatternLanguageId = target.patternLanguageId
  }
}

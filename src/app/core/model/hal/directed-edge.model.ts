import {DirectedEdgeResource} from './hal-resources.interface';
import PatternLanguage from './pattern-language.model';
import {Edge} from './edge.model';
import {PatternView} from './pattern-view.model';
import Pattern from './pattern.model';

export class DirectedEdgeModel extends Edge {
    sourcePatternName: string;
    targetPatternName: string;
    sourcePatternId: string;
    targetPatternId: string;

    _links: DirectedEdgeResource;

    constructor(source: Pattern, target: Pattern, patternlanguage: PatternLanguage, description: any, type: string, patternView: PatternView = null) {
        super(description, type, patternView, patternlanguage);
        this.sourcePatternName = source.id;
        this.targetPatternName = target.id;
    }
}

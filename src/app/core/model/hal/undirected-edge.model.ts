import {DirectedEdgeResource} from './hal-resources.interface';
import Pattern from './pattern.model';
import PatternLanguage from './pattern-language.model';
import {PatternView} from './pattern-view.model';
import {Edge} from './edge.model';

export class UndirectedEdgeModel extends Edge {
    pattern1Id: string;
    pattern2Id: string;
    pattern1Name: string;
    pattern2Name: string;
    patternlanguage: PatternLanguage;
    _links: DirectedEdgeResource;
    patternView?: PatternView;

    constructor(p1: Pattern, p2: Pattern, patternlanguage: PatternLanguage, description: any, type: string, patternView: PatternView = null) {
        super(description, type, patternView, patternlanguage);
        this.pattern1Id = p1.id;
        this.pattern2Id = p2.id;
    }
}

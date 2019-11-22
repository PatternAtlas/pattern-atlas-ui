import {PatternView} from './pattern-view.model';
import PatternLanguage from './pattern-language.model';

export class Edge {
    description: any;

    type: string;
    patternView?: PatternView;
    patternlanguage?: PatternLanguage;

    constructor(description: any, type: string, patternView: PatternView = null, patternLanguage: PatternLanguage = null) {
        this.description = description;
        this.type = type;
        this.patternView = patternView;
        this.patternlanguage = patternLanguage;
    }
}

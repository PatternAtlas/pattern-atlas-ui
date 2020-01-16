import Pattern from './hal/pattern.model';
import {Edge} from './hal/edge.model';
import PatternLanguage from './hal/pattern-language.model';
import {PatternView} from './hal/pattern-view.model';

export interface GraphInputData {
    patterns: Pattern[];
    edges: Edge[];
    copyOfLinks: Edge[];
    patternLanguage: PatternLanguage;
    patternView: PatternView;
}

import Pattern from './pattern.model';
import { PatternAtlas } from './pattern-atlas.model';
import { globals } from '../../globals';


export class PatternLanguagePatterns {

  iri: string;
  plIri: string;
  patterns: Pattern[];


  constructor(iri: string, plIri: string, patterns: Pattern[]) {
    this.iri = iri;
    this.plIri = plIri;
    this.patterns = patterns;
  }

}

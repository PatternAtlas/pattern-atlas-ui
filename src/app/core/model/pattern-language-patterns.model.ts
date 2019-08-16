import Pattern from './pattern.model';
import { PatternPedia } from './pattern-pedia.model';
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

  toTurtle(): string {
    const ary = new PatternPedia().getPrefixesToTurtle(this.iri, this.plIri);


    ary.push('\n');
    ary.push(`<${this.iri}> rdf:type owl:Ontology ;`);
    ary.push(`owl:imports <${globals.urlPatternRepoOntology}>, <${this.plIri}> .`);
    ary.push('\n');


    this.patterns.forEach((pat: Pattern) => {
      ary.push(pat.toTurtle());
    });

    return ary.join('\n');

  }
}

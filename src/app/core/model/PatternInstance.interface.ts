import Pattern from './pattern.model';
import { IriConverter } from '../util/iri-converter';

/* This class models how a pattern can be reconstructed from the SPARQL queries. */
export class PatternInstance {
  uri: string;
  type: string;
  sectionProperties: Map<string, string[]>;

  constructor(uri: string = null, sectionProperties: Map<string, string[]> = null, type: string = null) {
    this.uri = uri;
    this.sectionProperties = sectionProperties;
    this.type = type;
  }


  addProperty(property: string, value: string): PatternInstance {
    this.sectionProperties.set(property, this.sectionProperties.has(property) ? this.sectionProperties.get(property).concat(value) : [value]);
    return this;
  }

  toPattern(plIri: string): Pattern {
    const nameKey = IriConverter.getFileName(plIri) + '#hasName';
    return new Pattern(this.uri, this.sectionProperties.get(nameKey).join(''), this.sectionProperties, plIri);

  }


}

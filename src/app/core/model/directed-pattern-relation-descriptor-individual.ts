import Pattern from './pattern.model';
import { PatternRelationDescriptorIndividual } from './pattern-relation-descriptor-individual';
import { UriConverter } from '../util/uri-converter';


export class DirectedPatternRelationDescriptorIndividual extends PatternRelationDescriptorIndividual {
  source: Pattern;
  target: Pattern;


  constructor(source: Pattern, target: Pattern, description: string = null, relationType: string = null,) {
    super();
    this.source = source;
    this.target = target;
    this.description = description;
    this.relationType = relationType;
    this.individualName = UriConverter.removeWhitespace(this.source.name) + '-to-' + UriConverter.removeWhitespace(this.target.name);
  }

  toTurtle(): string {
    const ary = [];
    ary.push(`:${this.individualName}`);
    ary.push(`rdf:type owl:NamedIndividual , pp:DirectedPatternRelationDescriptor ;`);
    if (this.relationType) {
      ary.push(`pp:hasRelationType "${this.relationType}"^^xsd:string ;`);
    }
    ary.push(`pp:hasSource :${UriConverter.removeWhitespace(this.source.name)} ; `);
    ary.push(`pp:hasTarget :${UriConverter.removeWhitespace(this.target.name)} ${this.description ?
      '; \n pp:hasDescription "' + this.description + '"^^xsd:string . '
      : '.'}`);
    ary.push(' ');
    return ary.join('\n');
  }

}

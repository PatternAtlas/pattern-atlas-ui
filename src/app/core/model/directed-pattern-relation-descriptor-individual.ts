import Pattern from './pattern.model';
import { PatternRelationDescriptorIndividual } from './pattern-relation-descriptor-individual';


export class DirectedPatternRelationDescriptorIndividual extends PatternRelationDescriptorIndividual{
  source: Pattern;
  target: Pattern;


  constructor(source: Pattern, target: Pattern, description: string = null) {
    super();
    this.source = source;
    this.target = target;
    this.description = description;
    this.individualName = this.source.name + '-to-' + this.target.name;
  }

  toTurtle(): string {
    const ary = [];
    ary.push(`:${this.individualName}`);
    ary.push(`rdf:type owl:NamedIndividual , pp:DirectedPatternRelationDescriptor ;`);
    ary.push(`pp:hasSource :${this.source.name} ; `);
    ary.push(`pp:hasTarget :${this.target.name} ${this.description ? '; \n pp:hasDescription "' + this.description + '"^^xsd:string . ' : '.'}`);
    ary.push(' ');
    return ary.join('\n');
  }

}

import Pattern from './pattern.model';

export class DirectedPatternRelationDescriptorIndividual {
  source: Pattern;
  target: Pattern;
  description?: string;
  individualName: string;


  constructor(source: Pattern, target: Pattern, description: string = null) {
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
    return ary.join('\n');
  }

}

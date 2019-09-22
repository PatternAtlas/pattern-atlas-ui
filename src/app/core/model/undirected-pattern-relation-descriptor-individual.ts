import Pattern from './pattern.model';
import { PatternRelationDescriptorIndividual } from './pattern-relation-descriptor-individual';


export class UndirectedPatternRelationDescriptorIndividual extends PatternRelationDescriptorIndividual{
  hasPattern: Pattern[];


  constructor(firstPattern: Pattern, secondPattern: Pattern = null, description: string = null) {
    super();
    this.hasPattern = [firstPattern, secondPattern];
    this.description = description;
    this.individualName = firstPattern.name + '-to-' + secondPattern.name;
  }

  toTurtle(): string {
    const ary = [];
    ary.push(`:${this.individualName}`);
    ary.push(`rdf:type owl:NamedIndividual , pp:UndirectedPatternRelationDescriptor ;`);
    ary.push(`pp:hasPattern :${this.hasPattern[0].name} ; `);
    ary.push(`pp:hasPattern :${this.hasPattern[1].name} ${this.description ? '; \n pp:hasDescription "' + this.description + '"^^xsd:string . ' : '.'}`);
    ary.push(' ');
    return ary.join('\n');
  }

}

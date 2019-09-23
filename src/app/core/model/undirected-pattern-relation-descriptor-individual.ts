import Pattern from './pattern.model';
import { PatternRelationDescriptorIndividual } from './pattern-relation-descriptor-individual';
import { IriConverter } from '../util/iri-converter';


export class UndirectedPatternRelationDescriptorIndividual extends PatternRelationDescriptorIndividual{
  hasPattern: Pattern[];


  constructor(firstPattern: Pattern, secondPattern: Pattern = null, description: string = null) {
    super();
    this.hasPattern = [firstPattern, secondPattern];
    this.description = description;
    this.individualName = IriConverter.removeWhitespace(firstPattern.name) + '-to-' + IriConverter.removeWhitespace(secondPattern.name);
  }

  toTurtle(): string {
    const ary = [];
    ary.push(`:${this.individualName}`);
    ary.push(`rdf:type owl:NamedIndividual , pp:UndirectedPatternRelationDescriptor ;`);
    ary.push(`pp:hasPattern :${IriConverter.removeWhitespace(this.hasPattern[0].name)} ; `);
    ary.push(`pp:hasPattern :${IriConverter.removeWhitespace(this.hasPattern[1].name)} ${this.description ? '; \n pp:hasDescription "' + this.description + '"^^xsd:string . ' : '.'}`);
    ary.push(' ');
    return ary.join('\n');
  }

}

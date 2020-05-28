import Pattern from './pattern.model';
import { PatternRelationDescriptorIndividual } from './pattern-relation-descriptor-individual';
import { UriConverter } from '../util/uri-converter';


export class UndirectedPatternRelationDescriptorIndividual extends PatternRelationDescriptorIndividual{
  hasPattern: Pattern[];


  constructor(firstPattern: Pattern, secondPattern: Pattern = null, description: string = null, relationType: string = null) {
    super();
    this.hasPattern = [firstPattern, secondPattern];
    this.description = description;
    this.relationType = relationType;
    this.individualName = UriConverter.removeWhitespace(firstPattern.name) + '-to-' + UriConverter.removeWhitespace(secondPattern.name);
  }

  toTurtle(): string {
    const ary = [];
    ary.push(`:${this.individualName}`);
    ary.push('rdf:type owl:NamedIndividual , pp:UndirectedPatternRelationDescriptor ;');
    if (this.relationType) {
      ary.push(`pp:hasRelationType "${this.relationType}"^^xsd:string ;`);
    }
    ary.push(`pp:hasPattern :${UriConverter.removeWhitespace(this.hasPattern[0].name)} ; `);
    ary.push(`pp:hasPattern :${UriConverter.removeWhitespace(this.hasPattern[1].name)} ${this.description ?
      '; \n pp:hasDescription "' + this.description + '"^^xsd:string . '
      : '.'}`);
    ary.push(' ');
    return ary.join('\n');
  }

}

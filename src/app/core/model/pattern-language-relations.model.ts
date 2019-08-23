import { PatternPedia } from './pattern-pedia.model';
import { globals } from '../../globals';
import { DirectedPatternRelationDescriptorIndividual } from './PatternRelationDescriptorIndividual';


export class PatternLanguageRelations {

  iri: string;
  plIri: string;
  relations: DirectedPatternRelationDescriptorIndividual[];


  constructor(iri: string, plIri: string, relations: DirectedPatternRelationDescriptorIndividual[]) {
    this.iri = iri;
    this.plIri = plIri;
    this.relations = relations;
  }

  toTurtle(): string {
    const ary = new PatternPedia().getPrefixesToTurtle(this.iri, this.plIri);


    ary.push('\n');
    ary.push(`<${this.iri}> rdf:type owl:Ontology ;`);
    ary.push(`owl:imports <${globals.urlPatternRepoOntology}>, <${this.plIri}> .`);
    ary.push('\n');


    this.relations.forEach((rel: DirectedPatternRelationDescriptorIndividual) => {
      ary.push(rel.toTurtle());
    });
    return ary.join('\n');

  }
}

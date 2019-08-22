import { PatternPedia } from './pattern-pedia.model';
import { globals } from '../../globals';
import { DirectedPatternRelationDescriptorResponse } from '../service/data/DirectedPatternRelationDescriptorResponse.interface';


export class PatternLanguageRelations {

  iri: string;
  plIri: string;
  relations: DirectedPatternRelationDescriptorResponse[];


  constructor(iri: string, plIri: string, relations: DirectedPatternRelationDescriptorResponse[]) {
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


    this.relations.forEach((rel: DirectedPatternRelationDescriptorResponse) => {
      ary.push(''); // rel.toTurtle());
    });

    return ary.join('\n');

  }
}

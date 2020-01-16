import { PatternAtlas } from './pattern-atlas.model';
import { globals } from '../../globals';
import { DirectedPatternRelationDescriptorIndividual } from './directed-pattern-relation-descriptor-individual';
import { UndirectedPatternRelationDescriptorIndividual } from './undirected-pattern-relation-descriptor-individual';
import { PatternRelations } from './pattern-relations';


export class PatternLanguageRelations {

  iri: string;
  plIri: string;
  relations: PatternRelations;


  constructor(iri: string, plIri: string, relations: PatternRelations) {
    this.iri = iri;
    this.plIri = plIri;
    this.relations = relations;
  }

  toTurtle(): string {
    const ary = new PatternAtlas().getPrefixesToTurtle(this.iri, this.plIri);


    ary.push('\n');
    ary.push(`<${this.iri}> rdf:type owl:Ontology ;`);
    ary.push(`owl:imports <${globals.urlPatternRepoOntology}>, <${this.plIri}> .`);
    ary.push('\n');


    this.relations.directed.forEach((rel: DirectedPatternRelationDescriptorIndividual) => {
      ary.push(rel.toTurtle());
    });
    this.relations.undirected.forEach((rel: UndirectedPatternRelationDescriptorIndividual) => {
      ary.push(rel.toTurtle());
    });
    return ary.join('\n');

  }
}

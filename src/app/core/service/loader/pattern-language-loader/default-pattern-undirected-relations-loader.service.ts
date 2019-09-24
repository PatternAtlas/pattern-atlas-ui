import { Injectable } from '@angular/core';
import Loader from '../../../model/loader';
import { PatternOntologyService } from '../../pattern-ontology.service';
import Pattern from '../../../model/pattern.model';
import { UndirectedPatternRelationDescriptorIndividual } from '../../../model/undirected-pattern-relation-descriptor-individual';
import { UndirectedPatternRelationDescriptorResponse } from '../../data/UndirectedPatternRelationDescriptorResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class DefaultPatternUndirectedRelationsLoaderService extends Loader<any> {
  patterns: Pattern[];

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  selectContentFromStore(): Promise<UndirectedPatternRelationDescriptorResponse[]> {
    return this.pos.getUndirectedPatternRelations(this.supportedIRI);
  }

  mapTriples(triples: UndirectedPatternRelationDescriptorResponse[]): Promise<Map<string, UndirectedPatternRelationDescriptorIndividual>> {
    const relations = new Map<string, UndirectedPatternRelationDescriptorIndividual>();
    const triplesByRelation = new Map<string, UndirectedLinkData[]>();
    // sort the triples by relations, each undirected relation must be reconstructed by two triples
    for (const row of triples) {
      const pattern = this.getPatternForIri(row.pattern.value);
      const relationIndividual = row.relationlink.value;
      const linkdata = {pat: pattern, description: row.description ? row.description.value : null};
      triplesByRelation.has(relationIndividual) ? triplesByRelation.set(relationIndividual, triplesByRelation.get(relationIndividual).concat(linkdata)) : triplesByRelation.set(relationIndividual, [linkdata]);
    }
    // reconstruct relations
    triplesByRelation.forEach((value: UndirectedLinkData[], key: string) => {
      relations.set(key, new UndirectedPatternRelationDescriptorIndividual(value[0].pat, value[1].pat, value[1].description ? value[1].description : null));
    });

    return Promise.resolve(relations);
  }


  private getPatternForIri(iri: string): Pattern {
    return this.patterns.find(it => it.iri === iri);
  }


}

class UndirectedLinkData {
  pat: Pattern;
  description?: string;
}

import { PatternOntologyService } from './../../../../core/service/pattern-ontology.service';
import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { IriConverter } from 'src/app/core/util/iri-converter';
import { Link } from 'src/app/graph/model';

@Injectable({
  providedIn: 'root'
})
export class LinkLoaderService extends Loader<Link> {

  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#CloudComputingPattens', pos);
  }

  async selectContentFromStore(): Promise<any> {
    // select all directed links
    const qry = `SELECT ?uri ?source ?target ?description
      WHERE {
          ?uri <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://purl.org/patternpedia#DirectedPatternRelationDescriptor> .
          ?uri <https://purl.org/patternpedia#hasSource> ?source .
          ?uri <https://purl.org/patternpedia#hasTarget> ?target .
          OPTIONAL { ?uri <https://purl.org/patternpedia#hasDescription> ?description . }
      }`;

    const graphs = [];
    graphs.push('https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns');
    graphs.push('https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Patterns');
    graphs.push('https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Relations');
    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {
    const data = [];
    for (const t of triples) {

      let item = data.find(i => i.uri === t.uri.value);

      // if no entry for link yet, create new one
      if (!item) {
        item = {
          id: IriConverter.convertIriToId(t.uri.value),
          source: IriConverter.convertIriToId(t.source.value),
          target: IriConverter.convertIriToId(t.target.value),
          description: []
        };

        data.push(item);
      }

      // add description, if available
      if (t.description) {
        item.description.push(t.description.value);
      }
    }

    // create new Link objects from collected data
    const result = new Map<string, Link>();
    for (const l of data) {
      const link = new Link(
        l.source, l.target, null, l.description
      );
      link.id = l.id;
      result.set(l.id, link);
    }
    return Promise.resolve(result);
  }
}

import { IriConverter } from './../../core/util/iri-converter';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { Node } from 'src/app/graph/model';

@Injectable({
  providedIn: 'root'
})
/**
* Loads all language URIs and language Name defined in the LinkedOpenPatterns entity and returns them.
* URIS are inform of <language#Language>.
*/
export class PlNodeLoaderService extends Loader<Node> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  async getGraphs(): Promise<Array<string>> {
    const graphs = [];
    graphs.push('https://purl.org/patternpedia');

    const langsQry = `SELECT ?lang
    WHERE {
      pp:LinkedOpenPatterns pp:containsPatternGraph ?lang .
    }`;
    const langs = await this.pos.exec(langsQry, graphs);

    for (const l of langs) {
      graphs.push(IriConverter.getFileName(l.lang.value));
    }

    return Promise.resolve(graphs);
  }

  async selectContentFromStore(): Promise<any> {
    const qry = `SELECT ?lang ?name
      WHERE {
        pp:LinkedOpenPatterns pp:containsPatternGraph ?lang .
        ?lang pp:hasName ?name .
      }`;

    // need patternpedia + all language-base-files
    const graphs = await this.getGraphs();

    return this.pos.exec(qry, graphs);
  }

  async mapTriples(triples: any): Promise<Map<string, Node>> {
    const data = new Map<string, Node>();

    for (const t of triples) {
      const node = new Node(IriConverter.convertIriToId(t.lang.value));
      node.name = t.name.value;

      data.set(t.lang.value, node);
    }

    return Promise.resolve(data);
  }
}

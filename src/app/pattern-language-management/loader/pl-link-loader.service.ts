import { IriConverter } from 'src/app/core/util/iri-converter';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import Loader from 'src/app/core/model/loader';
import { Link } from 'src/app/graph/model';

@Injectable({
  providedIn: 'root'
})
/**
* Loads all pattern language links as defined by their referred views and returns them.
*/
export class PlLinkLoaderService extends Loader<Link> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  async getGraphs(): Promise<Array<string>> {
    const graphs = [];
    graphs.push('https://purl.org/patternpedia');

    // add language-base-files
    const langsQry = `SELECT ?lang
      WHERE {
        pp:LinkedOpenPatterns pp:containsPatternGraph ?lang .
      }`;
    const langs = await this.pos.exec(langsQry, graphs);

    for (const l of langs) {
      graphs.push(IriConverter.getFileName(l.lang.value));
    }

    // add view-base-files
    const viewsQry = `SELECT ?view
      WHERE {
        pp:LinkedOpenPatterns pp:containsPatternGraph ?lang .
        ?lang pp:referredByView ?view .
      }`;
    const views = await this.pos.exec(viewsQry, graphs);

    for (const v of views) {
      graphs.push(IriConverter.getFileName(v.view.value));
    }

    return Promise.resolve(graphs);
  }

  async selectContentFromStore(): Promise<any> {
    const qry = `SELECT ?source ?target
      WHERE {
        pp:LinkedOpenPatterns pp:containsPatternGraph ?source .
        ?source pp:referredByView ?view .
        ?view pp:containsPatternGraph ?target .
        FILTER( ?target != ?source ) .
      }`;

    // we need patternpedia, all language-bases and all views!
    const graphs = await this.getGraphs();

    return this.pos.exec(qry, graphs);
  }

  async mapTriples(triples: any): Promise<Map<string, Link>> {
    const data = new Map<string, Link>();

    for (const t of triples) {
      const source = IriConverter.convertIriToId(t.source.value);
      const target = IriConverter.convertIriToId(t.target.value);

      const link = new Link(source, target);
      data.set(`${source}-to-${target}`, link);
    }

    return Promise.resolve(data);
  }
}

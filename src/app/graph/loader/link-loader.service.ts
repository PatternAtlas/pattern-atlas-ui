import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { Link } from 'src/app/graph/model';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
/**
 * Loads all directed links of the given language uri.
 * NOTE: Set the `supportedIRI` with the corresponding language uri from the outside before loading!
 */
export class LinkLoaderService extends Loader<Link> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  getGraphs(): Promise<Array<string>> {
    if (!this.supportedIRI) {
      throw new Error('supportedIRI has not been initialized! Make sure to set the language URI before loading');
    }

    const uri = IriConverter.getFileName(this.supportedIRI);

    // we cut the patternlanguage of the set supportedIRI to create the uris of the patterns and relations file
    const index = uri.lastIndexOf('/') + 1;

    const base = uri;
    const p = `${uri}/${uri.substr(index)}-Patterns`;
    const r = `${uri}/${uri.substr(index)}-Relations`;

    return Promise.resolve([base, p, r]);
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

    const graphs = await this.getGraphs();
    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any): Promise<Map<string, Link>> {
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

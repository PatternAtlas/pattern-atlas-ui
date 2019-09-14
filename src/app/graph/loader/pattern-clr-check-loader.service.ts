import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
/**
 * Returns a list containing all patterns that are referred in views and thus are contained in Cross Language Relations.
 * The Map contains only those patterns with a CLR. Pattern which are not present in the map don't have CLRs.
 */
export class PatternClrCheckLoaderService extends Loader<boolean> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  async getGraphs(): Promise<Array<string>> {
    const graphs = [ 'https://purl.org/patternpedia' ];

    if (!this.supportedIRI) {
      throw new Error('supportedIRI has not been initialized! Make sure to set the language URI before loading');
    }

    // all from given language
    const uri = IriConverter.getFileName(this.supportedIRI);
    const index = uri.lastIndexOf('/') + 1;

    const base = uri;
    const p = `${uri}/${uri.substr(index)}-Patterns`;
    const r = `${uri}/${uri.substr(index)}-Relations`;

    graphs.push(base, p, r);


    // all from referenced views
    const viewsQry = `SELECT DISTINCT ?view
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
      }`;
    const views = await this.pos.exec(viewsQry, graphs);
    views.map(t => t.view.value).forEach(u => {
      const uri = IriConverter.getFileName(u);
      const index = uri.lastIndexOf('/') + 1;
      graphs.push(uri);
      graphs.push(`${uri}/${uri.substr(index)}-Relations`);
    });

    return Promise.resolve(graphs);
  }

  async selectContentFromStore(): Promise<any> {
    const qry = `SELECT ?pattern
      WHERE {
        {
          <${this.supportedIRI}> pp:containsPattern ?pattern .
          <${this.supportedIRI}> pp:referredByView ?view .
          ?view pp:containsPatternRelationDescriptor ?relation .
          ?relation pp:hasSource ?pattern .
          OPTIONAL { ?relation pp:hasTarget ?pattern }
        }
        UNION
        {
          <${this.supportedIRI}> pp:containsPattern ?pattern .
          <${this.supportedIRI}> pp:referredByView ?view .
          ?view pp:containsPatternRelationDescriptor ?relation .
          ?relation pp:hasTarget ?pattern .
          OPTIONAL { ?relation pp:hasSource ?pattern }
        }
      }`;

    const graphs = await this.getGraphs();
    return this.pos.exec(qry, graphs);
  }

  async mapTriples(triples: any): Promise<Map<string, boolean>> {
    const data = new Map<string, boolean>();
    for (const t of triples) {
      data.set(t.pattern.value, true);
    }

    return Promise.resolve(data);
  }
}

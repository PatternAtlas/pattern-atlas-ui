import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Loads the Language Instance from the given language uri.
 */
export class LanguageLoaderService extends Loader<string> {

  constructor(private pos: PatternOntologyService) {
    super('', pos);
  }

  loadContentFromStore(uri?: string): Promise<Map<string, string>> {
    return this.selectContentFromStore(uri)
            .then(
                triples => this.mapTriples(triples, uri)
            );
  }

  selectContentFromStore(uri?: string): Promise<any> {
    const query = `SELECT DISTINCT ?lang
      WHERE {
        ?lang a pp:PatternLanguage .
      }`;
    return this.pos.exec(query, [uri]);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, string>> {
    const result = new Map<string, string>();
    for (const t of triples) {
      result.set(t.lang.value, t.lang.value);
    }
    return Promise.resolve(result);
  }
}

import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';

@Injectable({
  providedIn: 'root'
})
export class IotDataLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia/patternlanguages/internetofthingspatterns#InternetofThingsPatterns', pos);
  }

  selectContentFromStore(): Promise<any> {
    const prefix = 'https://purl.org/patternpedia/patternlanguages/internetofthingspatterns#';
    const qry = `PREFIX : <${prefix}>
    SELECT DISTINCT ?uri ?name ?summary ?alias ?icon ?problem ?context ?force ?solution ?solutionSketch ?result ?variant
    WHERE {
      <${this.supportedIRI}> pp:containsPattern ?uri .
      ?uri pp:hasName ?name .
      ?uri :hasSummary ?summary .
      OPTIONAL { ?uri :hasAlias ?alias } .
      ?uri :hasIcon ?icon .
      ?uri :hasProblem ?problem .
      ?uri :hasContext ?context .
      ?uri :hasForce ?force .
      ?uri :hasSolution ?solution .
      OPTIONAL { ?uri :hasSolutionSketch ?solutionSketch } .
      OPTIONAL { ?uri :hasResult ?result } .
      OPTIONAL { ?uri :hasVariant ?variant } .
    }`;

    const graphs = [
      'https://purl.org/patternpedia/patternlanguages/internetofthingspatterns',
      'https://purl.org/patternpedia/patternlanguages/internetofthingspatterns/internetofthingspatterns-Patterns',
      'https://purl.org/patternpedia/patternlanguages/internetofthingspatterns/internetofthingspatterns-Relations'
    ];

    return this.pos.exec(qry, graphs);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {
    const data = new Map<string, any>();

    for (const t of triples) {
      let item = data.get(t.uri.value);
      if (!item) {
        item = {};
        data.set(t.uri.value, item);
      }

      item.name = t.name.value;

      item.uri = t.uri.value;
      item.summary = t.summary.value;

      if (t.alias) {
        if (!item.alias) {
          item.alias = [];
        }
        item.alias.push(t.alias.value);
      }

      item.icon = t.icon.value;
      item.problem = t.problem.value;
      item.context = t.context.value;

      if (!item.force) {
        item.force = [];
      }
      item.force.push(t.force.value);

      item.solution = t.solution.value;

      if (!item.solutionSketch) {
        item.solutionSketch = [];
      }
      item.solutionSketch.push(t.solutionSketch.value);

      if (t.result)
        item.result = t.result.value;

      if (t.variant)
        item.variant = t.variant.value;
    }

    return Promise.resolve(data);
  }
}

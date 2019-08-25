import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import EnterpriseApplicationArchitecturePattern from '../model/enterprise-application-architecture-pattern';

@Injectable({
  providedIn: 'root'
})
export class PatternsLoaderService extends Loader<EnterpriseApplicationArchitecturePattern> {

  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns#EnterpriseApplicationArchitecturePatterns', pos);
  }

  async selectContentFromStore(): Promise<any> {
    const qry = `PREFIX : <https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns#>
      SELECT DISTINCT ?pattern ?name ?intent ?sketch ?motivation
      WHERE {
        ?pattern a <https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns#EnterpriseApplicationArchitecturePattern> .
        ?pattern pp:hasName ?name .
        ?pattern :hasIntent ?intent .
        OPTIONAL {
          ?pattern :hasSketch ?sketch .
          ?pattern :hasMotivation ?motivation .
        }
      }`;

    const graphs = [
      'https://purl.org/patternpedia',
      'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns',
      'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns/enterpriseapplicationarchitecturepatterns-Patterns',
      'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns/enterpriseapplicationarchitecturepatterns-Relations'
    ];

    return this.pos.exec(qry, graphs);
  }

  mapTriples(triples: any): Promise<Map<string, EnterpriseApplicationArchitecturePattern>> {
    const result = new Map<string, EnterpriseApplicationArchitecturePattern>();

    for (const t of triples) {
      const p = new EnterpriseApplicationArchitecturePattern(
        t.pattern.value, t.name.value
      );
      p.intent = t.intent.value;

      if (t.sketch)
        p.sketch = t.sketch.value;
      if (t.motivation)
        p.motivation = t.motivation.value;

      result.set(p.iri, p);
    }

    return Promise.resolve(result);
  }
}

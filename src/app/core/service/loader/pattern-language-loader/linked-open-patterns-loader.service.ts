/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */

import PatternLanguage from '../../../model/pattern-language.model';
import { Injectable } from '@angular/core';
import Loader from '../../../model/loader';
import { PatternOntologyService } from '../../pattern-ontology.service';
import { IriConverter } from '../../../util/iri-converter';

@Injectable()
export class LinkedOpenPatternsLoader extends Loader<PatternLanguage> {

  constructor(private pos: PatternOntologyService) {
        super('http://purl.org/patternpedia#LinkedOpenPatterns', pos);
    }

  async selectContentFromStore(): Promise<any> {
    console.log('supportedIRI: ');
    console.log(this.supportedIRI);
    const qryPatternGraphs = `SELECT DISTINCT ?patterngraph
                                      WHERE {
                                          <${this.supportedIRI}> <http://purl.org/patternpedia#containsPatternGraph> ?patterngraph
                                      }`;
      const patternGraphs = await this.executor.exec(qryPatternGraphs, [IriConverter.getFileName(this.supportedIRI)]);
      const qry = `SELECT ?patterngraph ?type ?name ?logo ?pattern
                                         WHERE {
                                             <${this.supportedIRI}> <http://purl.org/patternpedia#containsPatternGraph> ?patterngraph .
                                            ?patterngraph a ?type .
                                            optional {?patterngraph <http://purl.org/patternpedia#containsPattern> ?pattern .}
                                            ?patterngraph <http://purl.org/patternpedia#hasName> ?name .
                                            ?patterngraph <http://purl.org/patternpedia#hasLogo> ?logo .
                                            FILTER (?type != owl:NamedIndividual)
                                          }
                                ORDER BY ?patterngraph`;
      const graphs = [IriConverter.getFileName(this.supportedIRI)];

      for (const entry of patternGraphs) {
        graphs.push(IriConverter.getFileName(entry.patterngraph.value));
      }
      return this.executor.exec(qry, graphs);
    }

    mapTriples(triples: any): Promise<Map<string, PatternLanguage>> {
        const result = new Map<string, PatternLanguage>();
        // we first iterate the triples and generate an intermediate format to create afterwards pattern objects
      const rawPatternGraphs = {};

      for (const row of triples) {
            if (!rawPatternGraphs[row.patterngraph.value]) {
                rawPatternGraphs[row.patterngraph.value] = {patterngraph: row.patterngraph.value};
            }
            if (!rawPatternGraphs[row.patterngraph.value]['type']) {
                rawPatternGraphs[row.patterngraph.value]['type'] = row.type.value;
            }
            if (!rawPatternGraphs[row.patterngraph.value]['name']) {
                rawPatternGraphs[row.patterngraph.value]['name'] = row.name.value;
            }
            // Todo incorporate to allow more than one logo
            if (!rawPatternGraphs[row.patterngraph.value]['logo']) {
                rawPatternGraphs[row.patterngraph.value]['logo'] = row.logo.value;
            }
          if (!rawPatternGraphs[row.patterngraph.value]['patterns']) {
            rawPatternGraphs[row.patterngraph.value]['patterns'] = row.pattern ? [row.pattern.value] : [];
          } else if (row.pattern) {
            rawPatternGraphs[row.patterngraph.value]['patterns'].push(row.pattern.value);
            }
        }

      for (const key of Object.keys(rawPatternGraphs)) {
            result.set(
                key,
                new PatternLanguage(
                    rawPatternGraphs[key].patterngraph,
                    rawPatternGraphs[key].name,
                    [rawPatternGraphs[key].logo],
                    rawPatternGraphs[key].patterns
                )
            );
        }
        return Promise.resolve(result);
    }
}

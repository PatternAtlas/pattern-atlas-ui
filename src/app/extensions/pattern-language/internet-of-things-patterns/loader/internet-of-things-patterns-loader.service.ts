/*
 * Copyright (c) 2019 University of Stuttgart.
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

import InternetOfThingsPattern from '../model/internet-of-things-pattern';
import Loader from '../../../../core/model/loader';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../../../../core/service/pattern-ontology.service';
import { IriConverter } from '../../../../core/util/iri-converter';

@Injectable()
export class InternetOfThingsPatternsLoaderService extends Loader<InternetOfThingsPattern> {

    constructor(private pos: PatternOntologyService) {
      super('http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#InternetOfThingsPatterns', pos);
    }

    async selectContentFromStore(): Promise<any> {
        const qryPatterns = `SELECT DISTINCT ?pattern
                                      WHERE {
                                          <${this.supportedIRI}> <http://purl.org/patternpedia#containsPattern> ?pattern
                                      }`;
        const patterns = await this.executor.exec(qryPatterns, [IriConverter.getFileName(this.supportedIRI)]);
        const qry = `SELECT DISTINCT ?type ?pattern ?predicate ?property
                 WHERE {
                    <${this.supportedIRI}> pp:containsPattern ?pattern .
                    ?pattern ?predicate ?property .
                    ?pattern a ?type .
                    FILTER (?type != owl:NamedIndividual && ?predicate != rdf:type)
                    }
                 ORDER BY ?pattern`;
        const graphs = [IriConverter.getFileName(this.supportedIRI)];
        for (const entry of patterns) {
            graphs.push(IriConverter.getFileName(entry.pattern.value));
        }
        return this.executor.exec(qry, graphs);
    }

    mapTriples(triples: any): Promise<Map<string, InternetOfThingsPattern>> {
        const result = new Map<string, InternetOfThingsPattern>();
        // we first iterate the triples and generate an intermediate format to create afterwards pattern objects
        const patterns = {};
        for (const row of triples) {

            // row.pattern.value = PatternIndividual IRI
            if (!patterns[row.pattern.value]) {
                patterns[row.pattern.value] = {iri: row.pattern.value, type: row.type.value};
            }
            if (!patterns[row.pattern.value][row.predicate.value]) {
                patterns[row.pattern.value][row.predicate.value] = {
                    name: row.predicate.value,
                    value: row.property.value,
                    type: row.property.type
                };
            } else if (!Array.isArray(patterns[row.pattern.value][row.predicate.value])) {
                const temp = patterns[row.pattern.value][row.predicate.value];
                patterns[row.pattern.value][row.predicate.value] = [temp,
                    {
                        name: row.predicate.value,
                        value: row.property.value,
                        type: row.property.type
                    }];
            } else if (Array.isArray(patterns[row.pattern.value][row.predicate.value])) {
                patterns[row.pattern.value][row.predicate.value].push({
                    name: row.predicate.value,
                    value: row.property.value,
                    type: row.property.type
                });
            }
        }
        for (const key of Object.keys(patterns)) {
            let name = '';
            if (patterns[key] && patterns[key]['http://purl.org/patternpedia#hasName'] && patterns[key]['http://purl.org/patternpedia#hasName'].value) {
                name = patterns[key]['http://purl.org/patternpedia#hasName'].value;
            }
            let icon = '';
          if (patterns[key] && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#icon']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#icon'].value) {
            icon = patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#icon'].value;
            }
            let intent = '';
          if (patterns[key] && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#intent']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#intent'].value) {
            intent = patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#intent'].value;
            }
            let context = '';
          if (patterns[key] && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#context']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#context'].value) {
            context = patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#context'].value;
            }
            let problem = '';
          if (patterns[key] && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#problem']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#problem'].value) {
            problem = patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#problem'].value;
            }
            let solution = '';
          if (patterns[key] && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#solution']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#solution'].value) {
            solution = patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#solution'].value;
            }
            const sketches = [];
          if (Array.isArray(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#solutionSketch'])) {
            for (const entry of patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#solutionSketch']) {
                    sketches.push(entry.value);
                }
          } else if (patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#solutionSketch']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#solutionSketch'].value) {
            sketches.push(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#solutionSketch'].value);
            }
            const forces = [];
          if (Array.isArray(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#force'])) {
            for (const entry of patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#force']) {
                    forces.push(entry.value);
                }
          } else if (patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#force']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#force'].value) {
            forces.push(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#force'].value);
            }
            const benefits = [];
          if (Array.isArray(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#benefit'])) {
            for (const entry of patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#benefit']) {
                    benefits.push(entry.value);
                }
          } else if (patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#benefit']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#benefit'].value) {
            benefits.push(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#benefit'].value);
            }
            const drawbacks = [];
          if (Array.isArray(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#drawback'])) {
            for (const entry of patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#drawback']) {
                    drawbacks.push(entry.value);
                }
          } else if (patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#drawback']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#drawback'].value) {
            drawbacks.push(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#drawback'].value);
            }
            let patternResult = '';
          if (patterns[key] && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#result']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#result'].value) {
            patternResult = patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#result'].value;
            }
            let examples = '';
          if (patterns[key] && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#examples']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#examples'].value) {
            examples = patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#examples'].value;
            }
            const aliases = [];
          if (Array.isArray(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#alias'])) {
            for (const entry of patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#alias']) {
                    aliases.push(entry.value);
                }
          } else if (patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#alias']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#alias'].value) {
            aliases.push(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#alias'].value);
            }
            const variants = [];
          if (Array.isArray(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#variant'])) {
            for (const entry of patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#variant']) {
                    variants.push(entry.value);
                }
          } else if (patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#variant']
            && patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#variant'].value) {
            variants.push(patterns[key]['http://purl.org/patternpedia/patternlanguages/internetofthingspatterns#variant'].value);
            }

            /*
                iri: string,
                name: string,
                icon: string,
                intent: string,
                context: string,
                problem: string,
                solution: string,
                solutionSketches: Array<string>,
                forces: Array<string>,
                benefits: Array<string>,
                drawbacks: Array<string>,
                result: string,
                examples: Array<string>,
                aliases: Array<string>,
                variants: Array<string>
            */
            result.set(
                key,
                new InternetOfThingsPattern(
                    key,
                    name,
                    icon,
                    intent,
                    context,
                    problem,
                    solution,
                    sketches,
                    forces,
                    benefits,
                    drawbacks,
                    patternResult,
                    examples,
                    aliases,
                    variants)
            );
        }

        return Promise.resolve(result);
    }
}

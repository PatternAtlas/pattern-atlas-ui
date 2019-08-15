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

import CloudComputingPattern from '../model/cloud-computing-pattern';
import Loader from '../../../../core/model/loader';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../../../../core/service/pattern-ontology.service';
import { IriConverter } from '../../../../core/util/iri-converter';

@Injectable()
export class CloudComputingPatternsLoaderService extends Loader<CloudComputingPattern> {

    constructor(private pos: PatternOntologyService) {
      super('https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#CloudComputingPatterns', pos);
    }

    async selectContentFromStore(): Promise<any> {
        const qry = `SELECT DISTINCT ?type ?pattern ?predicate ?property
                 WHERE {
                    <${this.supportedIRI}> pp:containsPattern ?pattern .
                    ?pattern ?predicate ?property .
                    ?pattern a ?type .
                    FILTER (?type != owl:NamedIndividual && ?predicate != rdf:type)
                    }
                 ORDER BY ?pattern`;
        const graphs = [IriConverter.getFileName(this.supportedIRI)];
      graphs.push(IriConverter.getFileName(this.supportedIRI) + '/' + IriConverter.extractIndividualNameFromIri(IriConverter.getFileName(this.supportedIRI)) + '-Patterns');
        return this.executor.exec(qry, graphs);
    }

    mapTriples(triples: any): Promise<Map<string, CloudComputingPattern>> {
        const result = new Map<string, CloudComputingPattern>();
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
            const p = new CloudComputingPattern(key);
          if (Array.isArray(patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasSolutionSketch'])) {
            for (const entry of patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasSolutionSketch']) {
                    p.solutionSketches.value.push(entry.value);
                }
          } else if (patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasSolutionSketch']
            && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasSolutionSketch'].value) {
            p.solutionSketches.value.push(patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasSolutionSketch'].value);
            }
          if (Array.isArray(patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasVariation'])) {
            for (const entry of patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasVariation']) {
                    p.variations.value.push(entry.value);
                }
          } else if (patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasVariation']
            && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasVariation'].value) {
            p.variations.value.push(patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasVariation'].value);
            }
            if (patterns[key] && patterns[key]['https://purl.org/patternpedia#hasName'] && patterns[key]['https://purl.org/patternpedia#hasName'].value) {
                p.name = patterns[key]['https://purl.org/patternpedia#hasName'].value;
            }
          if (patterns[key] && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasIcon']
            && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasIcon'].value) {
            p.icon.value = patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasIcon'].value;
            }
          if (patterns[key] && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasIntent']
            && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasIntent'].value) {
            p.intent.value = patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasIntent'].value;
            }
          if (patterns[key] && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasDrivingQuestion']
            && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasDrivingQuestion'].value) {
            p.drivingQuestion.value = patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasDrivingQuestion'].value;
            }
          if (patterns[key] && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasSolution']
            && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasSolution'].value) {
            p.solution.value = patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasSolution'].value;
            }
          if (patterns[key] && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasResult']
            && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasResult'].value) {
            p.result.value = patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasResult'].value;
            }
          if (patterns[key] && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasContext']
            && patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasContext'].value) {
            p.context.value = patterns[key]['https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#hasContext'].value;
            }
            result.set(p.iri, p);
        }
        return Promise.resolve(result);
    }
}

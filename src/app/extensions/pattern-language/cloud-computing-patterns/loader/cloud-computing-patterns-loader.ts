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

import { Observable, of } from 'rxjs';
import CloudComputingPattern from '../model/cloud-computing-pattern';
import Loader from '../../../../core/service/loader/pattern-language-loader/loader';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../../../../core/service/pattern-ontology.service';

@Injectable()
export class CloudComputingPatternsLoader extends Loader<CloudComputingPattern> {

    constructor(private pos: PatternOntologyService) {
        super('http://purl.org/patternpedia/cloudcomputingpatterns#CloudComputingPatterns', pos);
    }

    selectContentFromStore(): Observable<any> {
        const qry = `SELECT DISTINCT ?type ?pattern ?predicate ?property
                 WHERE {
                    <${this.supportedIRI}> pp:containsPattern ?pattern .
                    ?pattern ?predicate ?property .
                    ?pattern a ?type .
                    FILTER (?type != owl:NamedIndividual && ?predicate != rdf:type)
                    }
                 ORDER BY ?pattern`;
        return this.executor.exec(qry);
    }

    mapTriplesToObjects(triples: any): Observable<Map<string, CloudComputingPattern>> {
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
            const sketches = [];
            if (Array.isArray(patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasSolutionSketch'])) {
                for (const entry of patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasSolutionSketch']) {
                    sketches.push(entry.value);
                }
            } else if (patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasSolutionSketch']
                && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasSolutionSketch'].value) {
                sketches.push(patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasSolutionSketch'].value);
            }
            const variations = [];
            if (Array.isArray(patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasVariation'])) {
                for (const entry of patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasVariation']) {
                    variations.push(entry.value);
                }
            } else if (patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasVariation']
                && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasVariation'].value) {
                variations.push(patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasVariation'].value);
            }
            let name = '';
            if (patterns[key] && patterns[key]['http://purl.org/patternpedia#hasName'] && patterns[key]['http://purl.org/patternpedia#hasName'].value) {
                name = patterns[key]['http://purl.org/patternpedia#hasName'].value;
            }
            let icon = '';
            if (patterns[key] && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasIcon']
                && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasIcon'].value) {
                icon = patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasIcon'].value;
            }
            let intent = '';
            if (patterns[key] && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasIntent']
                && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasIntent'].value) {
                intent = patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasIntent'].value;
            }
            let drivingQuestion = '';
            if (patterns[key] && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasDrivingQuestion']
                && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasDrivingQuestion'].value) {
                drivingQuestion = patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasDrivingQuestion'].value;
            }
            let solution = '';
            if (patterns[key] && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasSolution']
                && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasSolution'].value) {
                solution = patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasSolution'].value;
            }
            let patternResult = '';
            if (patterns[key] && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasResult']
                && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasResult'].value) {
                patternResult = patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasResult'].value;
            }
            let context = '';
            if (patterns[key] && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasContext']
                && patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasContext'].value) {
                context = patterns[key]['http://purl.org/patternpedia/cloudcomputingpatterns#hasContext'].value;
            }
            result.set(
                key,
                new CloudComputingPattern(
                    key,
                    name,
                    icon,
                    intent,
                    context,
                    drivingQuestion,
                    solution,
                    sketches,
                    patternResult,
                    variations)
            );
        }

        return of(result);
    }
}

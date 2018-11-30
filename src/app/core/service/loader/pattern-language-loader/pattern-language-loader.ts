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
import Loader from './loader';
import { SparqlExecutorInterface } from '../../../model/sparql-executor.interface';
import PatternLanguageModel from '../../../model/pattern-language.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PatternLanguageLoader extends Loader<PatternLanguageModel> {

    constructor(iri: string, executor: SparqlExecutorInterface) {
        super(iri, executor);
    }

    selectContentFromStore(): Observable<any> {
        const qry = `SELECT DISTINCT *
                     WHERE { <${this.supportedIRI}> pp:containsPatternLanguage ?patternlanguage .
                     ?patternlanguage ?predicate ?property . FILTER ( ?predicate != rdf:type ) }`;
        return this.executor.exec(qry);
    }

    mapTriplesToObjects(triples: any): Observable<Map<string, PatternLanguageModel>> {
        const result = new Map<string, PatternLanguageModel>();

        // we first iterate the triples and generate an intermediate format to create afterwards pattern objects
        const rawLanguages = {};
        for (const row of triples) {
            // row.patternlanguage.value = PatternLanguageIndividual IRI
            if (!rawLanguages[row.patternlanguage.value]) {
                rawLanguages[row.patternlanguage.value] = {iri: row.patternlanguage.value};
            }
            if (!rawLanguages[row.patternlanguage.value][row.predicate.value]) {
                rawLanguages[row.patternlanguage.value][row.predicate.value] = {
                    name: row.predicate.value,
                    value: row.property.value,
                    type: row.property.type
                };
            } else if (!Array.isArray(rawLanguages[row.patternlanguage.value][row.predicate.value])) {
                const temp = rawLanguages[row.patternlanguage.value][row.predicate.value];
                rawLanguages[row.patternlanguage.value][row.predicate.value] = [temp,
                    {
                        name: row.predicate.value,
                        value: row.property.value,
                        type: row.property.type
                    }];
            } else if (Array.isArray(rawLanguages[row.patternlanguage.value][row.predicate.value])) {
                rawLanguages[row.patternlanguage.value][row.predicate.value].push({
                    name: row.predicate.value,
                    value: row.property.value,
                    type: row.property.type
                });
            }
        }
        for (const key of Object.keys(rawLanguages)) {
            const logos = [];
            if (Array.isArray(rawLanguages[key]['http://purl.org/patternpedia#hasLogo'])) {
                for (const entry of rawLanguages[key]['http://purl.org/patternpedia#hasLogo']) {
                    logos.push(entry.value);
                }
            } else if (rawLanguages[key]['http://purl.org/patternpedia#hasLogo']) {
                logos.push(rawLanguages[key]['http://purl.org/patternpedia#hasLogo'].value);
            }
            const patterns = [];
            if (Array.isArray(rawLanguages[key]['http://purl.org/patternpedia#containsPattern'])) {
                for (const entry of rawLanguages[key]['http://purl.org/patternpedia#containsPattern']) {
                    patterns.push(entry.value);
                }
            } else if (rawLanguages[key]['http://purl.org/patternpedia#containsPattern']) {
                patterns.push(rawLanguages[key]['http://purl.org/patternpedia#containsPattern'].value);
            }
            result.set(
                key,
                new PatternLanguageModel(
                    key,
                    rawLanguages[key]['http://purl.org/patternpedia#hasName'].value,
                    logos,
                    patterns
                )
            );
        }

        return of(result);
    }
}

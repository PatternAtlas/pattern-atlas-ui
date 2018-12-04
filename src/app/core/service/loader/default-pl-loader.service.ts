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

import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../pattern-ontology.service';
import { Observable, of } from 'rxjs';
import Loader from '../../model/loader';
import { selectPatternLanguage } from './pl-selector.function';

@Injectable({
    providedIn: 'root'
})
export class DefaultPlLoaderService extends Loader<any> {

    constructor(private pos: PatternOntologyService) {
        super(null, pos);
    }

    selectContentFromStore(): Observable<any> {
        return selectPatternLanguage(this.supportedIRI, this.executor);
    }

    mapTriples(triples: any): Observable<Map<string, any>> {
        const patterns = new Map<string, any>();
        for (const row of triples) {
            if (!patterns.get(row.pattern.value)) {
                patterns.set(row.pattern.value, {iri: row.pattern.value, type: row.type.value});
            }
            if (!patterns.get(row.pattern.value)[row.predicate.value]) {
                patterns.get(row.pattern.value)[row.predicate.value] = {
                    name: row.predicate.value,
                    value: row.property.value,
                    type: row.property.type
                };
            } else if (!Array.isArray(patterns.get(row.pattern.value)[row.predicate.value])) {
                const temp = patterns.get(row.pattern.value)[row.predicate.value];
                patterns.get(row.pattern.value)[row.predicate.value] = [temp,
                    {
                        name: row.predicate.value,
                        value: row.property.value,
                        type: row.property.type
                    }];
            } else if (Array.isArray(patterns.get(row.pattern.value)[row.predicate.value])) {
                patterns.get(row.pattern.value)[row.predicate.value].push({
                    name: row.predicate.value,
                    value: row.property.value,
                    type: row.property.type
                });
            }
        }
        return of(patterns);
    }
}

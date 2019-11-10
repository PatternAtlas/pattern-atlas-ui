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

import { Injectable } from '@angular/core';
import Pattern from '../model/hal/pattern.model';
import { HttpClient } from '@angular/common/http';
import { globals } from '../../globals';
import { Observable } from 'rxjs';

@Injectable()
export class PatternService {

    private repoEndpoint = globals.repoEndpoint;

    constructor(private http: HttpClient) {
    }

    public async getPatternByEncodedUri(encodedUri: string): Promise<Pattern> {
        const url = this.repoEndpoint + '/patterns/search/findByUri?uri=' + encodedUri;
        return this.http.get<Pattern>(url)
            .toPromise();
    }

    async getPatternsByUrl(patternsUrl: string): Promise<Array<Pattern>> {
        return this.http.get(patternsUrl).toPromise()
            .then(result => {
                const resultAry = new Array<Pattern>();
                const embedded = result['_embedded'];
                if (embedded) {
                    const patterns = embedded['patterns'];
                    for (const entry of patterns) {
                        const pattern = new Pattern();
                        pattern.uri = entry['uri'];
                        pattern.name = entry['name'];
                        pattern.id = entry['id'];
                        resultAry.push(pattern);
                    }
                }
                return resultAry;
            });
    }

    async getPatternContentByPattern(pattern: Pattern): Promise<{ content: any }> {
        return this.http.get<{ content: any }>(pattern._links.content.href).toPromise();
    }

    savePattern(url: string, pattern: any): Observable<Pattern> {
        return this.http.post<Pattern>(url, pattern);
    }
}

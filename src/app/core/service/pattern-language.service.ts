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
import PatternLanguage from '../model/hal/pattern-language.model';
import { HttpClient } from '@angular/common/http';
import { globals } from '../../globals';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import PatternLanguages from '../model/hal/pattern-languages.model';

@Injectable()
export class PatternLanguageService {

    private repoEndpoint = globals.repoEndpoint;

    constructor(private http: HttpClient) {
    }

    public async getPatternLanguages(): Promise<Array<PatternLanguage>> {
        return this.http.get<Array<PatternLanguage>>(this.repoEndpoint + '/patternLanguages').toPromise()
            .then(async (result: any) => {
                const patternLanguages = result as PatternLanguages;
                let resultAry = new Array<PatternLanguage>();
                if (patternLanguages._embedded && Array.isArray(patternLanguages._embedded.patternLanguages)) {
                    resultAry = patternLanguages._embedded.patternLanguages;
                }
                return resultAry;
            });
    }

    public getPatternLanguageByUrl(url: string): Observable<PatternLanguage> {
        return this.http.get(url).pipe(
            map(res => <PatternLanguage>res)
        );
    }

    public getPatternLanguageByEncodedUri(encodedUri: string): Observable<PatternLanguage> {
        const url = this.repoEndpoint + '/patternLanguages/findByUri?encodedUri=' + encodedUri;
        return this.http.get<PatternLanguage>(url);
    }

    public savePatternLanguage(patternLanguage: PatternLanguage): Promise<any> {
        return this.http.post<any>(this.repoEndpoint + '/patternLanguages', patternLanguage, {observe: 'response'}).toPromise();
    }
}

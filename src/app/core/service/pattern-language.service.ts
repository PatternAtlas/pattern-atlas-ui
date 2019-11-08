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
import PatternLanguage from '../model/new/pattern-language.model';
import { HttpClient } from '@angular/common/http';
import { PatternService } from './pattern.service';
import { globals } from '../../globals';

@Injectable()
export class PatternLanguageService {

    private repoEndpoint = globals.repoEndpoint;

    constructor(private http: HttpClient,
                private patternService: PatternService) {
    }

    private static getPatternLanguageFromResponse(response: any): PatternLanguage {
        const patternLanguage = new PatternLanguage();
        patternLanguage.uri = response['uri'];
        patternLanguage.name = response['name'];
        patternLanguage.logo = response['logo'];
        patternLanguage.id = response['id'];
        patternLanguage.patterns = response['patterns'];
        patternLanguage._links = response['_links'];
        return patternLanguage;
    }

    public async getPatternLanguages(): Promise<Array<PatternLanguage>> {
        return this.http.get<Array<PatternLanguage>>(this.repoEndpoint + '/patternLanguages').toPromise()
            .then(async result => {
                const resultAry = new Array<PatternLanguage>();
                if (result['_embedded'] && result['_embedded']['patternLanguages']) {
                    for (const entry of result['_embedded']['patternLanguages']) {
                        const patternLanguage = PatternLanguageService.getPatternLanguageFromResponse(entry);
                        resultAry.push(patternLanguage);
                    }
                }
                return resultAry;
            });
    }

    public async getPatternLanguageByUrl(url: string): Promise<PatternLanguage> {
        return this.http.get<PatternLanguage>(url).toPromise();
    }

    public async getPatternLanguageByEncodedUri(encodedUri: string): Promise<PatternLanguage> {
        const url = this.repoEndpoint + '/patternLanguages/findByUri?encodedUri=' + encodedUri;
        return this.http.get<PatternLanguage>(url)
            .toPromise()
            .then(async result => {
                const patternLanguage = PatternLanguageService.getPatternLanguageFromResponse(result);
                patternLanguage.patterns = await this.patternService.getPatternsByUrl(result['_links']['patterns']['href']);
                return patternLanguage;
            });
    }

    public savePatternLanguage(patternLanguage: PatternLanguage): Promise<any> {
        return this.http.post<any>(this.repoEndpoint + '/patternLanguages', patternLanguage, {observe: 'response'}).toPromise();
    }
}

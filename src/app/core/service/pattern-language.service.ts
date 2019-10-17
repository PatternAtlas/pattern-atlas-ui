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
        const selfLink = response['_links']['self']['href'];
        patternLanguage.id = selfLink.substring(selfLink.lastIndexOf('/') + 1);
        return patternLanguage;
    }

    public async getPatternLanguages(): Promise<Array<PatternLanguage>> {
        return this.http.get<Array<PatternLanguage>>(this.repoEndpoint + '/patternLanguages').toPromise()
            .then(async result => {
                const resultAry = new Array<PatternLanguage>();
                for (const entry of result['_embedded']['patternLanguages']) {
                    const patternLanguage = PatternLanguageService.getPatternLanguageFromResponse(entry);
                    patternLanguage.patterns = await this.patternService.getPatternsByUrl(entry['_links']['patterns']['href']);
                    resultAry.push(patternLanguage);
                }
                return resultAry;
            });
    }

    public async getPatternLanguageByEncodedUri(encodedUri: string): Promise<PatternLanguage> {
        const url = this.repoEndpoint + '/patternLanguages/search/findByUri?uri=' + encodedUri;
        return this.http.get<PatternLanguage>(url)
            .toPromise()
            .then(async result => {
                const patternLanguage = PatternLanguageService.getPatternLanguageFromResponse(result);
                patternLanguage.patterns = await this.patternService.getPatternsByUrl(result['_links']['patterns']['href']);
                return patternLanguage;
            });
    }

    public savePatternLanguage(patternLanguage: PatternLanguage): void {
        this.http.post(this.repoEndpoint + '/patternLanguages', patternLanguage).toPromise()
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }
}

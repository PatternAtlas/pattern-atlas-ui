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

import {Injectable} from '@angular/core';
import PatternLanguage from '../model/hal/pattern-language.model';
import {HttpClient} from '@angular/common/http';
import {globals} from '../../globals';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import PatternLanguages from '../model/hal/pattern-languages.model';
import {DirectedEdesResponse} from '../model/hal/directed-edes-response.interface';
import {Embedded} from '../model/hal/embedded';
import {UndirectedEdesResponse} from '../model/hal/undirected-edes-response.interface';
import {GraphNode} from '../component/graph-display/graph-display.component';

@Injectable()
export class PatternLanguageService {

    private repoEndpoint = globals.repoEndpoint;

    constructor(private http: HttpClient) {
    }

    public getPatternLanguages(): Observable<Array<PatternLanguage>> {
        return this.getPatternLanguageResult().pipe(
            tap(res => console.log(res)),
            map((result: PatternLanguages) => {
                    return result._embedded ? result._embedded.patternLanguages : [];
                }
            )
        );
    }

    public getPatternLanguageResult(): Observable<PatternLanguages> {
        return this.http.get<PatternLanguages>(this.repoEndpoint + '/patternLanguages');
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

    public getDirectedEdges(patternLanguage: PatternLanguage): Observable<Embedded<DirectedEdesResponse>> {
        return this.http.get<Embedded<DirectedEdesResponse>>(patternLanguage._links.directedEdges.href);
    }

    public getUndirectedEdges(patternLanguage: PatternLanguage): Observable<Embedded<UndirectedEdesResponse>> {
        return this.http.get<Embedded<UndirectedEdesResponse>>(patternLanguage._links.undirectedEdges.href);
    }

    saveGraph(patternLanguage: PatternLanguage, nodes: Array<GraphNode>) {
        return this.http.post<any>(patternLanguage._links.graph.href, {graph: nodes}, {observe: 'response'});
    }

    getGraph(patternLanguage: PatternLanguage) {
        return this.http.get<{ graph: { graph: Array<GraphNode> } }>(patternLanguage._links.graph.href);
    }
}

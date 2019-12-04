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
import {HttpClient, HttpResponse} from '@angular/common/http';
import {globals} from '../../globals';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import Pattern from '../model/hal/pattern.model';
import {PatternView} from '../model/hal/pattern-view.model';
import {PatternViewResponse} from '../model/hal/pattern-view-response.interface';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';

@Injectable()
export class PatternViewService {

    private repoEndpoint = globals.repoEndpoint;

    constructor(private http: HttpClient) {
    }


    getPatternViews(): Observable<PatternViewResponse> {
        return this.http.get<PatternViewResponse>(this.repoEndpoint + '/patternViews');
    }


    savePatternView(url: string, view: PatternView) {
        return this.http.post<PatternViewResponse>(url, view, {observe: 'response'});
    }

    addPatterns(url: string, patterns: Pattern[]): Observable<any> {
        const observables = patterns.map(pat => this.http.post<PatternViewResponse>(url, pat, {observe: 'response'}));
        return observables.length > 0 ? forkJoin(observables) : EMPTY;
    }

    getPatternViewByUri(encodedUri: string): Observable<PatternView> {
        return this.http.get<PatternView>(this.repoEndpoint + `/patternViews/findByUri?encodedUri=${encodedUri}`);
    }

    createLink(url, edge: DirectedEdgeModel | UndirectedEdgeModel): Observable<HttpResponse<Object>> {
        return this.http.post(url, edge, {observe: 'response'});
    }

    addLinks(urlDirectedLinks: string, urlUndirectedLinks: string, edges: (DirectedEdgeModel | UndirectedEdgeModel)[]): Observable<any> {

        const observables = edges
            .map(edge => this.http.post(!!edge['sourcePatternId'] ? urlDirectedLinks : urlUndirectedLinks, edge,
                {observe: 'response'}));
        return observables.length > 0 ? forkJoin(observables) : EMPTY;
    }
}
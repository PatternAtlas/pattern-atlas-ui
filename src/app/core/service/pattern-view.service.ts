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
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import Pattern from '../model/hal/pattern.model';
import {PatternView} from '../model/hal/pattern-view.model';
import {PatternViewResponse} from '../model/hal/pattern-view-response.interface';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';
import {LinksToOtherPattern} from '../../pattern-view-management/add-to-view/add-to-view.component';
import {AddDirectedEdgeToViewRequest} from '../model/hal/add-directed-edge-to-view-request';
import {AddUndirectedEdgeToViewRequest} from '../model/hal/add-undirected-edge-to-view-request';
import {Embedded} from '../model/hal/embedded';
import {UndirectedEdesResponse} from '../model/hal/undirected-edes-response.interface';
import {DirectedEdesResponse} from '../model/hal/directed-edes-response.interface';
import {GraphNode} from '../component/graph-display/graph-display.component';

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
        return observables.length > 0 ? forkJoin(observables) : of(null);
    }

    getPatternViewByUri(encodedUri: string): Observable<PatternView> {
        return this.http.get<PatternView>(this.repoEndpoint + `/patternViews/findByUri?encodedUri=${encodedUri}`);
    }

    createLink(url, edge: DirectedEdgeModel | UndirectedEdgeModel | AddDirectedEdgeToViewRequest | AddUndirectedEdgeToViewRequest): Observable<HttpResponse<Object>> {
        return this.http.post(url, edge, {observe: 'response'});
    }

    addLinks(patternView: PatternView, items: LinksToOtherPattern[]): Observable<any> {

        const observables = items
            .map(item => item.type === 'directed' ?
                this.http.post(patternView._links.directedEdges.href, new AddDirectedEdgeToViewRequest(<DirectedEdgeModel>item.edge), {observe: 'response'}) :
                this.http.post(patternView._links.undirectedEdges.href, new AddUndirectedEdgeToViewRequest(<UndirectedEdgeModel>item.edge), {observe: 'response'}));
        return observables.length > 0 ? forkJoin(observables) : EMPTY;
    }

    getDirectedEdges(patternView: PatternView): Observable<Embedded<DirectedEdesResponse>> {
        return this.http.get<Embedded<DirectedEdesResponse>>(patternView._links.directedEdges.href);
    }

    getUndirectedEdges(patternView: PatternView): Observable<Embedded<UndirectedEdesResponse>> {
        return this.http.get<Embedded<UndirectedEdesResponse>>(patternView._links.undirectedEdges.href);
    }

    deleteLink(patternLink: any): Observable<any> {
        return this.http.delete(patternLink);
    }

    saveGraph(patternView: PatternView, nodeList: any[]) {
        return this.http.post<any>(patternView._links.graph.href, nodeList, {observe: 'response'});
    }

    getGraph(patternView: PatternView) {
        return this.http.get<{ graph: Array<GraphNode> }>(patternView._links.graph.href);
    }

}

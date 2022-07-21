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
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import Pattern from '../model/hal/pattern.model';
import { PatternContainer } from '../model/hal/pattern-container.model';
import { PatternContainerResponse } from '../model/hal/pattern-container-response.interface';
import { DirectedEdgeModel } from '../model/hal/directed-edge.model';
import { UndirectedEdgeModel } from '../model/hal/undirected-edge.model';
import { LinksToOtherPattern } from '../../pattern-view-management/add-to-view/add-to-view.component'; // TODO move
// this to a
// model class
import { AddDirectedEdgeToViewRequest } from '../model/hal/add-directed-edge-to-view-request';
import { AddUndirectedEdgeToViewRequest } from '../model/hal/add-undirected-edge-to-view-request';
import { Embedded } from '../model/hal/embedded';
import { UndirectedEdgesResponse } from '../model/hal/undirected-edes-response.interface';
import { DirectedEdesResponse } from '../model/hal/directed-edes-response.interface';
import { GraphNode } from '../component/graph-display/graph-display.component';
import { GraphDataService } from './graph-data/graph-data.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class PatternViewService implements GraphDataService {

  private repoEndpoint = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  getPatternViews(): Observable<PatternContainerResponse> {
    return this.http.get<PatternContainerResponse>(this.repoEndpoint + '/patternViews');
  }

  savePatternView(url: string, view: PatternContainer): Observable<HttpResponse<PatternContainerResponse>> {
    return this.http.post<PatternContainerResponse>(url, view, { observe: 'response' });
  }

  addPatterns(url: string, patterns: Pattern[]): Observable<PatternContainerResponse> {
    const observables = patterns.map(pat => this.http.post<PatternContainerResponse>(url, pat, { observe: 'response' }));
    return observables.length > 0 ? forkJoin(observables) : of(null);
  }

  getPatternContainerByUri(encodedUri: string): Observable<PatternContainer> {
    return this.http.get<PatternContainer>(this.repoEndpoint + `/patternViews/findByUri?encodedUri=${encodedUri}`);
  }

  getPatternContainer(url: string): Observable<PatternContainer> {
    return this.http.get<PatternContainer>(url);
  }

  createLink(
    url,
    edge: DirectedEdgeModel | UndirectedEdgeModel | AddDirectedEdgeToViewRequest | AddUndirectedEdgeToViewRequest
  ): Observable<HttpResponse<unknown>> {
    return this.http.post(url, edge, { observe: 'response' });
  }

  addLinks(patternContainer: PatternContainer, items: LinksToOtherPattern[]): Observable<any> {

    const observables = items
      .map(item => item.type === 'directed' ?
        this.http.post(patternContainer._links.directedEdges.href, new AddDirectedEdgeToViewRequest(<DirectedEdgeModel>item.edge), { observe: 'response' }) :
        this.http.post(
          patternContainer._links.undirectedEdges.href,
          new AddUndirectedEdgeToViewRequest(<UndirectedEdgeModel>item.edge),
          { observe: 'response' })
      );
    return observables.length > 0 ? forkJoin(observables) : EMPTY;
  }

  getDirectedEdges(patternContainer: PatternContainer): Observable<Embedded<DirectedEdesResponse>> {
    return this.http.get<Embedded<DirectedEdesResponse>>(patternContainer._links.directedEdges.href);
  }

  getUndirectedEdges(patternContainer: PatternContainer): Observable<Embedded<UndirectedEdgesResponse>> {
    return this.http.get<Embedded<UndirectedEdgesResponse>>(patternContainer._links.undirectedEdges.href);
  }

  getDirectedEdgeById(patternViewId, edgeId: string): Observable<DirectedEdgeModel> {
    return this.http.get<DirectedEdgeModel>(this.repoEndpoint + /patternViews/ + patternViewId + /directedEdges/ + edgeId);
  }

  getUndirectedEdgeById(patternViewId, edgeId: string): Observable<UndirectedEdgeModel> {
    return this.http.get<UndirectedEdgeModel>(this.repoEndpoint + /patternViews/ + patternViewId + /undirectedEdges/ + edgeId);
  }

  deleteLink(patternLink: any): Observable<any> {
    return this.http.delete(patternLink);
  }

  saveGraph(patternView: PatternContainer, nodeList: any[]) {
    return this.http.post<any>(patternView._links.graph.href, nodeList, { observe: 'response' });
  }

  getGraph(patternView: PatternContainer) {
    return this.http.get<{ graph: Array<GraphNode> }>(patternView._links.graph.href);
  }

  getEdgeTypes(): Observable<string[]> {
    return of();
  }

  removeRelationFromView(patternContainer: PatternContainer, relation: any): void {
    relation.markerStart === undefined ?
      this.http.delete(patternContainer._links.directedEdges.href + '/' + relation.id).subscribe() :
      this.http.delete(patternContainer._links.undirectedEdges.href + '/' + relation.id).subscribe();
  }

  deletePatternView(patternViewId: PatternContainer) {
    return this.http.delete(patternViewId._links.self.href);
  }

}

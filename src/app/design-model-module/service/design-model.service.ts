/*
 * Copyright (c) 2020 University of Stuttgart.
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
import { globals } from '../../globals';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import Pattern from '../../core/model/hal/pattern.model';
import { PatternContainer } from '../../core/model/hal/pattern-container.model';
import { DirectedEdgeModel } from '../../core/model/hal/directed-edge.model';
import { UndirectedEdgeModel } from '../../core/model/hal/undirected-edge.model';
import { LinksToOtherPattern } from '../../pattern-view-management/add-to-view/add-to-view.component'; // TODO
import { AddDirectedEdgeToViewRequest } from '../../core/model/hal/add-directed-edge-to-view-request';
import { AddUndirectedEdgeToViewRequest } from '../../core/model/hal/add-undirected-edge-to-view-request';
import { Embedded } from '../../core/model/hal/embedded';
import { UndirectedEdesResponse } from '../../core/model/hal/undirected-edes-response.interface';
import { DirectedEdesResponse } from '../../core/model/hal/directed-edes-response.interface';
import { GraphNode } from '../../core/component/graph-display/graph-display.component';
import { DesignModel } from '../model/hal/design-model';
import { DesignModelResponse } from '../model/hal/design-model-response';
import { GraphDataService } from '../../core/service/graph-data.service';
import { map } from 'rxjs/operators';


@Injectable()
export class DesignModelService implements GraphDataService {

  private repoEndpoint = globals.repoEndpoint;

  constructor(private http: HttpClient) {
  }


  getDesignModels(): Observable<DesignModelResponse> {
    return this.http.get<DesignModelResponse>(this.repoEndpoint + '/designModels');
  }


  saveDesignModel(url: string, view: PatternContainer) {
    return this.http.post<DesignModelResponse>(url, view, { observe: 'response' });
  }

  addPatterns(url: string, patterns: Pattern[]): Observable<any> {
    const observables = patterns.map(pat => this.http.post<DesignModelResponse>(url, pat, { observe: 'response' }));
    return observables.length > 0 ? forkJoin(observables) : of(null);
  }

  getPatternContainerByUri(uri: string): Observable<PatternContainer> {
    return this.getDesignModelByUrl(uri).pipe(
      map(designModel => {
        const patternContainer = new PatternContainer();
        patternContainer.patterns = designModel._embedded.patterns;
        patternContainer._links = designModel._links;
        return patternContainer;
      })
    );
  }

  getPatternContainer(url: string): Observable<PatternContainer> {
    return this.getDesignModelByUrl(url).pipe(
      map(designModel => {
        const patternContainer = new PatternContainer();
        patternContainer.patterns = designModel._embedded.patterns;
        patternContainer._links = designModel._links;
        return patternContainer;
      })
    );
  }

  getPatternContainerByUuid(uuid: string): Observable<PatternContainer> {
    return this.getDesignModelByUuid(uuid).pipe(
      map(designModel => {
        const patternContainer = new PatternContainer();
        patternContainer.patterns = designModel._embedded ? designModel._embedded.patterns : [];
        patternContainer._links = designModel._links;
        return patternContainer;
      })
    );
  }

  getDesignModelByUrl(url: string): Observable<DesignModel> {
    return this.http.get<DesignModel>(url);
  }

  getDesignModelByUuid(uuid: string): Observable<DesignModel> {
    return this.http.get<DesignModel>(this.repoEndpoint + '/designModels/' + uuid + '/patterns');
  }

  createLink(
    url,
    edge: DirectedEdgeModel | UndirectedEdgeModel | AddDirectedEdgeToViewRequest | AddUndirectedEdgeToViewRequest
  ): Observable<HttpResponse<Object>> {
    return this.http.post(url, edge, { observe: 'response' });
  }

  addLinks(patternContainer: PatternContainer, items: LinksToOtherPattern[]): Observable<any> {

    const observables = items
      .map(item => item.type === 'directed' ?
        this.http.post(patternContainer._links.directedEdges.href, new AddDirectedEdgeToViewRequest(<DirectedEdgeModel>item.edge), { observe: 'response' }) :
        this.http.post(patternContainer._links.undirectedEdges.href, new AddUndirectedEdgeToViewRequest(<UndirectedEdgeModel>item.edge), { observe: 'response' }));
    return observables.length > 0 ? forkJoin(observables) : EMPTY;
  }

  getDirectedEdges(patternContainer: PatternContainer): Observable<Embedded<DirectedEdesResponse>> {
    return this.http.get<Embedded<DirectedEdesResponse>>(patternContainer._links.directedEdges.href);
  }

  getUndirectedEdges(patternContainer: PatternContainer): Observable<Embedded<UndirectedEdesResponse>> {
    return this.http.get<Embedded<UndirectedEdesResponse>>(patternContainer._links.undirectedEdges.href);
  }

  deleteLink(patternLink: any): Observable<any> {
    return this.http.delete(patternLink);
  }

  saveGraph(patternContainer: PatternContainer, nodeList: any[]) {
    return this.http.post<any>(patternContainer._links.patterns.href, nodeList, { observe: 'response' });
  }

  getGraph(patternContainer: PatternContainer): Observable<{ graph: Array<GraphNode> }> {
    const graphNodes = [];

    patternContainer.patterns.forEach(pattern => {
      let x = 0;
      let y = 0;

      try {
        x = pattern[ 'graphData' ][ 'x' ];
        y = pattern[ 'graphData' ][ 'y' ];
      } catch (e) {
      }

      graphNodes.push({
        id: pattern.id,
        title: pattern.name,
        type: 'default',
        x: x,
        y: y,
        patternLanguageId: pattern.patternLanguageId
      });
    });

    return of({ graph: graphNodes });
  }
}

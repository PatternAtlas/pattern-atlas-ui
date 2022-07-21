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
import { BehaviorSubject, EMPTY, forkJoin, Observable, of } from 'rxjs';
import Pattern from '../../core/model/hal/pattern.model';
import { PatternContainer } from '../../core/model/hal/pattern-container.model';
import { DirectedEdgeModel } from '../../core/model/hal/directed-edge.model';
import { UndirectedEdgeModel } from '../../core/model/hal/undirected-edge.model';
import { LinksToOtherPattern } from '../../pattern-view-management/add-to-view/add-to-view.component'; // TODO
import { AddDirectedEdgeToViewRequest } from '../../core/model/hal/add-directed-edge-to-view-request';
import { AddUndirectedEdgeToViewRequest } from '../../core/model/hal/add-undirected-edge-to-view-request';
import { GraphNode } from '../../core/component/graph-display/graph-display.component';
import { DesignModel } from '../model/hal/design-model';
import { DesignModelResponse } from '../model/hal/design-model-response';
import { GraphDataService } from '../../core/service/graph-data/graph-data.service';
import { map, tap } from 'rxjs/operators';
import { GraphDataSavePatternService } from '../../core/service/graph-data/graph-data-save-pattern.service';
import { TextComponent } from '@ustutt/grapheditor-webcomponent/lib/edge';
import { HalCollectionResponse } from '../model/hal/hal-collection-response';
import { HalEntityResponse } from '../model/hal/hal-entity-response';
import { environment } from '../../../environments/environment';

@Injectable()
export class DesignModelService implements GraphDataService, GraphDataSavePatternService {

  private readonly repoEndpoint = environment.API_URL;
  private readonly designModelsEndpoint = this.repoEndpoint + '/design-models';
  private designModelLinks;
  private edgeTypes = new BehaviorSubject<string[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  getDesignModels(): Observable<DesignModelResponse> {
    return this.httpClient.get<DesignModelResponse>(this.designModelsEndpoint);
  }

  saveDesignModel(url: string, view: PatternContainer) {
    return this.httpClient.post<DesignModelResponse>(url, view, { observe: 'response' });
  }

  addPatterns(url: string, patterns: Pattern[]): Observable<any> {
    console.warn('Add Patterns', url, patterns);
    const observables = patterns.map(pat => this.httpClient.post<DesignModelResponse>(url, pat, { observe: 'response' }));
    return observables.length > 0 ? forkJoin(observables) : of(null);
  }

  savePattern(patternContainer: PatternContainer, node: any) {
    const url = patternContainer._links.patterns.href + '/' + node.id + '/position';
    console.debug('Put Pattern on ', url, patternContainer, node);
    return this.httpClient.put<any>(url, node);
  }

  deletePattern(uuid: string): Observable<any> {
    console.debug('Delete pattern', this.designModelLinks.patterns.href, uuid);
    return this.httpClient.delete(this.designModelLinks.patterns.href + '/' + uuid).pipe(
      tap(response => {
        console.debug('Delete pattern response', response);
      })
    );
  }

  getPatternContainerByUri(uri: string): Observable<PatternContainer> {
    return this.getDesignModelByUrl(uri).pipe(
      map(designModel => {
        const patternContainer = new PatternContainer();
        patternContainer.patterns = designModel._embedded.patterns;
        patternContainer._links = designModel._links;
        this.designModelLinks = patternContainer._links;
        return patternContainer;
      })
    );
  }

  getPatternContainer(url: string): Observable<PatternContainer> {
    console.debug('Request pattern container');
    return this.getDesignModelByUrl(url).pipe(
      map(designModel => {
        const patternContainer = new PatternContainer();
        patternContainer.patterns = designModel._embedded.patterns;
        patternContainer._links = designModel._links;
        this.designModelLinks = patternContainer._links;
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
        this.designModelLinks = patternContainer._links;
        return patternContainer;
      })
    );
  }

  getDesignModelByUrl(url: string): Observable<DesignModel> {
    return this.httpClient.get<DesignModel>(url);
  }

  getDesignModelByUuid(uuid: string): Observable<DesignModel> {
    return this.httpClient.get<DesignModel>(this.designModelsEndpoint + '/' + uuid + '/patterns');
  }

  getEdgeTypes(): Observable<string[]> {
    if (!this.edgeTypes.getValue().length) {
      this.httpClient.get<HalEntityResponse>(this.designModelsEndpoint + '/edge-types').subscribe(
        response => this.edgeTypes.next(response.content.edgeTypes)
      );
    }

    return this.edgeTypes.asObservable();
  }

  getEdges(): Observable<DirectedEdgeModel[] | UndirectedEdgeModel[]> {
    return this.httpClient.get<HalCollectionResponse>(this.designModelLinks.edges.href)
      .pipe(
        map(edges => {
          return edges._embedded.edges.map(edge => {
            edge.texts = [{
              value: edge.type,
              width: 100,
              positionOnLine: 0.5,
              offsetX: 8,
              offsetY: -2,
              clickEventKey: 'edge-type',
              template: 'edge-label'
            } as TextComponent];
            return edge;
          });
        })
      );
  }

  addEdge(edge: DirectedEdgeModel | UndirectedEdgeModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.debug('Add edge', this.designModelLinks.edges.href, edge);
      this.httpClient.post(this.designModelLinks.edges.href, edge).subscribe(
        response => {
          console.debug('Add edge response', response);
          resolve();
        }, error => {
          console.error('Failed to add edge', error);
          reject();
        }
      );
    });
  }

  deleteEdge(edge: { source: string, target: string }): void {
    console.debug('Delete edge', this.designModelLinks.edges.href, edge);
    this.httpClient.delete(this.designModelLinks.edges.href + '/' + edge.source + '/' + edge.target).subscribe(response => {
      console.debug('Delete edge response', response);
    });
  }

  createLink(
    url,
    edge: DirectedEdgeModel | UndirectedEdgeModel | AddDirectedEdgeToViewRequest | AddUndirectedEdgeToViewRequest
  ): Observable<HttpResponse<unknown>> {
    return this.httpClient.post(url, edge, { observe: 'response' });
  }

  addLinks(patternContainer: PatternContainer, items: LinksToOtherPattern[]): Observable<any> {

    const observables = items
      .map(item => item.type === 'directed' ?
        this.httpClient.post(
          patternContainer._links.directedEdges.href,
          new AddDirectedEdgeToViewRequest(<DirectedEdgeModel>item.edge),
          { observe: 'response' }
        ) :
        this.httpClient.post(
          patternContainer._links.undirectedEdges.href,
          new AddUndirectedEdgeToViewRequest(<UndirectedEdgeModel>item.edge),
          { observe: 'response' }
        )
      );
    return observables.length > 0 ? forkJoin(observables) : EMPTY;
  }

  deleteLink(patternLink: any): Observable<any> {
    return this.httpClient.delete(patternLink);
  }

  saveGraph(patternContainer: PatternContainer, nodeList: any[]) {
    console.debug('Save Graph', patternContainer, nodeList);
    return this.httpClient.post<any>(patternContainer._links.patterns.href, nodeList, { observe: 'response' });
  }

  getGraph(patternContainer: PatternContainer): Observable<{ graph: Array<GraphNode> }> {
    const graphNodes = [];

    patternContainer.patterns.forEach(pattern => {
      let x = 0;
      let y = 0;

      try {
        x = pattern['graphData']['x'];
        y = pattern['graphData']['y'];
      } catch (e) {
      }

      graphNodes.push({
        id: pattern.id,
        title: pattern.name,
        uri: pattern.uri,
        iconUrl: pattern.iconUrl,
        type: 'default',
        x: x,
        y: y,
        patternLanguageId: pattern.patternLanguageId
      });
    });

    return of({ graph: graphNodes });
  }

  deleteDesignModel(designModel: DesignModel) {
    return this.httpClient.delete(designModel._links.self.href);
  }
}

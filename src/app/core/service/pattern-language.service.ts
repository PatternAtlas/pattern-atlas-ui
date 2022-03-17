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
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import PatternLanguages from '../model/hal/pattern-languages.model';
import { DirectedEdesResponse } from '../model/hal/directed-edes-response.interface';
import { Embedded } from '../model/hal/embedded';
import { UndirectedEdgesResponse } from '../model/hal/undirected-edes-response.interface';
import { GraphNode } from '../component/graph-display/graph-display.component';
import PatternLanguageModel from '../model/hal/pattern-language-model.model';
import PatternLanguageSchemaModel from '../model/pattern-language-schema.model';
import { GraphDataService } from './graph-data/graph-data.service';
import { PatternContainer } from '../model/hal/pattern-container.model';
import { PatternService } from './pattern.service';
import { PatternContainerResponse } from '../model/hal/pattern-container-response.interface';
import Pattern from '../model/hal/pattern.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class PatternLanguageService implements GraphDataService {

  private repoEndpoint = environment.API_URL;

  constructor(private http: HttpClient, private patternService: PatternService) {
  }

  getPatternLanguages(): Observable<Array<PatternLanguageModel>> {
    return this.getPatternLanguageResult()
      .pipe(
        map((result: PatternLanguages) => {
          return result._embedded ? result._embedded.patternLanguageModels : [];
        })
      );
  }

  public getPatternLanguagesSchemas(): Observable<PatternLanguageSchemaModel[]> {
    return this.http.get<any>(this.repoEndpoint + '/patternLanguages/patternSchemas').pipe(
      map(result => result._embedded ? result._embedded.patternLanguageSchemaModels : []
      )
    );
  }

  public getPatternLanguageResult(): Observable<PatternLanguages> {
    return this.http.get<PatternLanguages>(this.repoEndpoint + '/patternLanguages');
  }

  getPatternLanguageByUrl(url: string): Observable<PatternLanguage> {
    return this.http.get(url).pipe(
      map(res => <PatternLanguage>res)
    );
  }

  getPatternLanguageByEncodedUri(encodedUri: string): Observable<PatternLanguage> {
    const url = this.repoEndpoint + '/patternLanguages/findByUri?encodedUri=' + encodedUri;
    return this.http.get<PatternLanguage>(url);
  }

  getPatternLanguageById(id: string): Observable<PatternLanguage> {
    const url = this.repoEndpoint + '/patternLanguages/' + id;
    return this.http.get<PatternLanguage>(url);
  }

  savePatternLanguage(patternLanguage: PatternLanguage): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.repoEndpoint + '/patternLanguages', patternLanguage, { observe: 'response' });
  }

  getDirectedEdges(patternLanguage: PatternLanguage): Observable<Embedded<DirectedEdesResponse>> {
    return this.http.get<Embedded<DirectedEdesResponse>>(patternLanguage._links.directedEdges.href);
  }

  getUndirectedEdges(patternLanguage: PatternLanguage): Observable<Embedded<UndirectedEdgesResponse>> {
    return this.http.get<Embedded<UndirectedEdgesResponse>>(patternLanguage._links.undirectedEdges.href);
  }

  saveGraph(patternLanguage: PatternLanguage, nodes: Array<any>) {
    return this.http.post<any>(patternLanguage._links.graph.href, nodes, { observe: 'response' });
  }

  getGraph(patternLanguage: PatternLanguage) {
    return this.http.get<{ graph: Array<GraphNode> }>(patternLanguage._links.graph.href);
  }

  getPatternLanguageByID(patternLanguageId: string): Observable<PatternLanguage> {
    const url = this.repoEndpoint + '/patternLanguages/' + patternLanguageId;
    return this.http.get<PatternLanguage>(url);
  }

  addPatterns(url: string, patterns: Pattern[]): Observable<PatternContainerResponse> {
    return this.patternService.savePattern(url, patterns);
  }

  getPatternContainer(url: string): Observable<PatternContainer> {
    return this.getPatternLanguageByUrl(url);
  }

  getPatternContainerByUri(uri: string): Observable<PatternContainer> {
    return this.getPatternLanguageByEncodedUri(uri);
  }

  getEdgeTypes(): Observable<string[]> {
    return of();
  }

  deletePatternLanguage(patternLanguageId: string) {
    const url = this.repoEndpoint + '/patternLanguages/' + patternLanguageId;
    return this.http.delete(url);
  }
}

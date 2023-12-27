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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Pattern from '../model/hal/pattern.model';
import { map } from 'rxjs/operators';
import { PatternResponse } from '../model/hal/pattern-response.interface';
import PatternLanguage from '../model/hal/pattern-language.model';
import { Edge } from '../model/hal/edge.model';
import { environment } from '../../../environments/environment';
import PatternModel from '../model/pattern.model';

@Injectable()
export class PatternService {

  private repoEndpoint = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  public getPatternByEncodedUri(encodedUri: string): Observable<PatternModel> {
    const url = this.repoEndpoint + '/patterns/search/findByUri?encodedUri=' + encodedUri;
    return this.http.get<PatternModel>(url);
  }

  getPatternsByUrl(patternsUrl: string): Observable<Array<Pattern>> {
    return this.http.get<PatternResponse>(patternsUrl).pipe(
      map(result => {
        return <Array<Pattern>>(result && result._embedded ? result._embedded.patternModels : []);
      })
    );
  }

  getPatternContentByPattern(pattern: PatternModel): Observable<{ content: any }> {
    return this.http.get<{ content: any }>(this.repoEndpoint + '/pattern-languages/' + pattern.patternLanguageId + '/patterns/' + pattern.id + '/content');
  }

  getPatternRenderedContentByPattern(pattern: PatternModel): Observable<{ renderedContent: any }> {
    return this.http.get<{ renderedContent: any }>(this.repoEndpoint + '/pattern-languages/' + pattern.patternLanguageId + '/patterns/' + pattern.id + '/rendered-content');
  }

  savePattern(url: string, pattern: any): Observable<any> {
    return this.http.post<Pattern>(url, pattern, { observe: 'response' });
  }

  updatePattern(pattern: PatternModel): Observable<any> {
    return this.http.put<Pattern>(this.repoEndpoint + '/pattern-languages/' + pattern.patternLanguageId + '/patterns/' + pattern.id, pattern, { observe: 'response' });
  }

  deletePattern(url: string): Observable<any> {
    return this.http.delete<Pattern>(url);
  }

  getLinksForPattern(url: string) {
    return this.http.get<Array<Edge>>(url);
  }

  getPatternByPatternLanguageId(patternLanguageId: string, patternId: string): Observable<PatternModel> {
    return this.http.get <PatternModel>(
      this.repoEndpoint + '/pattern-languages/' + patternLanguageId + '/patterns/' + patternId
    );
  }

  getPatternsByPatternLanguageId(patternLanguageId: string): Observable<Array<PatternModel>> {
    return this.http.get <Array<PatternModel>>(this.repoEndpoint + '/pattern-languages/' + patternLanguageId + '/patterns');
  }

  getPatternByUrl(href: string): Observable<PatternResponse> {
    return this.http.get<PatternResponse>(href);
  }
}

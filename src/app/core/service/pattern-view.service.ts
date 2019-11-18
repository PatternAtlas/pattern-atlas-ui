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
import {HttpClient} from '@angular/common/http';
import {globals} from '../../globals';
import {Observable} from 'rxjs';
import Pattern from '../model/hal/pattern.model';
import {map} from 'rxjs/operators';
import {PatternResponse} from '../model/hal/pattern-response.interface';
import {PatternView} from '../model/hal/pattern-view.model';
import {Embedded} from '../model/hal/embedded';
import {PatternViewResponse} from '../model/hal/pattern-view-response.interface';

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
}

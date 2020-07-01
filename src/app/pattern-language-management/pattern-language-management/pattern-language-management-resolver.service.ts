/*
 * Copyright (c) 2018 University of Stuttgart.
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
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PatternLanguageService } from '../../core/service/pattern-language.service';
import { Observable } from 'rxjs';
import PatternLanguageModel from '../../core/model/hal/pattern-language-model.model';

@Injectable({
  providedIn: 'root'
})
export class PatternLanguageManagementResolverService implements Resolve<Array<PatternLanguageModel>> {

  constructor(private patternLanguageService: PatternLanguageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<PatternLanguageModel>> {
    return this.patternLanguageService.getPatternLanguages();
  }

}

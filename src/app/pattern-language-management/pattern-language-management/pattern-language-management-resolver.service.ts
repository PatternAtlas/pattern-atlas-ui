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
import PatternLanguage from '../../core/model/pattern-language.model';
import { Observable } from 'rxjs';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import { LoaderRegistryService } from '../../core/service/loader/pattern-language-loader/loader-registry.service';
import { mergeMap } from 'rxjs/operators';
import { globals } from '../../globals';
import { LinkedOpenPatternsLoader } from '../../core/service/loader/pattern-language-loader/linked-open-patterns-loader.service';

@Injectable({
    providedIn: 'root'
})
export class PatternLanguageManagementResolverService implements Resolve<Map<string, PatternLanguage>> {
    private urlPatternPedia = globals.urlPatternRepoOntology;
    private patternPediaInstance = globals.iriPatternRepoInstance;
    private loadLocally = globals.loadOntologyLocally;

    constructor(private pos: PatternOntologyService,
                private loader: LinkedOpenPatternsLoader) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string, PatternLanguage>> {
        return this.loadLocally ? this.loadLocallyHostedOntos() : this.loadPatternPedia();
    }

    loadLocallyHostedOntos(): Observable<Map<string, PatternLanguage>> {
        return this.pos.loadLocallyHostedOntos()
            .pipe(
                mergeMap(() => {
                    return this.loader.loadContentFromStore();
                })
            );
    }

    loadPatternPedia(): Observable<Map<string, PatternLanguage>> {
        return this.pos.loadOntologyWithImportsToStore(this.urlPatternPedia)
            .pipe(mergeMap(() => {
                return this.loader.loadContentFromStore();
            }));
    }
}

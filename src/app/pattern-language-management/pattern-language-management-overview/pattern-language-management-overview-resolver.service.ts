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
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import PatternLanguage from '../../extensions/repository/pattern-pedia/model/pattern-language';
import { forkJoin, Observable, of } from 'rxjs';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import { LoaderRegistryService } from '../../core/service/loader/pattern-language-loader/loader-registry.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PatternLanguageManagementOverviewResolverService implements Resolve<Map<string, PatternLanguage>> {
    private urlPatternPedia = 'http://purl.org/patternpedia';
    private patternPediaInstance = 'http://purl.org/patternpedia#LinkedOpenPatterns';

    constructor(private pos: PatternOntologyService,
                private lr: LoaderRegistryService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string, PatternLanguage>> {
        const debug = false;
        if (!debug) {
            const locally = true;
            if (locally) {
                return this.loadLocallyHostedOntos();
            } else {
                return this.loadPatternPedia();
            }
        } else {
            const m = new Map();
            m.set('cloudcomputingpatterns', new PatternLanguage('cloudcomputingpatterns', 'Cloud Computing Patterns', [], []));
            m.set('internetofthingspatterns', new PatternLanguage('internetofthingspatterns', 'IoT Patterns', [], []));
            return of(m);
        }
    }

    loadLocallyHostedOntos(): Observable<Map<string, PatternLanguage>> {
        const observables = [
            this.pos.loadOntologyToStore('assets/patternpedia.ttl'),
            this.pos.loadOntologyToStore('assets/cloudcomputingpatterns.ttl'),
            this.pos.loadOntologyToStore('assets/internetofthingspatterns.ttl')
        ];
        return forkJoin(observables)
            .pipe(
                mergeMap(result => {
                    console.log('LOADED ONTOS LOCALLY: ', result);
                    return this.lr.getContentLoader<PatternLanguage>(this.patternPediaInstance)
                        .loadContentFromStore();
                })
            );
    }

    loadPatternPedia(): Observable<Map<string, PatternLanguage>> {
        return this.pos.loadOntologyWithImportsToStore(this.urlPatternPedia)
            .pipe(mergeMap(value => {
                // Todo: here we go wit this.pll
                return this.lr.getContentLoader<PatternLanguage>(this.patternPediaInstance)
                    .loadContentFromStore();
            }));
    }
}

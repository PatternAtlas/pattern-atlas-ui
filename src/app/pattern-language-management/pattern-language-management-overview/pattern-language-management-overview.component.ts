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

import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import PatternLanguageModel from '../../core/model/pattern-language.model';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import { LoaderRegistryService } from '../../core/service/loader/pattern-language-loader/loader-registry.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'pp-pattern-language-management-overview',
    templateUrl: './pattern-language-management-overview.component.html',
    styleUrls: ['./pattern-language-management-overview.component.scss']
})
export class PatternLanguageManagementOverviewComponent implements OnInit {

    private urlPatternPedia = 'http://purl.org/patternpedia';
    private patternPediaInstance = 'http://purl.org/patternpedia#LinkedOpenPatterns';
    patternLanguages: Array<PatternLanguageModel>;

    constructor(private pos: PatternOntologyService,
                private cdr: ChangeDetectorRef,
                private lr: LoaderRegistryService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone) {
    }

    ngOnInit() {
        // this.loadPatternPedia();

        this.patternLanguages = Array.from<PatternLanguageModel>(this.activatedRoute.snapshot.data.patternlanguages.values())
            .sort((pl1: PatternLanguageModel, pl2: PatternLanguageModel) => {
                if (pl1.name > pl2.name) {
                    return 1;
                }
                if (pl1.name < pl2.name) {
                    return -1;
                }
                return 0;
            });
    }

    loadLocallyHostedOntos() {
        const observables = [
            this.pos.loadOntologyToStore('assets/patternpedia.ttl'),
            this.pos.loadOntologyToStore('assets/cloudcomputingpatterns.ttl'),
            this.pos.loadOntologyToStore('assets/internetofthingspatterns.ttl')
        ];
        forkJoin(observables)
            .subscribe(result => {
                console.log('LOADED ONTOS LOCALLY: ', result);
                this.lr.getContentLoader<PatternLanguageModel>(this.patternPediaInstance)
                    .loadContentFromStore()
                    .subscribe(async (languages) => {
                        this.patternLanguages = await Array.from<PatternLanguageModel>(languages.values())
                            .sort((pl1: PatternLanguageModel, pl2: PatternLanguageModel) => {
                                if (pl1.name > pl2.name) {
                                    return 1;
                                }
                                if (pl1.name < pl2.name) {
                                    return -1;
                                }
                                return 0;
                            });
                        this.cdr.detectChanges();
                    });
            });
    }

    reloadPatternRepo() {
        this.loadLocallyHostedOntos();
    }

    navigateToPL(id: string): void {
        this.zone.run(() => {
            this.router.navigate([id], {relativeTo: this.activatedRoute});
        });
    }

    loadPatternPedia() {
        this.pos.loadOntologyWithImportsToStore(this.urlPatternPedia)
            .subscribe(value => {
                // Todo: here we go wit this.pll
                this.lr.getContentLoader<PatternLanguageModel>(this.patternPediaInstance)
                    .loadContentFromStore()
                    .subscribe(async (result) => {
                        this.patternLanguages = Array.from(result.values());
                        this.cdr.detectChanges();
                    });
            }, error1 => console.error(error1));
    }

    addPatternLanguageIndividual(): void {
        this.pos.insertNewPatternLanguageIndividual(null)
            .subscribe(value => this.ngOnInit());
    }

    execQuery() {
        this.pos.getPatternsOfPatternLanguage('http://purl.org/patternpedia/cloudcomputingpatterns#CloudComputingPatterns')
            .subscribe(result => {
                console.log(JSON.stringify(result));
                // for (const key in result) {
                //     console.log(JSON.stringify(key));
                //     console.log(parseURI(result[key].iri));
                // }
            });
    }

}


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
import PatternLanguage from '../../core/model/new/pattern-language.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { ToasterService } from 'angular2-toaster';
import { PatternLanguageService } from '../../core/service/pattern-language.service';
import { UriConverter } from '../../core/util/uri-converter';
import { CreateEditPatternLanguageComponent } from '../create-edit-pattern-language/create-edit-pattern-language.component';
import { DialogPatternLanguageResult } from '../data/DialogPatternLanguageResult.interface';

@Component({
    selector: 'pp-pattern-language-management',
    templateUrl: './pattern-language-management.component.html',
    styleUrls: ['./pattern-language-management.component.scss']
})


export class PatternLanguageManagementComponent implements OnInit {

    patternLanguages: Array<PatternLanguage>;

    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private zone: NgZone,
        private dialog: MatDialog,
        private _cookieService: CookieService,
        private _toasterService: ToasterService,
        private patternLanguageService: PatternLanguageService) {
    }

    // function used to sort the patternlanguages (by name)
    private static sortPatternlanguages(pl1: PatternLanguage, pl2: PatternLanguage): number {
        if (pl1.name > pl2.name) {
            return 1;
        }
        if (pl1.name < pl2.name) {
            return -1;
        }
        return 0;
    }

    ngOnInit() {
        this.patternLanguages = Array.from<PatternLanguage>(this.activatedRoute.snapshot.data.patternlanguages.values())
            .sort(PatternLanguageManagementComponent.sortPatternlanguages);
    }

    // reload the current data from https://purl.org/patternpedia that contains all patternlangauges
    async reloadPatternRepo() {
        this.patternLanguages = await this.patternLanguageService.getPatternLanguages()
            .then(result => {
                return result.sort(PatternLanguageManagementComponent.sortPatternlanguages);
            })
            .then(result => {
                this._toasterService.pop('success', 'Reloaded Pattern Languages');
                this.cdr.detectChanges();
                return result;
            });
        this.cdr.detectChanges();
    }

    navigateToPL(id: string): void {
        const patternLanguage = this.patternLanguages.find((pl: PatternLanguage) => pl.id === id);
        this.zone.run(() => {
            console.log(JSON.stringify(patternLanguage));
            this.router.navigate([UriConverter.doubleEncodeUri(patternLanguage.uri)], {relativeTo: this.activatedRoute});
        });
    }

    goToPatternLanguageCreation(): void {
        const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent);

        // Save PatternLanguage when user presses save
        (<CreateEditPatternLanguageComponent>dialogRef.componentInstance)
            .saveClicked.subscribe((result: DialogPatternLanguageResult) => {
            const patternLanguage = result.patternLanguage;
            this.patternLanguageService.savePatternLanguage(patternLanguage)
                .then(postResult => {
                  this.patternLanguages.push(<PatternLanguage> postResult.body);
                    this._toasterService.pop('success', 'Pattern Language created');
                })
                .catch(err => {
                    console.error(err);
                    this._toasterService.pop('error', 'Error occurred', JSON.stringify(err));
                });
        });
    }
}

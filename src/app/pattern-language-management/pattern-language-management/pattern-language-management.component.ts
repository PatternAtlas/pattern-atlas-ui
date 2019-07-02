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
import PatternLanguage from '../../core/model/pattern-language.model';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import { LoaderRegistryService } from '../../core/service/loader/pattern-language-loader/loader-registry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { globals } from '../../globals';
import { LinkedOpenPatternsLoader } from '../../core/service/loader/pattern-language-loader/linked-open-patterns-loader.service';
import { CreateEditPatternLanguageComponent } from '../create-edit-pattern-language/create-edit-pattern-language.component';
import { MatDialog } from '@angular/material';
import { GithubPersistenceService } from '../../core/service/github-persistence.service';
import { DialogPatternLanguageResult } from '../data/DialogPatternLanguageResult.interface';
import { switchMap, tap } from 'rxjs/internal/operators';
import { CookieService } from 'ngx-cookie-service';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'pp-pattern-language-management',
    templateUrl: './pattern-language-management.component.html',
    styleUrls: ['./pattern-language-management.component.scss']
})


export class PatternLanguageManagementComponent implements OnInit {

    // NOTE: These are currently the config params
    private urlPatternPedia = globals.urlPatternRepoOntology;
    private patternPediaInstance = globals.iriPatternRepoInstance;
    private loadLocally = globals.loadOntologyLocally;
  showAuthentificationButton = true;

  patternLanguages: Array<PatternLanguage>;

    constructor(private pos: PatternOntologyService,
                private cdr: ChangeDetectorRef,
                private lr: LoaderRegistryService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone,
                private loader: LinkedOpenPatternsLoader,
                private dialog: MatDialog,
                private uploadService: GithubPersistenceService,
                private _cookieService: CookieService,
                private _toasterService: ToasterService) {
    }

    getTurtle(): void {
        this.pos.getOntologyAsTurtle()
            .subscribe((turtle) => {
                console.log(turtle);
            });
    }

    ngOnInit() {
        this.patternLanguages = Array.from<PatternLanguage>(this.activatedRoute.snapshot.data.patternlanguages.values())
            .sort((pl1: PatternLanguage, pl2: PatternLanguage) => {
                if (pl1.name > pl2.name) {
                    return 1;
                }
                if (pl1.name < pl2.name) {
                    return -1;
                }
                return 0;
            });
      this.showAuthentificationButton = !this._cookieService.get('patternpedia_github_token');

    }

    async loadLocallyHostedOntos(): Promise<void> {
      await this.pos.loadLinkedOpenPatternGraphs();
        return this.loader.loadContentFromStore()
            .then(async (languages) => {
                this.patternLanguages = await Array.from<PatternLanguage>(languages.values())
                    .sort((pl1: PatternLanguage, pl2: PatternLanguage) => {
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
    }

    loadPatternPedia(): void {
        this.pos.loadOntologyWithImportsToStore(this.urlPatternPedia, this.urlPatternPedia)
            .then(() => {
                    return this.loader.loadContentFromStore();
                }
            ).then(async (languages) => {
            this.patternLanguages = await Array.from<PatternLanguage>(languages.values())
                .sort((pl1: PatternLanguage, pl2: PatternLanguage) => {
                    if (pl1.name > pl2.name) {
                        return 1;
                    }
                    if (pl1.name < pl2.name) {
                        return -1;
                    }
                    return 0;
                });
          this._toasterService.pop('success', 'Loaded patternlanguages');
          this.cdr.detectChanges();
        });
    }

    reloadPatternRepo() {
        this.loadLocally ? this.loadLocallyHostedOntos() : this.loadPatternPedia();
    }

    navigateToPL(id: string): void {
        this.zone.run(() => {
            this.router.navigate([id], {relativeTo: this.activatedRoute});
        });
    }

    // TODO: Move this to patternlanguage rendering component for adding pattern individuals not pl individuals
    addPatternLanguageIndividual(): void {
        this.pos.insertNewPatternLanguageIndividual(null)
            .subscribe(() => this.ngOnInit());
    }

  getOAuthToken(): void {
    window.open('https://github.com/login/oauth/authorize?client_id=2c81550780e16f8c2642&scope=repo', '_blank');
  }

  goToPatternLanguageCreation(): void{
    this.pos.getOntologyAsTurtle().subscribe(res => console.log(res));
    const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent);
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result);
    });

    (<CreateEditPatternLanguageComponent> dialogRef.componentInstance).onSaveClicked.subscribe((result: DialogPatternLanguageResult) => {
      const patternlanguage = new PatternLanguage(this.urlPatternPedia + '/patternlanguages/' + result.name.replace(/\s/g, ''), result.name, [result.iconUrl], null,
        result.sections, result.restrictions);
      this.uploadService.uploadPatternLanguage(patternlanguage).pipe(
        switchMap(() => {
          return this.uploadService.addPatternLanguageToPatternPedia(patternlanguage, this.patternLanguages);
        }),
        tap(() => this._toasterService.pop('success', 'Created new patternlanguage')),
        switchMap(() => {
          return this.pos.insertNewPatternLanguageIndividual(patternlanguage);
        })
      ).subscribe((res) => {
          this._toasterService.pop('success', 'Created new patternlanguage');
        },
        (error) => {
          this._toasterService.pop('error', `An error occured while creating the patternlanguage: ${error.message}`);
        }
      );
    });
  }
}

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
import { CookieService } from 'ngx-cookie-service';
import { ToasterService } from 'angular2-toaster';
import { IriConverter } from '../../core/util/iri-converter';
import { PatternLanguagePatterns } from '../../core/model/pattern-language-patterns.model';
import { switchMap, tap } from 'rxjs/internal/operators';
import { forkJoin } from 'rxjs';
import { PatternLanguageRelations } from '../../core/model/pattern-language-relations.model';
import { PatternRelations } from '../../core/model/pattern-relations';

@Component({
    selector: 'pp-pattern-language-management',
    templateUrl: './pattern-language-management.component.html',
    styleUrls: ['./pattern-language-management.component.scss']
})


export class PatternLanguageManagementComponent implements OnInit {

    // NOTE: These are currently the config params
    private urlPatternPedia = globals.urlPatternRepoOntology;
    private patternPediaInstance = globals.iriPatternRepoInstance;
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

  // reload the current data from https://purl.org/patternpedia that contains all patternlangauges
  async reloadPatternRepo() {
    await this.pos.loadLinkedOpenPatternGraphs();
    return this.loader.loadContentFromStore()
      .then(async (languages) => {
        this.patternLanguages = await Array.from<PatternLanguage>(languages.values())
          .sort(this.sortPatternlanguages);
        this.cdr.detectChanges();
      }).then(() => {
        this._toasterService.pop('success', 'Reloaded Linked Open Patterns from Patternpedia');
      });
    }

    navigateToPL(id: string): void {
        this.zone.run(() => {
            this.router.navigate([id], {relativeTo: this.activatedRoute});
        });
    }


  getOAuthToken(): void {
    const clientId = window.location.hostname === 'localhost' ? '2c81550780e16f8c2642' : '4ce2e1263f2e81b69c6e';
    window.open(`https://github.com/login/oauth/authorize?scope=repo&client_id=${clientId}`, '_blank');
  }

  goToPatternLanguageCreation(): void {
    this.pos.getOntologyAsTurtle().subscribe(res => console.log(res));
    const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent);

    // update patternpedia, when user saves a patternlanguage:
    (<CreateEditPatternLanguageComponent> dialogRef.componentInstance).saveClicked.subscribe((result: DialogPatternLanguageResult) => {
      const normalizedPatternlanguageName = IriConverter.removeWhitespace(result.name).toLowerCase();
      const patternlanguage = new PatternLanguage(this.urlPatternPedia + '/patternlanguages/' + normalizedPatternlanguageName,
        result.name, [result.iconUrl], null, result.sections, result.restrictions, result.prefixes);
      const patternLanguagePatterns = new PatternLanguagePatterns(IriConverter.getPatternListIriForPLIri(patternlanguage.iri), patternlanguage.iri, []);
      const patternLanguageRelations = new PatternLanguageRelations(IriConverter.getRelationListIriForPLIri(patternlanguage.iri), patternlanguage.iri, new PatternRelations());
      this.uploadService.uploadPatternLanguage(patternlanguage).pipe(
        switchMap(() => {
          return this.uploadService.addPatternLanguageToPatternPedia(patternlanguage, this.patternLanguages);
        }),
        switchMap(() => {
          return this.uploadService.uploadPLPatternsAndRelations(patternLanguagePatterns, patternLanguageRelations);
        }),
        tap(() => this._toasterService.pop('success', 'Created new patternlanguage')),
        switchMap(() => {
          return forkJoin(
            // load the new patternlanguage's data into the store, so we can use it's metadata when we navigate to it

            this.pos.loadUrisToStore([{value: patternlanguage.iri, token: null}]),
            // load the updated patternpedia file which contains the new patternlanguage into store
            this.pos.loadUrisToStore([{value: 'https://purl.org/patternpedia', token: null}]));
        })
      ).subscribe((res) => { // update view, because our store data has changed (new patternlanguage)
        this.reloadPatternLanguageFromStore();
      });
    });
  }

  // function used to sort the patternlanguages (by name)
  private sortPatternlanguages(pl1: PatternLanguage, pl2: PatternLanguage): number {
    if (pl1.name > pl2.name) {
      return 1;
    }
    if (pl1.name < pl2.name) {
      return -1;
    }
    return 0;
  }

  // retrieve all the patternlanguage from our triple store and update the view
  private reloadPatternLanguageFromStore() {
    this.loader.loadContentFromStore().then(async (languages) => {
        this.patternLanguages = await Array.from<PatternLanguage>(languages.values())
          .sort(this.sortPatternlanguages);
        this._toasterService.pop('success', 'Reloaded Linked Open Patterns from Patternpedia');
      },
      (error) => {
        this._toasterService.pop('error', `An error occured while loading Linked Open Patterns from Patternpedia: ${error.message}`);
      }
    );
  }
}

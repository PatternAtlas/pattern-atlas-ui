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
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToasterService } from 'angular2-toaster';
import { PatternLanguageService } from '../../core/service/pattern-language.service';
import {
  CreateEditComponentDialogType, CreateEditPatternLanguageComponent
} from '../../core/component/create-edit-pattern-language/create-edit-pattern-language.component';
import { DialogPatternLanguageResult } from '../data/DialogPatternLanguageResult.interface';
import { map } from 'rxjs/operators';
import PatternLanguageModel from '../../core/model/hal/pattern-language-model.model';
import { DeleteConfirmationDialogComponent } from '../../core/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UiFeatures } from '../../core/directives/pattern-atlas-ui-repository-configuration.service';
import { PrivilegeService } from '../../authentication/_services/privilege.service';

@Component({
  selector: 'pp-pattern-language-management',
  templateUrl: './pattern-language-management.component.html',
  styleUrls: ['./pattern-language-management.component.scss']
})

export class PatternLanguageManagementComponent implements OnInit {

  patternLanguages: Array<PatternLanguageModel>;
  readonly UiFeatures = UiFeatures;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private dialog: MatDialog,
    private _cookieService: CookieService,
    private _toasterService: ToasterService,
    private patternLanguageService: PatternLanguageService,
    private p: PrivilegeService) {
  }

  // function used to sort the patternlanguages (by name)
  private static sortPatternLanguages(pl1: PatternLanguageModel, pl2: PatternLanguageModel): number {
    if (pl1.name > pl2.name) {
      return 1;
    }
    if (pl1.name < pl2.name) {
      return -1;
    }
    return 0;
  }

  ngOnInit() {
    this.patternLanguages = Array.from<PatternLanguageModel>(this.activatedRoute.snapshot.data.patternlanguages.values())
      .sort(PatternLanguageManagementComponent.sortPatternLanguages);
    this.reloadPatternRepo();
  }

  async reloadPatternRepo() {
    this.patternLanguageService.getPatternLanguages()
      .pipe(
        map(result => result.sort(PatternLanguageManagementComponent.sortPatternLanguages)))
      .subscribe(result => {
        this.patternLanguages = result;
        this.cdr.detectChanges();
        return result;
      });
    this.cdr.detectChanges();
  }

  navigateToPL(pl: PatternLanguageModel): void {
    this.zone.run(() => {
      this.router.navigate([pl.id], { relativeTo: this.activatedRoute });
    });
  }

  goToPatternLanguageCreation(): void {
    const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent, { data: { componentDialogType: CreateEditComponentDialogType.PATTERN_LANGUAGE } });

    // Save PatternLanguage when user presses save
    (<CreateEditPatternLanguageComponent>dialogRef.componentInstance).saveClicked
      .subscribe((result: DialogPatternLanguageResult) => {
        const patternLanguage = <PatternLanguage>result.dialogResult;
        this.patternLanguageService.savePatternLanguage(patternLanguage)
          .subscribe(() => {
            this.patternLanguageService.getPatternLanguages()
              .pipe(
                map(patternLanguageModels => patternLanguageModels.sort(PatternLanguageManagementComponent.sortPatternLanguages)))
              .subscribe(patternLanguageModels => {
                this.patternLanguages = patternLanguageModels;
              });
            this._toasterService.pop('success', 'Pattern Language created');
          }, err => {
            console.error(err);
            this._toasterService.pop('error', 'Error occurred', JSON.stringify(err));
          });
      });
  }

  delete(patternLanguage: PatternLanguageModel) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        name: patternLanguage.name,
      }
    }).afterClosed().subscribe(dialogAnswer => {
      if (dialogAnswer) {
        this.patternLanguageService.deletePatternLanguage(patternLanguage.id).subscribe((response) => {
          this.patternLanguages.splice(this.patternLanguages.indexOf(patternLanguage), 1);
          this._toasterService.pop('success', 'Pattern Language deleted!');
        }, (error) => {
          this._toasterService.pop('error', 'Pattern Language could not be deleted!',
            'A Pattern Language can only be deleted if it does not contain any patterns.');
        });

      }
    })

  }
}

import { Component, NgZone, OnInit } from '@angular/core';
import { PatternViewService } from '../../core/service/pattern-view.service';
import { PatternContainer } from '../../core/model/hal/pattern-container.model';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateEditComponentDialogType, CreateEditPatternLanguageComponent
} from '../../core/component/create-edit-pattern-language/create-edit-pattern-language.component';
import { DialogPatternLanguageResult } from '../../pattern-language-management/data/DialogPatternLanguageResult.interface';
import { PatternLanguageService } from '../../core/service/pattern-language.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PatternContainerResponse } from '../../core/model/hal/pattern-container-response.interface';
import { ToasterService } from 'angular2-toaster';
import { UriConverter } from '../../core/util/uri-converter';
import UriEntity from '../../core/model/hal/uri-entity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../../core/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UiFeatures } from '../../core/directives/pattern-atlas-ui-repository-configuration.service';

@Component({
  selector: 'pp-solution-language-management',
  templateUrl: './pattern-view-management.component.html',
  styleUrls: ['./pattern-view-management.component.scss']
})
export class PatternViewManagementComponent implements OnInit {
  public patternViewResponse;
  readonly UiFeatures = UiFeatures;

  constructor(private patternViewService: PatternViewService, private dialog: MatDialog, private patternLanguageService: PatternLanguageService,
              private toastService: ToasterService, private activatedRoute: ActivatedRoute, private router: Router, private zone: NgZone) {
  }

  ngOnInit() {

    this.getData().subscribe();

  }

  private getData(): Observable<PatternContainerResponse> {
    return this.patternViewService.getPatternViews().pipe(tap((views) => {
      this.patternViewResponse = views;
    }));

  }

  navigate(view: UriEntity): void {
    this.zone.run(() => {
      this.router.navigate([UriConverter.doubleEncodeUri(view.uri)], { relativeTo: this.activatedRoute });
    });
  }

  createView() {
    const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent, { data: { componentDialogType: CreateEditComponentDialogType.PATTERN_VIEW } });
    let view;
    // Save PatternLanguage when user presses save
    (<CreateEditPatternLanguageComponent>dialogRef.componentInstance)
      .saveClicked
      .pipe(
        tap((result: DialogPatternLanguageResult) => {
          console.log(result.dialogResult);
          view = <PatternContainer>result.dialogResult;
        }),
        switchMap(() => this.patternViewService.savePatternView(this.patternViewResponse._links.patternViews.href, view)),
        switchMap(() => this.getData())
      )
      .subscribe(res => {
        if (res) {
          this.toastService.pop('success', 'Created View');
        }
      });
  }

  deletePatternView(patternView: PatternContainer) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        name: patternView.name,
      }
    }).afterClosed().subscribe(dialogAnswer => {
      if (dialogAnswer) {
        this.patternViewService.deletePatternView(patternView).subscribe((response) => {
          for (let i = 0; i < this.patternViewResponse._embedded.patternViews.length; i++) {
            this.patternViewResponse._embedded.patternViews[i].id === patternView.id ? this.patternViewResponse._embedded.patternViews.splice(i, 1) : null;
          }
          this.toastService.pop('success', 'Pattern View deleted!');
        },
        (error) => {
          this.toastService.pop('error', 'Pattern View could not be deleted!');
        }
        );
      }
    })
  }
}

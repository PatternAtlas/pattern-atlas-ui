import {Component, OnInit} from '@angular/core';
import {PatternViewService} from '../../core/service/pattern-view.service';
import {PatternView} from '../../core/model/hal/pattern-view.model';
import { MatDialog } from '@angular/material/dialog';
import {CreateEditPatternLanguageComponent} from '../../core/component/create-edit-pattern-language/create-edit-pattern-language.component';
import {DialogPatternLanguageResult} from '../../pattern-language-management/data/DialogPatternLanguageResult.interface';
import {PatternLanguageService} from '../../core/service/pattern-language.service';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PatternViewResponse} from '../../core/model/hal/pattern-view-response.interface';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'pp-solution-language-management',
  templateUrl: './pattern-view-management.component.html',
  styleUrls: ['./pattern-view-management.component.scss']
})
export class PatternViewManagementComponent implements OnInit {
  public patternViewResponse;
  private patternLanguages: PatternLanguage[];

  constructor(private patternViewService: PatternViewService, private dialog: MatDialog, private patternLanguageService: PatternLanguageService,
              private toastService: ToasterService) {
  }

  ngOnInit() {

    this.getData().subscribe();

  }

  private getData(): Observable<PatternViewResponse> {
    return this.patternViewService.getPatternViews().pipe(tap((views) => {
      this.patternViewResponse = views;
    }));


  }

  createView() {
    const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent);
    let view;
    // Save PatternLanguage when user presses save
    (<CreateEditPatternLanguageComponent>dialogRef.componentInstance)
      .saveClicked.pipe(
      tap((result: DialogPatternLanguageResult) => {
        view = <PatternView>result.dialogResult;
      }),
      switchMap(() => this.patternViewService.savePatternView(this.patternViewResponse._links.patternViews.href, view)),
      switchMap(() => this.getData())
    ).subscribe(res => {
      if (res) {
        this.toastService.pop('success', 'Created View');
      }
    });
  }

}

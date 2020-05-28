import { Component, OnInit } from '@angular/core';
import {
  CreateEditComponentDialogType,
  CreateEditPatternLanguageComponent
} from '../../core/component/create-edit-pattern-language/create-edit-pattern-language.component';
import { switchMap, tap } from 'rxjs/operators';
import { DialogPatternLanguageResult } from '../../pattern-language-management/data/DialogPatternLanguageResult.interface';
import { PatternView } from '../../core/model/hal/pattern-view.model';
import { MatDialog } from '@angular/material/dialog';
import { PatternLanguageService } from '../../core/service/pattern-language.service';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { PatternViewResponse } from '../../core/model/hal/pattern-view-response.interface';
import { DesignModelService } from '../../core/service/design-model.service';


@Component({
  selector: 'pp-design-model-management',
  templateUrl: './design-model-management.component.html',
  styleUrls: ['./design-model-management.component.scss']
})
export class DesignModelManagementComponent implements OnInit {

  public designModelResponse;


  constructor(private designModelService: DesignModelService,
              private dialog: MatDialog,
              private patternLanguageService: PatternLanguageService,
              private toastService: ToasterService) {
  }


  ngOnInit() {
    this.getData().subscribe();
  }


  private getData(): Observable<PatternViewResponse> {
    return this.designModelService.getPatternViews().pipe(tap((modelResponse) => {
      this.designModelResponse = modelResponse;
    }));
  }


  addDesignModel() {
    const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent, { data: { componentDialogType: CreateEditComponentDialogType.DESIGN_MODEL } });
    let model;

    // Save design model when user presses save
    (<CreateEditPatternLanguageComponent>dialogRef.componentInstance)
      .saveClicked.pipe(
      tap((result: DialogPatternLanguageResult) => {
        model = <PatternView>result.dialogResult;
      }),
      switchMap(() => this.designModelService.savePatternView(this.designModelResponse._links.patternViews.href, model)),
      switchMap(() => this.getData())
    ).subscribe(res => {
      if (res) {
        this.toastService.pop('success', 'Created Design Model');
      }
    });
  }

  navigateToModel(id) {
    console.error('IMPLEMENT NAVIGATION TO DESIGN MODEL', id); // TODO
  }
}

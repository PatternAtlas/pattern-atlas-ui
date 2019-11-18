import { Component, OnInit } from '@angular/core';
import {PatternViewService} from '../../core/service/pattern-view.service';
import {PatternView} from '../../core/model/hal/pattern-view.model';
import {MatDialog} from '@angular/material';
import {CreateEditPatternLanguageComponent} from '../../core/component/create-edit-pattern-language/create-edit-pattern-language.component';
import {DialogPatternLanguageResult} from '../../pattern-language-management/data/DialogPatternLanguageResult.interface';
import UriEntity from '../../core/model/hal/uri-entity.model';
import {HalLink} from '../../core/model/hal/hal-link.interface';
import {PatternLanguageService} from '../../core/service/pattern-language.service';
import PatternLanguage from '../../core/model/hal/pattern-language.model';

@Component({
  selector: 'pp-solution-language-management',
  templateUrl: './pattern-view-management.component.html',
  styleUrls: ['./pattern-view-management.component.scss']
})
export class PatternViewManagementComponent implements OnInit {
  public patternViewResponse;
  private patternLanguages: PatternLanguage[];

  constructor(private patternViewService: PatternViewService, private dialog: MatDialog, private patternLanguageService: PatternLanguageService) { }

  ngOnInit() {

    this.getData();

  }

  private getData(): void {
    this.patternViewService.getPatternViews().subscribe(views => {
      this.patternViewResponse = views;
    });


  }

  createView() {
    const dialogRef = this.dialog.open(CreateEditPatternLanguageComponent);

    // Save PatternLanguage when user presses save
    (<CreateEditPatternLanguageComponent>dialogRef.componentInstance)
      .saveClicked.subscribe((result: DialogPatternLanguageResult) => {
      const view = <PatternView> result.dialogResult;
      this.patternViewService.savePatternView(this.patternViewResponse._links.patternViews.href, view).subscribe(res => console.log(res));
    });
  }
}

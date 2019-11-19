import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material';
import {AddToViewComponent} from '../add-to-view/add-to-view.component';
import {PatternLanguageService} from '../../core/service/pattern-language.service';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'pp-pattern-view-renderer',
  templateUrl: './pattern-view-renderer.component.html',
  styleUrls: ['./pattern-view-renderer.component.scss']
})
export class PatternViewRendererComponent implements OnInit {
  private patternLanguages: PatternLanguage[];




  constructor(private matDialog: MatDialog, private patternLanguageService: PatternLanguageService) {   }

  ngOnInit() {
    this.patternLanguageService.getPatternLanguages().subscribe(patternlanguages => this.patternLanguages = patternlanguages);
  }

  addToView() {
    const dialogRef = this.matDialog.open(AddToViewComponent, {data: this.patternLanguages});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}

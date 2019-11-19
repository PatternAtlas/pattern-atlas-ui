import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddToViewComponent} from '../add-to-view/add-to-view.component';
import {PatternLanguageService} from '../../core/service/pattern-language.service';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {ToasterService} from 'angular2-toaster';
import {PatternViewService} from '../../core/service/pattern-view.service';
import {PatternLanguageFlatNode} from '../../core/model/pattern-language-flat-node.interface';
import Pattern from '../../core/model/hal/pattern.model';
import {PatternView} from '../../core/model/hal/pattern-view.model';
import {UriConverter} from '../../core/util/uri-converter';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'pp-pattern-view-renderer',
  templateUrl: './pattern-view-renderer.component.html',
  styleUrls: ['./pattern-view-renderer.component.scss']
})
export class PatternViewRendererComponent implements OnInit {
  private patternLanguages: PatternLanguage[];
  private patternViewResponse: PatternView;
  private patternViewUri: string;


  constructor(private matDialog: MatDialog, private patternLanguageService: PatternLanguageService, private patternViewService: PatternViewService,
              private toasterService: ToasterService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.patternViewUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternViewUri'));

    this.getData().subscribe();
  }

  addToView() {
    const dialogRef = this.matDialog.open(AddToViewComponent, {data: this.patternLanguages});
    dialogRef.afterClosed().pipe(
      switchMap((res: PatternLanguageFlatNode[]) => res ?
        this.patternViewService.addPatterns(this.patternViewResponse._links.patterns.href, this.mapDialogResultToPatterns(res))
        : EMPTY),
      switchMap(result => result ? this.getCurrentPatternView() : EMPTY)).subscribe((res) => {
      if (res) {
        this.toasterService.pop('success', 'Data added');
        this.cdr.detectChanges();
      }
    });
  }

  private getPatternLanguages(): Observable<PatternLanguage[]> {
    return this.patternLanguageService.getPatternLanguages().pipe(tap(patternlanguages => this.patternLanguages = patternlanguages));
  }

  private getCurrentPatternView(): Observable<PatternView> {
    return this.patternViewService.getPatternViewByUri(this.patternViewUri).pipe(tap(patternViewResponse => this.patternViewResponse = patternViewResponse));
  }

  private getData(): Observable<any> {
    const $getPatternLanguages = this.getPatternLanguages();
    const $getCurrentPatternView = this.getCurrentPatternView();
    return forkJoin($getPatternLanguages, $getCurrentPatternView);
  }

  private mapDialogResultToPatterns(res: PatternLanguageFlatNode[]): Pattern[] {
    return res.map((patternNode) => <Pattern>{content: null, id: patternNode.id, name: patternNode.name, uri: patternNode.uri, _links: null});
  }
}

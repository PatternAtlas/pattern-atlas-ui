import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
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
import {PatternService} from '../../core/service/pattern.service';
import {Edge} from '../../core/model/hal/edge.model';
import {CreatePatternRelationComponent} from '../../core/component/create-pattern-relation/create-pattern-relation.component';
import {DirectedEdge} from '../../core/model/hal/directed-edge.model';

@Component({
    selector: 'pp-pattern-view-renderer',
    templateUrl: './pattern-view-renderer.component.html',
    styleUrls: ['./pattern-view-renderer.component.scss']
})
export class PatternViewRendererComponent implements OnInit {
    private patternLanguages: PatternLanguage[];
    private patternViewResponse: PatternView;
    private patterns: Pattern[];
    private patternViewUri: string;


    constructor(private matDialog: MatDialog, private patternLanguageService: PatternLanguageService, private patternViewService: PatternViewService, private patternService: PatternService,
                private toasterService: ToasterService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {

        this.patternViewUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternViewUri'));

        this.getData().subscribe(() => {
            },
            (error => this.toasterService.pop('error', 'Could not load data')));
    }

    addPatternToView() {
        const dialogRef = this.matDialog.open(AddToViewComponent, {data: {patternlanguages: this.patternLanguages}});
        dialogRef.afterClosed().pipe(
            switchMap((res: PatternLanguageFlatNode[]) => res ?
                this.patternViewService.addPatterns(this.patternViewResponse._links.patterns.href, this.mapDialogResultToPatterns(res))
                : EMPTY),
            switchMap(result => result ? this.getCurrentPatternViewAndPatterns() : EMPTY)).subscribe((res) => {
            if (res) {
                this.toasterService.pop('success', 'Data added');
                this.cdr.detectChanges();
            }
        });
    }

    private getPatternLanguages(): Observable<PatternLanguage[]> {
        return this.patternLanguageService.getPatternLanguages().pipe(tap(patternlanguages => this.patternLanguages = patternlanguages));
    }

    private getCurrentPatternViewAndPatterns(): Observable<Pattern[]> {
        return this.patternViewService.getPatternViewByUri(this.patternViewUri).pipe(
            tap(patternViewResponse => this.patternViewResponse = patternViewResponse),
            switchMap((patternViewResponse: PatternView) => this.patternService.getPatternsByUrl(patternViewResponse._links.patterns.href)),
            tap(patterns => this.patterns = patterns));
    }

    private getData(): Observable<any> {
        const $getPatternLanguages = this.getPatternLanguages();
        const $getCurrentPatternView = this.getCurrentPatternViewAndPatterns();
        return forkJoin($getPatternLanguages, $getCurrentPatternView);
    }


    private mapDialogResultToPatterns(res: PatternLanguageFlatNode[]): Pattern[] {
        return res.map((patternNode) => <Pattern>{content: null, id: patternNode.id, name: patternNode.name, uri: patternNode.uri, _links: null});
    }


    addLinks(pattern: Pattern) {
        this.getLinksForPattern(pattern).subscribe((links) => {
            const dialogRef = this.matDialog.open(AddToViewComponent, {data: {links: links}});
            this.subscribeToLinkDialogResult(dialogRef);
        });

    }

    private getLinksForPattern(pattern: Pattern): Observable<Edge[]> {
        // should return arrays of directed and undirected links
        return this.patternService.getLinksForPattern(pattern._links.directedEdges.href);
    }

    private subscribeToLinkDialogResult(dialogRef: MatDialogRef<AddToViewComponent, any>) {
        dialogRef.afterClosed().pipe(
            switchMap((res: PatternLanguageFlatNode[]) => res ?
                this.patternViewService.addPatterns(this.patternViewResponse._links.directedEdges.href, this.mapDialogResultToPatterns(res))
                : EMPTY),
            switchMap(result => result ? this.getCurrentPatternViewAndPatterns() : EMPTY)
        ).subscribe((res) => {
            if (res) {
                this.toasterService.pop('success', 'Data added');
                this.cdr.detectChanges();
            }
        });
    }

    createLink() {
        const dialogRef = this.matDialog.open(CreatePatternRelationComponent, {data: {patterns: this.patterns, patternview: this.patternViewResponse}});
        dialogRef.afterClosed().pipe(
            switchMap((dialogResult) => {
                const url = dialogResult instanceof DirectedEdge ? this.patternViewResponse._links.directedEdges.href : this.patternViewResponse._links.undirectedEdges.href;
                return dialogResult ? this.patternViewService.createLink(url, dialogResult) : EMPTY;
            })).subscribe((res) => {
            if (res) {
                this.toasterService.pop('success', 'Relation added');
                this.cdr.detectChanges();
            }
        });
    }
}

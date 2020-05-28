import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddToViewComponent, LinksToOtherPattern, LoazyLoadedFlatNode } from '../add-to-view/add-to-view.component';
import { PatternLanguageService } from '../../core/service/pattern-language.service';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
import { PatternViewService } from '../../core/service/pattern-view.service';
import Pattern from '../../core/model/hal/pattern.model';
import { PatternView } from '../../core/model/hal/pattern-view.model';
import { UriConverter } from '../../core/util/uri-converter';
import { ActivatedRoute } from '@angular/router';
import { PatternService } from '../../core/service/pattern.service';
import { CreatePatternRelationComponent } from '../../core/component/create-pattern-relation/create-pattern-relation.component';
import { DirectedEdgeModel } from '../../core/model/hal/directed-edge.model';
import { HalLink } from '../../core/model/hal/hal-link.interface';
import { AddDirectedEdgeToViewRequest } from '../../core/model/hal/add-directed-edge-to-view-request';
import { AddUndirectedEdgeToViewRequest } from '../../core/model/hal/add-undirected-edge-to-view-request';
import { UndirectedEdgeModel } from '../../core/model/hal/undirected-edge.model';
import PatternLanguageModel from '../../core/model/hal/pattern-language-model.model';
import { Embedded } from '../../core/model/hal/embedded';
import { UndirectedEdesResponse } from '../../core/model/hal/undirected-edes-response.interface';
import { DirectedEdesResponse } from '../../core/model/hal/directed-edes-response.interface';
import { GraphDisplayComponent } from '../../core/component/graph-display/graph-display.component';
import { DeletePatternRelationComponent } from '../../core/component/delete-pattern-relation/delete-pattern-relation.component';
import { PatternRelationDescriptorService } from '../../core/service/pattern-relation-descriptor.service';

@Component({
  selector: 'pp-pattern-view-renderer',
  templateUrl: './pattern-view-renderer.component.html',
  styleUrls: ['./pattern-view-renderer.component.scss']
})
export class PatternViewRendererComponent implements OnInit, AfterViewInit {

  patternViewResponse: PatternView;
  patterns: Array<Pattern> = [];
  displayText: string;
  isLoading = true;
  graphVisible = false;
  patternLinks: Array<DirectedEdgeModel | UndirectedEdgeModel> = [];
  @ViewChild(GraphDisplayComponent, { static: false }) graphDisplayComponent: GraphDisplayComponent;
  private patternLanguages: Array<PatternLanguageModel>;
  private patternViewUri: string;
  private directedPatternRelations: DirectedEdgeModel[];
  private undirectedPatternRelations: UndirectedEdgeModel[];

  constructor(private matDialog: MatDialog, private patternLanguageService: PatternLanguageService, private patternViewService: PatternViewService,
              private patternService: PatternService, private toasterService: ToasterService, private cdr: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute, private patternRLDescriptorService: PatternRelationDescriptorService) {
  }

  ngOnInit() {


  }

  ngAfterViewInit(): void {
    this.patternViewUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternViewUri'));

    this.getData().pipe(
      switchMap(() => {
        return this.getLinks();
      })
    ).subscribe(
      () => {
        this.isLoading = false;
        this.displayText = this.patternViewResponse.name;
      },
      (error => this.toasterService.pop('error', 'Could not load data')));
  }

  addPatternToView() {
    const dialogRef = this.matDialog.open(AddToViewComponent, {
      data: { patternlanguages: this.patternLanguages, title: 'Add patterns to View' }
    });
    dialogRef.afterClosed().pipe(
      switchMap((res: LoazyLoadedFlatNode[]) => res ?
        this.patternViewService.addPatterns(this.patternViewResponse._links.patterns.href, this.mapDialogResultToPatterns(res))
        : EMPTY),
      switchMap(result => result ? this.getCurrentPatternViewAndPatterns() : EMPTY)).subscribe((res) => {
      if (res) {
        this.toasterService.pop('success', 'Data added');
        this.cdr.detectChanges();
      }
    });
  }

  addLinks(pattern: Pattern) {
    const dialogRef = this.matDialog.open(AddToViewComponent,
      { data: { links: this.mapPatternLinksToTreeNode(pattern), title: 'Add linked Patterns', patternId: pattern.id } });
    this.subscribeToLinkDialogResult(dialogRef);
  }

  addLink() {
    const dialogRef = this.matDialog.open(CreatePatternRelationComponent, { data: { patterns: this.patterns, patternview: this.patternViewResponse } });
    dialogRef.afterClosed().pipe(
      switchMap((edge) => {
        return edge ? this.createLink(edge) : EMPTY;
      })).subscribe((res) => {
      if (res) {
        this.toasterService.pop('success', 'Relation added');
      }
    });
  }

  detectChanges() {
    this.cdr.detectChanges();
    console.log('detected');
  }

  getLinkCount(directedEdges: HalLink[] | HalLink) {
    if (!directedEdges) {
      return 0;
    }
    return Array.isArray(directedEdges) ? directedEdges.length : 1;
  }

  showUndirectedEdges(undirectedEdges: HalLink[]) {
    if (undirectedEdges) {
      const dialogRef = this.matDialog.open(DeletePatternRelationComponent, {
        data: { edges: undirectedEdges, type: 'undirected' },
        width: '600px',
        panelClass: 'delete-relation-dialog'
      });
      dialogRef.afterClosed().subscribe(() => {
        // reload patterns since ng for pattern loop doesnt get updated else
        this.getData().subscribe(
          () => {
            this.getLinks();
          }
        );
      });
    }
  }

  showIngoingEdges(ingoingEdges: HalLink[]) {
    if (ingoingEdges) {
      const dialogRef = this.matDialog.open(DeletePatternRelationComponent, {
        data: { edges: ingoingEdges, type: 'ingoing' },
        width: '600px',
        panelClass: 'delete-relation-dialog'
      });
      dialogRef.afterClosed().subscribe(() => {
        // reload patterns since ng for pattern loop doesnt get updated else
        this.getData().subscribe(
          () => {
            this.getLinks();
          }
        );
      });
    }
  }

  showOutgoingEdges(outgoingEdges: HalLink[]) {
    if (outgoingEdges) {
      const dialogRef = this.matDialog.open(DeletePatternRelationComponent, {
        data: { edges: outgoingEdges, type: 'outgoing' },
        width: '600px',
        panelClass: 'delete-relation-dialog'
      });
      dialogRef.afterClosed().subscribe(() => {
        // reload patterns since ng for pattern loop doesnt get updated else
        this.getData().subscribe(
          () => {
            this.getLinks();
          }
        );
      });
    }
  }

  changeRenderer(isGraphVisible: any) {
    this.graphVisible = isGraphVisible;
  }

  addedEdgeInGraphView(edge: any) {
    if (edge) {
      this.createLink(edge).subscribe(() => {
        this.toasterService.pop('success', 'Link added');
        this.cdr.detectChanges();
      });
    }
  }

  reloadGraph() {
    this.graphDisplayComponent.reformatGraph();
  }

  private getDirectedEdges(): Observable<Embedded<DirectedEdesResponse>> {
    if (!this.patternViewResponse) {
      return EMPTY;
    }
    return this.patternViewService.getDirectedEdges(this.patternViewResponse).pipe(
      tap((edges) => {
        this.directedPatternRelations = edges._embedded ? edges._embedded.directedEdgeModels : [];
      }));
  }

  private getUndirectedEdges(): Observable<Embedded<UndirectedEdesResponse>> {
    if (!this.patternViewResponse) {
      return EMPTY;
    }
    return this.patternViewService.getUndirectedEdges(this.patternViewResponse).pipe(
      tap((edges) => {
        this.undirectedPatternRelations = edges._embedded ? edges._embedded.undirectedEdgeModels : [];
      }));
  }

  private createLink(edge): Observable<any> {
    const url = edge instanceof DirectedEdgeModel ? this.patternViewResponse._links.directedEdges.href :
      this.patternViewResponse._links.undirectedEdges.href;
    if (!edge || !url) {
      return EMPTY;
    }
    return this.patternViewService.createLink(url, edge instanceof DirectedEdgeModel ?
      new AddDirectedEdgeToViewRequest(<DirectedEdgeModel>edge) :
      new AddUndirectedEdgeToViewRequest(<UndirectedEdgeModel>edge)
    ).pipe(
      tap((res) => res ? this.getEdgeByUrl(edge, res) : EMPTY));
  }

  private getEdgeByUrl(edge: DirectedEdgeModel | UndirectedEdgeModel, res: any): void {
    const getURL = res.url + '/' + res.body.id;
    this.patternRLDescriptorService.getEdgeByUrl(getURL, edge)
      .subscribe(
        edgeResult => {
          edge instanceof DirectedEdgeModel ? this.addDirectedEdgeToPattern(edgeResult as DirectedEdgeModel)
            : this.addUndirectedEdgeToPattern(edgeResult as UndirectedEdgeModel);
          this.patternLinks.push(edgeResult);
        }
      );
  }

  private addUndirectedEdgeToPattern(edge: UndirectedEdgeModel): void {
    const pattern1 = this.patterns.find(x => x.id === edge.pattern1Id);
    if (!pattern1._links.undirectedEdges) {
      pattern1._links.undirectedEdges = edge._links.self;
    } else if (!Array.isArray(pattern1._links.undirectedEdges)) {
      pattern1._links.undirectedEdges = [pattern1._links.undirectedEdges, edge._links.self];
    } else {
      pattern1._links.undirectedEdges.push(edge._links.self);
    }

    const pattern2 = this.patterns.find(x => x.id === edge.pattern2Id);
    if (!pattern2._links.undirectedEdges) {
      pattern2._links.undirectedEdges = edge._links.self;
      return;
    } else if (!Array.isArray(pattern2._links.undirectedEdges)) {
      pattern2._links.undirectedEdges = <HalLink[]>[pattern2._links.undirectedEdges, edge._links.self];
    } else {
      pattern2._links.undirectedEdges.push(edge._links.self);
    }
  }

  private addDirectedEdgeToPattern(edge: DirectedEdgeModel): void {
    const srcPattern = this.patterns.find(x => x.id === edge.sourcePatternId);
    if (!srcPattern._links.outgoingDirectedEdges) {
      srcPattern._links.outgoingDirectedEdges = edge._links.self;
    } else if (!Array.isArray(srcPattern._links.outgoingDirectedEdges)) {
      srcPattern._links.outgoingDirectedEdges = [srcPattern._links.outgoingDirectedEdges, edge._links.self];
    } else {
      srcPattern._links.outgoingDirectedEdges.push(edge._links.self);
    }

    const targetPattern = this.patterns.find(x => x.id === edge.targetPatternId);
    if (!targetPattern._links.ingoingDirectedEdges) {
      targetPattern._links.ingoingDirectedEdges = edge._links.self;
      return;
    } else if (!Array.isArray(targetPattern._links.ingoingDirectedEdges)) {
      targetPattern._links.ingoingDirectedEdges = [targetPattern._links.ingoingDirectedEdges, edge._links.self];
    } else {
      targetPattern._links.ingoingDirectedEdges.push(edge._links.self);
    }
  }

  private getPatternLanguages(): Observable<Array<PatternLanguageModel>> {
    return this.patternLanguageService.getPatternLanguages()
      .pipe(
        tap(patternlanguages => this.patternLanguages = patternlanguages)
      );
  }

  private getCurrentPatternViewAndPatterns(): Observable<Pattern[]> {
    return this.patternViewService.getPatternViewByUri(this.patternViewUri).pipe(
      tap(patternViewResponse => {
        this.patternViewResponse = patternViewResponse;
      }),
      switchMap((patternViewResponse: PatternView) => this.patternService.getPatternsByUrl(patternViewResponse._links.patterns.href)),
      tap(patterns => {
        this.patterns = patterns;
      }));
  }

  private getData(): Observable<any> {
    const $getPatternLanguages = this.getPatternLanguages();
    const $getCurrentPatternView = this.getCurrentPatternViewAndPatterns();
    return forkJoin([$getPatternLanguages, $getCurrentPatternView]); // , $getDirectedEdges]);
  }

  private getLinks(): Observable<any> {
    const $getUndirectedEdges = this.getUndirectedEdges();
    const $getDirectedEdges = this.getDirectedEdges();
    return forkJoin([$getUndirectedEdges, $getDirectedEdges]).pipe(tap(() => {
      this.patternLinks = [];
      this.patternLinks.push(...this.directedPatternRelations);
      this.patternLinks.push(...this.undirectedPatternRelations);
    }));
  }

  private mapDialogResultToPatterns(res: LoazyLoadedFlatNode[]): Pattern[] {
    if (!res) {
      return [];
    }
    const patternsToAdd = res.map((patternNode) => <Pattern>{
      content: null,
      id: patternNode.item.id,
      name: patternNode.item.name,
      _links: null
    });
    const patternIdsOfView = this.patterns.map(it => it.id);
    // only add patterns that are not already in the view:
    return patternsToAdd.filter(pattern => !patternIdsOfView.includes(pattern.id));
  }

  private subscribeToLinkDialogResult(dialogRef: MatDialogRef<AddToViewComponent, any>) {
    let nodesToAdd;
    dialogRef.afterClosed().pipe(
      tap(res => {
        nodesToAdd = res;
        console.log(res);
      }),
      switchMap((res) => {
        return forkJoin([this.patternViewService.addPatterns(this.patternViewResponse._links.patterns.href, this.mapDialogResultToPatterns(res)),
          this.patternViewService.addLinks(this.patternViewResponse, res && Array.isArray(res) ? res.map(it => it.item) : [])]);
      }),
      switchMap(result => result ? this.getCurrentPatternViewAndPatterns() : EMPTY)
    ).subscribe((res) => {
      if (res) {
        this.toasterService.pop('success', 'Data added');
        this.cdr.detectChanges();
      }
    });
  }

  private mapPatternLinksToTreeNode(pattern: Pattern): LinksToOtherPattern[] {
    const types: LinksToOtherPattern[] = [];
    const possibleEdgeTypes = [
      { link: pattern._links.ingoingDirectedEdgesFromPatternLanguage, type: 'directed', displayName: 'Ingoing directed edges' },
      { link: pattern._links.outgoingDirectedEdgesFromPatternLanguage, type: 'directed', displayName: 'Outgoing directed edges' },
      { link: pattern._links.undirectedEdgesFromPatternLanguage, type: 'undirected', displayName: 'Undirected edges' }
    ];
    possibleEdgeTypes.forEach((edgeType: { link: HalLink | HalLink[], displayName: string, type: string }, index) => {
      if (edgeType.link) {
        types.push({
          name: edgeType.displayName, links: Array.isArray(edgeType.link) ? edgeType.link : [edgeType.link], id: index.toString(),
          type: edgeType.type
        });
      }
    });
    return types;
  }
}

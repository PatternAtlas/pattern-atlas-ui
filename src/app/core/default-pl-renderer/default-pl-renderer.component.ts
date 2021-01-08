import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material/dialog';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import {D3Service} from '../../graph/service/d3.service';
import {GraphDisplayComponent} from '../component/graph-display/graph-display.component';
import {EMPTY, forkJoin, Observable, Subscription} from 'rxjs';
import {Embedded} from '../model/hal/embedded';
import {DirectedEdesResponse} from '../model/hal/directed-edes-response.interface';
import {switchMap, tap} from 'rxjs/operators';
import {UndirectedEdesResponse} from '../model/hal/undirected-edes-response.interface';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';
import {CreatePatternRelationComponent} from '../component/create-pattern-relation/create-pattern-relation.component';
import {PatternRelationDescriptorService} from '../service/pattern-relation-descriptor.service';
import {ToasterService} from 'angular2-toaster';
import {PatternService} from '../service/pattern.service';
import Pattern from '../model/hal/pattern.model';
import {FormControl} from '@angular/forms';
import {globals} from '../../globals';
import {PatternRelationDescriptorDirection} from "../model/pattern-relation-descriptor-direction.enum";


@Component({
  selector: 'pp-default-pl-renderer',
  templateUrl: './default-pl-renderer.component.html',
  styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit, OnDestroy {
  patterns: Array<Pattern> = [];
  patternsForCardsView: Array<Pattern> = [];
  patternLanguage: PatternLanguage;
  patternLanguageId: string;
  @ViewChild('graphWrapper') graph: ElementRef;
  @ViewChild('cardsView') cardsView: ElementRef;
  @ViewChild('searchField') searchField: ElementRef;
  @ViewChild(GraphDisplayComponent, {static: false}) graphDisplayComponent: GraphDisplayComponent;
  @ViewChild('displayPLContainer', {read: ViewContainerRef}) loadRenderer;
  graphVisible = false;
  isLoadingPatternData = true;
  isLoadingLinkData = true;
  toggleBeforeDataLoaded = false;
  filter: FormControl;
  private directedPatternRelations: Array<DirectedEdgeModel> = [];
  private undirectedPatternRelations: Array<UndirectedEdgeModel> = [];
  private patternLinks: Array<UndirectedEdgeModel | DirectedEdgeModel>;
  subscriptions = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private patternLanguageService: PatternLanguageService,
              private patternService: PatternService,
              private patternRelationDescriptorService: PatternRelationDescriptorService,
              private d3Service: D3Service,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.loadData();
    this.filter = new FormControl('');
    const filterSubscription = this.filter.valueChanges.subscribe((filterText: string) => {
      if (this.graphVisible || !this.patterns || this.patterns.length === 0) {
        return;
      }
      this.patternsForCardsView = this.patterns.filter(pattern => pattern.name.toLowerCase().includes(filterText.toLowerCase()));
    });
    this.subscriptions.add(filterSubscription);
  }

  detectChanges() {
    this.cdr.detectChanges();
  }

  getPatternLinks(): Observable<any> {
    const $getDirectedEdges = this.getDirectedEdges();
    const $getUndirectedEdges = this.getUndirectedEdges();
    return forkJoin([$getDirectedEdges, $getUndirectedEdges]).pipe(
      tap((edges) => {
        this.patternLinks = [];
        this.patternLinks.push(...this.directedPatternRelations);
        this.patternLinks.push(...this.undirectedPatternRelations);
      }));
  }

  public addPattern(): void {
    this.router.navigate(['create-patterns'], {relativeTo: this.activatedRoute});
  }

  private openCreateDialog() {
    if (this.graphDisplayComponent === undefined) {
      return this.dialog.open(CreatePatternRelationComponent, {
        data: {
          patterns: this.patterns,
          patternlanguage: this.patternLanguage
        }
      });

    } else {
      return this.dialog.open(CreatePatternRelationComponent, {
        data: {
          firstPattern: this.graphDisplayComponent.selectedPattern,
          patterns: this.patterns,
          patternlanguage: this.patternLanguage
        }
      });
    }
  }

  public addLink() {
    this.openCreateDialog().afterClosed().subscribe((edge) => {
      if (edge !== undefined) {
        if (this.graphDisplayComponent !== undefined) {
          this.linkAddedInGraphEditor(edge);
        } else {
          const insertionSubscription = this.insertEdge(edge).subscribe()
          this.subscriptions.add(insertionSubscription);
        }

      }
    });
  }

  insertEdge(edge): Observable<any> {
    return this.patternRelationDescriptorService.addRelationToPL(this.patternLanguage, edge).pipe(
      tap((res) => res ? this.getPatternByLink(edge, res) : EMPTY));
  }

  getPatternByLink(edge: DirectedEdgeModel | UndirectedEdgeModel, res: any) {
    const url = res.url + '/' + res.body.id;
    const relationSubscription = this.patternRelationDescriptorService.getEdgeByUrl(url, edge)
      .subscribe(
        edgeResult => {
          this.patternLinks.push(edgeResult);
        }
      );
    this.subscriptions.add(relationSubscription);
  }

  /**
   * Gets called when Graphview child emits that an edge got added
   * The Edge is missing the Id that is getting assigned from the backend so it got deleted before calling this method
   * --> Edge needs to be saved in the backend & added into the graph again.
   *
   * @param edge
   */
  linkAddedInGraphEditor(edge) {

    const insertionSubscription = this.insertEdge(edge).subscribe(res => {
      let edgeAdd;
      if (edge.pattern1Id != null) {
        edgeAdd = {
          source: edge.pattern1Id,
          target: edge.pattern2Id,
          markerEnd: {template: 'arrow', scale: 0.5, relativeRotation: 0},
          markerStart: {template: 'arrow', scale: 0.5, relativeRotation: 0},
          id: res.body.id
        }
      } else {
        edgeAdd = {
          source: edge.sourcePatternId,
          target: edge.targetPatternId,
          markerEnd: {template: 'arrow', scale: 0.5, relativeRotation: 0},
          id: res.body.id
        };
      }
      this.graphDisplayComponent.graphNativeElement.addEdge(edgeAdd, true);
      this.toasterService.pop('success', 'Added Relation' + res.body.id);
      this.graphDisplayComponent.updateSideMenu();
      this.detectChanges();
    });
    this.subscriptions.add(insertionSubscription);
  }

  linkRemovedInGraphEditor(edge) {
    this.patternRelationDescriptorService.getAnyEdgeByUrl((edge.markerStart === undefined && edge.pattern1Id === undefined ?
      this.patternLanguage._links.directedEdges.href : this.patternLanguage._links.undirectedEdges.href) + '/' + edge.id).subscribe(res => {
      const patterns = Array.isArray(this.patterns) ? this.patterns : this.graphDisplayComponent.patternContainer.patterns;
      let pattern1, pattern2, direction;

      if (res.pattern1Id !== undefined) {
        pattern1 = res.pattern1Id;
        pattern2 = res.pattern2Id;
        direction = PatternRelationDescriptorDirection.UnDirected
      } else {
        pattern1 = res.sourcePatternId;
        pattern2 = res.targetPatternId;
        direction = PatternRelationDescriptorDirection.DirectedRight;
      }
      const dialogRef = this.dialog.open(CreatePatternRelationComponent, {
        data: {
          firstPattern: patterns.find((pat) => pattern1 === pat.id),
          secondPattern: patterns.find((pat) => pattern2 === pat.id),
          preselectedEdgeDirection: direction,
          patterns,
          patternLanguage: this.patternLanguage,
          patternContainer: this.graphDisplayComponent.patternContainer,
          relationTypes: this.graphDisplayComponent.getGraphDataService().getEdgeTypes(),
          description: res.description,
          relationType: res.type,
          isDelete: true,
        }
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult !== undefined && dialogResult.deleteLink === undefined) { //edit edge
          this.deleteEdge(this.graphDisplayComponent.currentEdge);
          this.linkAddedInGraphEditor(dialogResult);
        } else if (dialogResult !== undefined && dialogResult.deleteLink === true) { // delete Edge
          this.deleteEdge(edge);
        } else { //abort
        }
      });
    })
  }


  deleteEdge(edge) {
    this.graphDisplayComponent.graphNativeElement.removeEdge(edge, true);
    this.graphDisplayComponent.triggerRerendering();
    this.patternRelationDescriptorService.removeRelationFromPL(this.patternLanguage, edge);
    this.removeEdgeFromPatternLinkList(edge)
  }

  removeEdgeFromPatternLinkList(edge) {
    for (let i = 0; i < this.patternLinks.length; i++) {
      this.patternLinks[i].id === edge.id ? this.patternLinks.splice(i, 1) : null;
    }
  }

  reloadGraph() {
    this.graphDisplayComponent.reformatGraph();
  }

  setGraphVisible(newValueGraphVisible: boolean) {
    if (newValueGraphVisible) { // reset the search field so all patterns are shown in the graph
      this.filter.setValue('');
    }
    this.graphVisible = newValueGraphVisible;
    // if user toggled to early, we will retrigger
    this.toggleBeforeDataLoaded = this.isLoadingLinkData && this.isLoadingPatternData;
  }

  private loadData(): void {
    this.isLoadingPatternData = true;
    this.patternLanguageId = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get(globals.pathConstants.patternLanguageId));
    if (!this.patternLanguageId) {
      return;
    }

    let loadDataObservable;
    // check if patternlanguage is specified via UUIID or URI and load it accordingly
    if (UriConverter.isUUID(this.patternLanguageId)) {
      loadDataObservable = this.patternLanguageService.getPatternLanguageByID(this.patternLanguageId)
        .pipe(
          tap(patternlanguage => this.patternLanguage = patternlanguage),
          switchMap(() => this.loadPatternsAndLinks())
        );
    } else {
      loadDataObservable = this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageId)
        .pipe(
          tap(patternlanguage => this.patternLanguage = patternlanguage),
          switchMap(() => this.loadPatternsAndLinks())
        );
    }
    const loadDataSubscrition = loadDataObservable.subscribe(() => {
      this.isLoadingLinkData = false;
      this.detectChanges();
    });
    this.subscriptions.add(loadDataSubscrition);

  }

  loadPatternsAndLinks(): Observable<any> {
    return forkJoin([this.loadPatterns(), this.getPatternLinks()]);
  }

  private getDirectedEdges(): Observable<Embedded<DirectedEdesResponse>> {
    if (!this.patternLanguage) {
      return EMPTY;
    }
    return this.patternLanguageService.getDirectedEdges(this.patternLanguage).pipe(
      tap((edges) => {
        this.directedPatternRelations = edges._embedded ? edges._embedded.directedEdgeModels : [];
      }));
  }

  private getUndirectedEdges(): Observable<Embedded<UndirectedEdesResponse>> {
    if (!this.patternLanguage) {
      return EMPTY;
    }
    return this.patternLanguageService.getUndirectedEdges(this.patternLanguage).pipe(
      tap((edges) => {
        this.undirectedPatternRelations = edges._embedded ? edges._embedded.undirectedEdgeModels : [];
      }));
  }

  private loadPatterns(): Observable<any[]> {
    return this.patternService.getPatternsByUrl(this.patternLanguage._links.patterns.href).pipe(
      tap(patterns => {
        this.patterns = patterns;
        this.patternsForCardsView = this.patterns;
        this.isLoadingPatternData = false;
        this.detectChanges();
      }));
  }

  ngOnDestroy(): void {
    this.cdr.detach()
    this.subscriptions.unsubscribe();
  }
}



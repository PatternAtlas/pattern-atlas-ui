import {
  ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UriConverter } from '../util/uri-converter';
import { MatDialog } from '@angular/material/dialog';
import { PatternLanguageService } from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import { D3Service } from '../../graph/service/d3.service';
import { GraphDisplayComponent } from '../component/graph-display/graph-display.component';
import { EMPTY, forkJoin, Observable, Subscription } from 'rxjs';
import { Embedded } from '../model/hal/embedded';
import { DirectedEdesResponse } from '../model/hal/directed-edes-response.interface';
import { switchMap, tap } from 'rxjs/operators';
import { UndirectedEdgesResponse } from '../model/hal/undirected-edes-response.interface';
import { DirectedEdgeModel } from '../model/hal/directed-edge.model';
import { UndirectedEdgeModel } from '../model/hal/undirected-edge.model';
import { CreatePatternRelationComponent, GroupedPatterns } from '../component/create-pattern-relation/create-pattern-relation.component';
import { PatternRelationDescriptorService } from '../service/pattern-relation-descriptor.service';
import { ToasterService } from 'angular2-toaster';
import { PatternService } from '../service/pattern.service';
import Pattern from '../model/hal/pattern.model';
import { CandidateManagementService } from '../candidate-management/_services/candidate-management.service';
import { Candidate } from '../candidate-management/_models/candidate.model';
import { FormControl } from '@angular/forms';
import { globals } from '../../globals';
import { PatternRelationDescriptorDirection } from '../model/pattern-relation-descriptor-direction.enum';
import { UiFeatures } from '../directives/pattern-atlas-ui-repository-configuration.service';

@Component({
  selector: 'pp-default-pl-renderer',
  templateUrl: './default-pl-renderer.component.html',
  styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit, OnDestroy {
  patterns: Array<Pattern> = [];
  patternsForCardsView: Array<Pattern> = [];
  patternLanguage: PatternLanguage;
  groupedPatterns: GroupedPatterns[];
  patternLanguageId: string;
  candidates: Array<Candidate> = [];
  readonly UiFeatures = UiFeatures;
  @ViewChild('graphWrapper') graph: ElementRef;
  @ViewChild('cardsView') cardsView: ElementRef;
  @ViewChild('searchField') searchField: ElementRef;
  @ViewChild(GraphDisplayComponent, { static: false }) graphDisplayComponent: GraphDisplayComponent;
  @ViewChild('displayPLContainer', { read: ViewContainerRef }) loadRenderer;
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
              private candidateService: CandidateManagementService,
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
    this.getGroupedPatterns();
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
    this.router.navigate(['create-patterns'], { relativeTo: this.activatedRoute });
  }

  /**
   * Opens a different Dialog when clicking the "Create Relation button"
   * It differentiates between the user having or not having the graph component opened
   * If the graph component is open when clicking "create relation" a selected pattern gets automatically filled in
   *    as the first Pattern of the relation in the create dialog
   */
  private openCreateDialog() {
    if (this.graphDisplayComponent === undefined) {
      return this.dialog.open(CreatePatternRelationComponent, {
        data: {
          groupedPatterns: this.groupedPatterns,
          patternLanguage: this.patternLanguage
        }
      });

    } else {
      return this.dialog.open(CreatePatternRelationComponent, {
        data: {
          firstPattern: this.graphDisplayComponent.selectedPattern,
          groupedPatterns: this.groupedPatterns,
          patternLanguage: this.patternLanguage
        }
      });
    }
  }

  private getGroupedPatterns() {
    this.groupedPatterns = [];
    this.patternLanguageService.getPatternLanguages().subscribe(languages => {
      languages.forEach(language => {
        this.patternService.getPatternsById(language.id).subscribe(patterns => {
          this.groupedPatterns.push({id: language.id, name: language.name, patterns: patterns});
        })
      })
    })
  }

  /**
   * Method getting called when pressing the Add-Relation button
   * If executed while having the graphview opened the button gets treated equally to
   *    an add-relation opertion inside of the graph
   * If executed from the patternlanguage view the graph does not need to be updated and the edge just
   *    gets added to the database and the PatterLinklist
   */
  public addLink() {
    this.openCreateDialog().afterClosed().subscribe((edge) => {
      if (edge !== undefined) {
        if (this.graphDisplayComponent !== undefined) {
          this.handleLinkAddedInGraphEditor(edge);
        } else {
          const insertionSubscription = this.insertEdge(edge).subscribe();
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
   * The graphview created edge is missing the Id that is getting assigned from the backend
   *  --->  it got deleted before calling this method
   *  ---> Edge needs to be saved in the backend & added into the graph again.
   *
   * @param edge
   */
  handleLinkAddedInGraphEditor(edge) {

    const insertionSubscription = this.insertEdge(edge).subscribe(res => {
      let edgeAdd;
      if (edge.pattern1Id != null) {
        edgeAdd = {     //undirected Edge
          source: edge.pattern1Id,
          target: edge.pattern2Id,
          markerEnd: { template: 'arrow', scale: 0.5, relativeRotation: 0 },
          markerStart: { template: 'arrow', scale: 0.5, relativeRotation: 0 },
          id: res.body.id
        }
      } else {
        edgeAdd = {   //directed Edge
          source: edge.sourcePatternId,
          target: edge.targetPatternId,
          markerEnd: { template: 'arrow', scale: 0.5, relativeRotation: 0 },
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

  /**
   * Gets called when Graphview child emits that an edge got removed.
   * This is the case for Delete AND Update operations for edges
   * --->
   *
   * @param edge
   */
  handleLinkRemovedInGraphEditor(edge) {
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
          isDelete: true,  //indicates that the dialog is called from the linked removedRemoved method --> not create,
          // but a delete / edit operation
        }
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult !== undefined && dialogResult.deleteLink === undefined) { //edit edge
          this.deleteEdge(this.graphDisplayComponent.currentEdge);
          this.handleLinkAddedInGraphEditor(dialogResult);
        } else if (dialogResult !== undefined && dialogResult.deleteLink === true) { // delete Edge
          this.deleteEdge(edge);
        }
      });
    })
  }

  /**
   * Delete edge in graph, delete it in database and remove it from the Linklist getting used for graphrendering
   * @param edge
   */
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
    // check if patternLanguage is specified via UUID or URI and load it accordingly
    if (UriConverter.isUUID(this.patternLanguageId)) {
      loadDataObservable = this.patternLanguageService.getPatternLanguageByID(this.patternLanguageId)
        .pipe(
          tap(patternLanguage => {
            this.patternLanguage = patternLanguage
            this.patternLanguage.id = this.patternLanguageId
          }),
          switchMap(() => this.loadPatternsCandidatesAndLinks())
        );
    } else {
      loadDataObservable = this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageId)
        .pipe(
          tap(patternLanguage => {
            this.patternLanguage = patternLanguage
            this.patternLanguage.id = this.patternLanguageId
          }),
          switchMap(() => this.loadPatternsCandidatesAndLinks())
        );
    }
    const loadDataSubscrition = loadDataObservable.subscribe(() => {
      this.isLoadingLinkData = false;
      this.detectChanges();
    });
    this.subscriptions.add(loadDataSubscrition);

  }

  loadPatternsCandidatesAndLinks(): Observable<any> {
    return forkJoin([this.loadPatterns(), this.loadCandidates(), this.getPatternLinks()]);
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

  private getUndirectedEdges(): Observable<Embedded<UndirectedEdgesResponse>> {
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

  private loadCandidates(): Observable<any[]> {
    return this.candidateService.getAllCandidates(this.patternLanguageId).pipe(
      tap(candidates => {
        this.candidates = candidates;
        this.detectChanges();
      }));
  }

  ngOnDestroy(): void {
    this.cdr.detach();
    this.subscriptions.unsubscribe();
  }
}



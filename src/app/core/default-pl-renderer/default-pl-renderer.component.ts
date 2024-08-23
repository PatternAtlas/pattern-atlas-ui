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
import { CreatePatternRelationComponent } from '../component/create-pattern-relation/create-pattern-relation.component';
import { PatternRelationDescriptorService } from '../service/pattern-relation-descriptor.service';
import { ToasterService } from 'angular2-toaster';
import { PatternService } from '../service/pattern.service';
import { AlgoStateService } from '../service/algo-state.service'
import Pattern from '../model/hal/pattern.model';
import { CandidateManagementService } from '../candidate-management';
import { Candidate } from '../candidate-management';
import { FormControl } from '@angular/forms';
import { globals } from '../../globals';
import { PatternRelationDescriptorDirection } from '../model/pattern-relation-descriptor-direction.enum';
import { UiFeatures } from '../directives/pattern-atlas-ui-repository-configuration.service';

import { saveAs } from "file-saver";
import * as jsonData from '../../../assets/AlgoData.json';
import { TextmatcherComponent } from '../component/textmatcher/textmatcher.component';
import { DeleteAlgorithmComponent } from '../component/delete-algorithm/delete-algorithm.component';

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
  patternLinks: Array<UndirectedEdgeModel | DirectedEdgeModel>;
  subscriptions = new Subscription();
  
  AlgoData = [];                   // current selected algorithm data
  selectedAlgorithm = 'None';
  AlgorithmDataIds = [];           // complete algorithm data
  showAlgoPopups = false;
  addAlgorithmDialog = false;
  jdata: any = jsonData;
  previousTextmatcherData = [];
  isQuantumComputingPatternLanguage = false;

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
			  private algoStateService: AlgoStateService,
              private toasterService: ToasterService) {
  }
  
  openTextmatcherDialog(){
	  const dialogRef = this.dialog.open(TextmatcherComponent, {
		    width: "1000px",
			data: {
				data: this.AlgorithmDataIds,
				prev: this.previousTextmatcherData,
		    },
	  });
	  
	  dialogRef.afterClosed().subscribe(result => {
		  if((result != null) && (result != undefined)) {	
		      this.selectedAlgorithm = result.algoname;
			  this.addAlgoPatterns();
			  this.previousTextmatcherData = [];
			  this.previousTextmatcherData.push(result.prev);
			  //this.showAlgoPatterns(); uncomment if popup should show immediately
          }
      });		  
  }
  
  //only deleting one at the time possible
  openDeleteAlgorithmDialog(){
	  const dialogRef = this.dialog.open(DeleteAlgorithmComponent, {
		    width: "1000px",
			data: {
				algorithms: this.AlgorithmDataIds,
		    },
	  });
	  
	  dialogRef.afterClosed().subscribe(result => {
		  if((result != null) && (result != undefined) && (result.length > 0)) {
			  result.forEach(algorithm => {
				  this.AlgorithmDataIds = this.AlgorithmDataIds.filter(algids => algids.name !== algorithm.name);
			  });
			  //persistent in db speichern nach löschen
			  this.algoStateService.saveAlgorithmData2(this.AlgorithmDataIds, this.patternLanguageId);
          }
      });	
	  
  }
  
  exportToJson() {
	  let exportData = this.AlgorithmDataIds;
	  return saveAs(new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }), 'AlgoData.json');
	  
  }

  showAlgoPatterns() {
	  //console.log("inside showalgopatterns im default pl renderer");
	  if((this.selectedAlgorithm == 'None')||(this.selectedAlgorithm == undefined)){
		  this.showAlgoPopups = false;
	  }else{
		  this.showAlgoPopups = true;
	  }
  }
  
  addAlgoPatterns() {
	  //console.log("inside addalgopatterns im default pl renderer");
	  this.AlgoData = []
	  if ((this.selectedAlgorithm == 'None')||(this.selectedAlgorithm == undefined)) {	  
		  this.AlgoData = [].concat(this.AlgoData);
	  } else {
		  //console.log("currentAlgorithm gets data");
		  const currentAlgorithm = this.AlgorithmDataIds.find(({name}) => name === this.selectedAlgorithm);
		  this.AlgoData.push(currentAlgorithm);
	  }
  }
  
  resetSelectedAlgorithm(){
	  // auf undefined setzen falls wieder probleme damit auftauchen
	  //this.selectedAlgorithm = 'None';
	  this.selectedAlgorithm = undefined;
  }
  
  resetButtonValue(value){
	  if(value){
		  this.algoStateService.saveAlgoState(this.selectedAlgorithm);
	  }else{
		  this.algoStateService.clearAlgoState();
	  }
	  this.showAlgoPopups = false;
  }
  
  openAddPatternDialog(){
	  this.addAlgorithmDialog = true;
  }
  
  addNewAlgorithm(newalgorithm){
	  if(newalgorithm != null){
		  this.AlgorithmDataIds.push(newalgorithm);
		  //persistent in db speichern nach hinzufügen
		  this.algoStateService.saveAlgorithmData2(this.AlgorithmDataIds, this.patternLanguageId);
	  }
	  this.addAlgorithmDialog = false;
  }
  
  initializeAlgorithmPatternIds3(){
	  this.algoStateService.getAlgorithmData2(this.patternLanguageId).subscribe(data => {
		  this.AlgorithmDataIds = data.algodata;
		  let state = this.algoStateService.getAlgoState();
		  if((state != null) && (state != undefined) && (state != "")){
			this.selectedAlgorithm = state;
			this.graphVisible = true;
			this.addAlgoPatterns();
			this.showAlgoPatterns();
		  }
	  });
  }
  
  //old datastorage via json file
  initializeAlgorithmPatternIds2(){
	  //let url = './AlgoData.json';
	  //this.http.get(url).subscribe(res => {
		//  console.log(res);
          //this.AlgorithmDataIds = res;
    //});
	//console.log("json data");
	//console.log(this.jdata.default);
	//this.AlgorithmDataIds = this.jdata.default;
	if(this.algoStateService.getAlgorithmData() != null){
		this.AlgorithmDataIds = this.algoStateService.getAlgorithmData();
	}else{
		this.AlgorithmDataIds = this.jdata.default;
	}
  }
  
  initializeAlgorithmPatternIds() {
	  //optional patterns have to be in both arrays!
	  const QuantumAnnealingData = {name: "Quantum Annealing", 
	                                data: ["312bc9d3-26c0-40ae-b90b-56effd136c0d", "bcd4c7a1-3c92-4f8c-a530-72b8b95d3750", "482714a7-8409-4165-93fe-72b02c2ae99c", 
							  "2229a430-fe92-4411-9d72-d10dd1d8da14", "3d1f3991-df47-4d42-8f9a-e6dcf4e3ccec"],
							        href: "https://platform.planqk.de/algorithms/786e1ff5-991e-428d-a538-b8b99bc3d175/"};
	  this.AlgorithmDataIds.push(QuantumAnnealingData);
	  const ReverseAnnealingData = {name: "Reverse Annealing",
	                                data: ["312bc9d3-26c0-40ae-b90b-56effd136c0d", "bcd4c7a1-3c92-4f8c-a530-72b8b95d3750", "482714a7-8409-4165-93fe-72b02c2ae99c", 
	  "2229a430-fe92-4411-9d72-d10dd1d8da14", "3d1f3991-df47-4d42-8f9a-e6dcf4e3ccec", "dd15032b-ce2b-40b6-80ac-97623255b531", "bc795a9b-7977-4e01-b513-f9f5aba38aa7", 
	  "b657ea73-63c0-4800-a69d-a91925e19ac6", "3ea9e187-e91b-4852-84eb-b35b5c480892"],
	                                optional: ["3ea9e187-e91b-4852-84eb-b35b5c480892"],
									href: "https://platform.planqk.de/algorithms/fadafc8b-5388-4768-8804-5fc22cf04a20/"};
	  this.AlgorithmDataIds.push(ReverseAnnealingData);
	  const Qaoa = {name: "Quantum Approximate Optimization Algorithm",
					data: ["bcd4c7a1-3c92-4f8c-a530-72b8b95d3750", "dd15032b-ce2b-40b6-80ac-97623255b531", "bc795a9b-7977-4e01-b513-f9f5aba38aa7", 
	  "b657ea73-63c0-4800-a69d-a91925e19ac6", "3ea9e187-e91b-4852-84eb-b35b5c480892", "da93f915-7f4c-49df-99d0-80d91f26a337"],
	                optional: ["3ea9e187-e91b-4852-84eb-b35b5c480892"],
					href: "https://platform.planqk.de/algorithms/fae60bca-d2b6-4aa2-88b7-58caace34179/"};
	  this.AlgorithmDataIds.push(Qaoa);
	  const Deutsch = {name: "Deutsch Algorithm",
					   data: ["312bc9d3-26c0-40ae-b90b-56effd136c0d", "bcd4c7a1-3c92-4f8c-a530-72b8b95d3750", "482714a7-8409-4165-93fe-72b02c2ae99c", 
	  "3d1f3991-df47-4d42-8f9a-e6dcf4e3ccec" ,"1cc7e9d6-ab37-412e-8afa-604a25de296e", "3f3fabf0-7fa7-4b43-a74a-46a7ac2c55ee", "d4f7c247-e2bb-4301-ad06-f758fa58f2dc", 
	  "2229a430-fe92-4411-9d72-d10dd1d8da14"],
	                   href: "https://platform.planqk.de/algorithms/533c90a5-5fbb-487b-b64d-a8f331aafb10/"};
	  this.AlgorithmDataIds.push(Deutsch);
	  const test = {name: "test",
					   data: ["312bc9d3-26c0-40ae-b90b-56effd136c0d", "bcd4c7a1-3c92-4f8c-a530-72b8b95d3750", "1a5e3708-da39-4356-ab3f-115264da6390"]};
	  this.AlgorithmDataIds.push(test);
	  //console.log("Complete Algorithm Data for initial values");
	  //console.log(this.AlgorithmDataIds);
  }
  
  ngOnInit() {
	//this.algoStateService.clearAlgorithmData();
    this.loadData();
    this.filter = new FormControl('');
    const filterSubscription = this.filter.valueChanges.subscribe((filterText: string) => {
      if (this.graphVisible || !this.patterns || this.patterns.length === 0) {
        return;
      }
      this.patternsForCardsView = this.patterns.filter(pattern => pattern.name.toLowerCase().includes(filterText.toLowerCase()));
    });
    this.subscriptions.add(filterSubscription);
	
	//only trigger extension for quantum computing patterns!
	if(this.patternLanguageId === "af7780d5-1f97-4536-8da7-4194b093ab1d"){
		
		//get default values (in case database conection not possible)
		this.initializeAlgorithmPatternIds();
		//this.initializeAlgorithmPatternIds2();
		let state = this.algoStateService.getAlgoState();
		if((state != null) && (state != undefined) && (state != "")){
			this.selectedAlgorithm = state;
			this.graphVisible = true;
			this.addAlgoPatterns();
			this.showAlgoPatterns();
		}
		//get database values (overwrite default values)
		this.initializeAlgorithmPatternIds3();
		this.isQuantumComputingPatternLanguage = true;
	}
  }

  detectChanges() {
    this.cdr.detectChanges();
  }

  getPatternLinks(): Observable<any> {
    const $getDirectedEdges = this.getDirectedEdges();
    const $getUndirectedEdges = this.getUndirectedEdges();
    return forkJoin([$getDirectedEdges, $getUndirectedEdges]).pipe(
      tap(() => {
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
    // check if patternlanguage is specified via UUID or URI and load it accordingly
    if (UriConverter.isUUID(this.patternLanguageId)) {
      loadDataObservable = this.patternLanguageService.getPatternLanguageByID(this.patternLanguageId)
        .pipe(
          tap(patternlanguage => this.patternLanguage = patternlanguage),
          switchMap(() => this.loadPatternsCandidatesAndLinks())
        );
    } else {
      loadDataObservable = this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageId)
        .pipe(
          tap(patternlanguage => this.patternLanguage = patternlanguage),
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



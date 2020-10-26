import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { D3Service } from '../../../graph/service/d3.service';
import { NetworkLink } from '../../model/network-link.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreatePatternRelationComponent } from '../create-pattern-relation/create-pattern-relation.component';
import { PatternContainer } from '../../model/hal/pattern-container.model';
import PatternLanguage from '../../model/hal/pattern-language.model';
import { EdgeWithType, PatternRelationDescriptorService } from '../../service/pattern-relation-descriptor.service';
import { ToasterService } from 'angular2-toaster';
import GraphEditor from '@ustutt/grapheditor-webcomponent/lib/grapheditor';
import { DraggedEdge, edgeId } from '@ustutt/grapheditor-webcomponent/lib/edge';
import Pattern from '../../model/hal/pattern.model';
import { GraphInputData } from '../../model/graph-input-data.interface';
import { PatternService } from '../../service/pattern.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PatternResponse } from '../../model/hal/pattern-response.interface';
import { EMPTY, Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { GraphDataService } from '../../service/graph-data/graph-data.service';
import { globals } from '../../../globals';
import { GraphDataSavePatternService } from '../../service/graph-data/graph-data-save-pattern.service';
import { PatternRelationDescriptorDirection } from '../../model/pattern-relation-descriptor-direction.enum';
import {UriConverter} from '../../util/uri-converter';


export class GraphNode {
  id: string;
  title: string;
  type: string;
  x: number;
  y: number;
  patternLanguageId: string;
  uri: string;
}

@Component({
  selector: 'pp-graph-display',
  templateUrl: './graph-display.component.html',
  styleUrls: ['./graph-display.component.scss']
})
export class GraphDisplayComponent implements AfterContentInit, OnChanges {

  @ViewChild('graphWrapper', { static: true })
  graph: ElementRef;

  @ViewChild('svg')
  svg: ElementRef;

  graphNativeElement: GraphEditor;
  patternGraphData: any;

  @Input() data: GraphInputData;
  @Input() showPatternLanguageName: boolean;
  @Input() enableDeletePattern: boolean = false;
  @Input() showConcreteSolutions: boolean = false;
  @Input() concreteSolutions = [];

  @Output() addedEdge = new EventEmitter<any>();
  @Output() removedEdge = new EventEmitter<any>();
  @Output() updatedGraphEvent = new EventEmitter<void>();
  @Output() deletePatternEvent = new EventEmitter<string>();
  @Output() aggregationAssignmentsUpdate = new EventEmitter<{ [ key: string ]: string }>();

  isLoading = true;
  patternClicked = false;
  allPatternsLoading = true;
  currentPattern: Pattern;
  currentEdges: Array<EdgeWithType>;
  patternLanguages: Array<PatternLanguage>;
  patternContainer: PatternContainer;
  private edges: Array<NetworkLink>;
  private nodes: Array<GraphNode>;
  private copyOfLinks: Array<NetworkLink>;
  private patterns: Array<Pattern>;
  private patternLanguage: PatternLanguage;
  private currentEdge: any;
  private highlightedNodeIds: Array<string> = [];
  private clickedNodeId: string = null;
  private highlightedEdgeIds: Array<string> = [];
  private manualAssignments: { [ key: string ]: string } = {};
  private aggregationAssignments: { [ key: string ]: string } = {};


  constructor(private cdr: ChangeDetectorRef,
              private d3Service: D3Service,
              private matDialog: MatDialog,
              private patternRelationDescriptionService: PatternRelationDescriptorService,
              private toastService: ToasterService,
              private patternService: PatternService,
              // use the implementation of GraphDataService that is provided in the module:
              private graphDataService: GraphDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  static mapPatternLinksToEdges(links: any[]): NetworkLink[] {
    const edges: any = [];
    if (!links.length) {
      return [];
    }
    const edges: any = [];
    for (let currentLink of links) {

      const edge: any = {
        id: currentLink.id,
        markerEnd: { template: 'arrow', scale: 0.5, relativeRotation: 0 },
        texts: currentLink.texts || []
      };

      if (currentLink.sourcePatternId && currentLink.targetPatternId) {
        // directed link
        edge.source = currentLink.sourcePatternId;
        edge.target = currentLink.targetPatternId;
      } else {
        // undirected link
        edge.source = currentLink.pattern1Id;
        edge.target = currentLink.pattern2Id;
        edge.markerStart = { template: 'arrow', scale: 0.5, relativeRotation: 0 };
      }

      edges.push(edge);
    }
    return edges;
  }

  static mapPatternsToNodes(patterns: Array<Pattern>, offsetIndex: number = 0): Array<GraphNode> {
    const nodes: Array<any> = [];
    if (patterns) {
      for (let i = 0; i < patterns.length; i++) {
        const node = {
          id: patterns[ i ].id,
          iconUrl: patterns[ i ].iconUrl,
          title: patterns[ i ].name,
          type: 'default',
          x: 5 * offsetIndex,
          y: 5 * offsetIndex,
          patternLanguageId: patterns[ i ].patternLanguageId,
          patternLanguageName: patterns[ i ].patternLanguageName,
          uri: patterns[i].uri
        };
        nodes.push(node);
      }
    }
    return nodes;
  }

  ngAfterContentInit() {
    this.graphNativeElement = this.graph.nativeElement;
    if (this.graphNativeElement == null) {
      return;
    }

    this.graphNativeElement.setNodeClass = (className, node) => {
      if (this.highlightedNodeIds.length > 0) {
        if (className === 'low-opacity-node') {
          return !this.highlightedNodeIds.includes(<string>node.id);
        }
      }
      return false;
    };

    this.graphNativeElement.setEdgeClass = (className, edge, sourceNode, targetNode) => {
      if (targetNode == null) {
        return false;
      }
      if (className === 'low-opacity-edge' && this.highlightedNodeIds.length > 0) {
        const id = edge.id ? edge.id : edgeId(edge);
        return !this.highlightedEdgeIds.includes(<string>id);
      }
      return false;
    };
    this.getGraph();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data != null) {
      this.isLoading = true;
      this.initData();
      this.getGraph();
    }
    if (changes.showConcreteSolutions != null) {
      setTimeout(() => { // Give time for property updates
        this.triggerRerendering(true);
      });
    }
  }

  edgeAdded(event) {
    if (!event.cancelable) {
      // Skip event on initial graph composition
      return;
    }

    this.currentEdge = event.detail.edge;
    const patterns = Array.isArray(this.patterns) ? this.patterns : this.patternContainer.patterns;
    const dialogRef = this.matDialog.open(CreatePatternRelationComponent, {
      data: {
        firstPattern: patterns.find((pat) => event.detail.edge.source === pat.id),
        secondPattern: patterns.find((pat) => event.detail.edge.target === pat.id),
        preselectedEdgeDirection: PatternRelationDescriptorDirection.DirectedRight,
        patterns: patterns,
        patternLanguage: this.patternLanguage,
        patternContainer: this.patternContainer,
        relationTypes: this.graphDataService.getEdgeTypes()
      }
    });

    dialogRef.afterClosed().subscribe((edge) => {
      if (edge) { // inform parent component that new edge was added
        this.addedEdge.emit(edge);
      } else {
        this.graphNativeElement.removeEdge(this.currentEdge);
        this.triggerRerendering();
      }
    });
  }

  edgeRemoved(event: CustomEvent) {
    if (event.type === 'edgeremove' && event.cancelable) {
      this.removedEdge.emit(event.detail.edge);
    }
  }

  patternDropped(event: CdkDragDrop<any[]>) {
    if (event.isPointerOverContainer) {
      return;
    }
    const patternDropped: Pattern = event.container.data[ event.previousIndex ];
    this.addPatternToGraph(patternDropped);
  }

  addPatternToGraph(pattern: Pattern) {
    this.graphDataService.addPatterns(this.patternContainer._links.patterns.href, [pattern]).pipe(
      switchMap(result => result ? this.getCurrentPatternViewAndPatterns() : EMPTY))
      .subscribe(
        (res) => {
          this.updatedGraphEvent.emit();
          if (res) {
            this.reformatGraph();
            this.toastService.pop('success', 'Pattern added');
          }
        }
      );
  }

  nodeClicked(event) {
    const node = event[ 'detail' ][ 'node' ];
    if (event[ 'detail' ][ 'key' ] === 'info') {
      this.router.navigate([UriConverter.doubleEncodeUri(node.uri)], {relativeTo: this.activatedRoute});
    }
    this.showInfoForClickedNode(node);
  }

  nodePositionChanged(event) {
    const movedNode = event.detail.node;
    try {
      (<GraphDataSavePatternService>this.graphDataService)
        .savePattern(this.patternLanguage ? this.patternLanguage : this.patternContainer, movedNode)
        .subscribe(() => console.debug('Pattern saved', movedNode));
    } catch (e) {
      this.saveGraph();
    }
  }

  saveGraph() {
    if (!this.nodes) {
      console.error('No nodes to save');
      return;
    }
    console.debug('Save graph', this.patternLanguage ? this.patternLanguage : this.patternContainer, this.graphNativeElement.nodeList);

    this.graphDataService.saveGraph(this.patternLanguage ? this.patternLanguage : this.patternContainer, this.graphNativeElement.nodeList)
      .subscribe(() => console.info('saved pattern ' + (this.patternLanguage ? 'language' : 'container') + ' graph layout'));
  }

  reformatGraph() {
    this.nodes = GraphDisplayComponent.mapPatternsToNodes(this.patterns);
    this.startSimulation();
  }

  backgroundClicked() {
    this.highlightedNodeIds = [];
    this.highlightedEdgeIds = [];
    this.clickedNodeId = null;
    this.graphNativeElement.completeRender();
    this.patternClicked = false;
  }

  public updateSideMenu() {
    if (this.clickedNodeId) {
      this.showInfoForClickedNode(this.graphNativeElement.getNode(this.clickedNodeId));
    }
  }

  triggerRerendering(forceUpdateTemplates = false) {
    if (this.graphNativeElement) {
      this.graphNativeElement.completeRender(forceUpdateTemplates);
    }
  }

  patternListExpanded(patternLang: PatternLanguage) {
    if (patternLang.patterns) {
      return;
    }
    this.allPatternsLoading = true;
    this.patternService.getPatternsByUrl(patternLang._links.patterns.href).subscribe(
      (data: Array<Pattern>) => {
        patternLang.patterns = data.sort((a, b) => a.name.localeCompare(b.name));
        this.allPatternsLoading = false;
      }
    );
  }

  private getCurrentPatternViewAndPatterns(): Observable<Pattern[]> {
    return this.graphDataService.getPatternContainer(this.patternContainer._links.self.href).pipe(
      tap(patternContainerResponse => {
        this.patternContainer = patternContainerResponse;
      }),
      switchMap((patternContainerResponse: PatternContainer) => this.patternService.getPatternsByUrl(patternContainerResponse._links.patterns.href)),
      tap(patterns => {
        this.patterns = patterns;
      }));
  }

  private initData() {
    this.patternGraphData = this.data;
    if (this.patternGraphData) {
      this.edges = GraphDisplayComponent.mapPatternLinksToEdges(this.patternGraphData.edges);
      this.copyOfLinks = GraphDisplayComponent.mapPatternLinksToEdges(this.patternGraphData.edges);
      this.patterns = this.patternGraphData.patterns;
      this.patternLanguage = this.patternGraphData.patternLanguage;
      this.patternContainer = this.patternGraphData.patternContainer;
      this.nodes = GraphDisplayComponent.mapPatternsToNodes(this.patterns);
      if (this.patternContainer) {
        this.patternLanguages = this.patternGraphData.patternLanguages;
        this.allPatternsLoading = false;
      }
    }
  }

  private startSimulation() {
    const networkGraph = this.d3Service.getNetworkGraph(this.nodes, this.edges, {
      width: 1000,
      height: 500
    });

    // allow to create edges to any other node in the graph (this enables multiple edges between nodes)
    this.graphNativeElement.onCreateDraggedEdge = (edge: DraggedEdge) => {
      this.graphNativeElement.nodeList.forEach((node) => edge.validTargets.add(<string>node.id));
      return edge;
    };

    // subscribe to the end of the network graph force-layout simulation:
    networkGraph.ticker.subscribe(() => {
      console.log('started force simulation');
      this.graphNativeElement.setNodes(networkGraph.nodes, false);
      this.nodes = networkGraph.nodes;
      this.initGraphEdges();

      this.isLoading = false;
      this.cdr.detectChanges();
      this.saveGraph();
    });
  }

  private getEdgesForPattern(): void {
    this.patternService.getPatternByUrl(this.currentPattern._links.self.href).pipe(
      switchMap((pattern: PatternResponse) => {
        return this.patternRelationDescriptionService.getEdgesForPattern(pattern);
      }))
      .subscribe(edges => {
        this.currentEdges = edges;
        this.cdr.detectChanges();
      });
  }

  private getGraph() {
    this.initData();
    if (!this.patterns || this.patterns.length === 0) {
      return;
    }

    this.graphDataService.getGraph(!!this.patternContainer ? this.patternContainer : this.patternLanguage)
      .subscribe((res: { graph: Array<GraphNode> }) => {
        this.prepareGraph(res.graph, this.patternContainer);
      });
  }

  private initGraphEdges() {
    // we need to use a hard-copy of the links, because get changed (by d3?) and the webcomponent can't handle them anymore
    if (this.copyOfLinks.length > 0) {
      this.graphNativeElement.setEdges(this.copyOfLinks, false);
    }
    this.triggerRerendering();
    this.graphNativeElement.zoomToBoundingBox(true);
  }

  private addNewPatternNodeToGraph(pat: Pattern, index: number) {
    this.graphNativeElement.addNode(GraphDisplayComponent.mapPatternsToNodes([pat], index)[ 0 ]);
  }

  private showInfoForClickedNode(node): void {
    this.clickedNodeId = node.id;
    const outgoingLinks = Array.from(this.graph.nativeElement.getEdgesByTarget(node.id));
    const ingoingLinks = Array.from(this.graph.nativeElement.getEdgesBySource(node.id));

    this.highlightedEdgeIds = [].concat(outgoingLinks).concat(ingoingLinks).map((edge) => edge.id ? edge.id : edgeId(edge));
    const outgoingNodeIds: string[] = outgoingLinks.map(it => it[ 'source' ]);
    const ingoingNodeIds: string[] = ingoingLinks.map(it => it[ 'target' ]);

    this.highlightedNodeIds = [];
    this.highlightedNodeIds = outgoingNodeIds.concat(ingoingNodeIds);
    this.highlightedNodeIds.push(node.id);
    this.currentPattern = this.patterns.find(pat => pat.id === node.id);
    this.getEdgesForPattern();
    this.patternClicked = true;
    this.triggerRerendering();
  }

  private initGraphData(graphData: Array<GraphNode>) {
    if (!this.graphNativeElement) {
      return;
    }
    this.graphNativeElement.setNodes(graphData);
    if (this.patterns.length > graphData.length) { // add newly added patterns that are not in the pattern graph yet
      const newPatterns = this.patterns.filter(pat => !this.graphNativeElement.nodeList.map(node => <string>node.id).includes(pat.id));
      newPatterns.forEach((pat, index) => this.addNewPatternNodeToGraph(pat, index));
    }
    this.initGraphEdges();
    this.patchGraphWithConcreteSolutions();
    this.isLoading = false;
  }

  private prepareGraph(graph: Array<GraphNode>, patternGraphData: PatternContainer | PatternLanguage) {
    if ((!graph && Array.isArray(this.patternGraphData.patterns)) ||
      Array.isArray(this.patternGraphData.patterns) && (this.patternGraphData.patterns.length > graph.length)) {
      this.startSimulation();
      return;
    }
    this.initGraphData(graph);
  }


  /**
   * Extend the design model graph with a dynamic number of concrete solutions per pattern instance.
   * As the currently used graph implementation does not support dynamic extension with svg elements,
   * e.g. iterating over an array and render text elements for it.
   * Due to this restriction, this implements an ugly patch mechanism using direct DOM manipulation.
   */
  private patchGraphWithConcreteSolutions(): void {
    if (!this.showConcreteSolutions) {
      return;
    }

    this.aggregationAssignments = {};

    setTimeout(() => {
      try {
        document.querySelectorAll('network-graph svg .concrete-solutions-container').forEach((csc: SVGGElement) => {

          const elementId = (<SVGGElement>csc.parentNode).id.match(/node-(.+)/);
          if (!elementId) {
            return;
          }
          const patternInstanceId = elementId[ 1 ];
          const patternInstance = this.patternContainer.patterns.filter(patternInstance => patternInstance.id === patternInstanceId)[ 0 ];
          const concreteSolutions = this.concreteSolutions.filter(cs => cs.patternUri === patternInstance.uri).sort((a, b) => {
            return a.aggregatorType.localeCompare(b.aggregatorType);
          });

          csc.innerHTML = '';
          concreteSolutions.forEach((cs, idx) => {
            this.addConcreteSolutionSvgElement(csc, idx, cs);
          });

          this.aggregationAssignmentsUpdate.emit(this.aggregationAssignments);
        });
      } catch (e) {
        console.log('Failed to patch concrete solutions into design model graph');
      }
    });
  }


  /**
   * Construct SVG group element with an rectangle and a text, representing a concrete solution.
   * @param concreteSolutionsContainerElement
   * @param index
   * @param text
   */
  private addConcreteSolutionSvgElement(concreteSolutionsContainerElement: SVGGElement, index: number, concreteSolution: any): void {

    const patternId = (<HTMLElement>concreteSolutionsContainerElement.parentNode).id.match(/node-(.+)/)[ 1 ];
    const concreteSolutionId = concreteSolution.id;

    if (this.manualAssignments[ patternId ]) {
      this.aggregationAssignments[ patternId ] = this.manualAssignments[ patternId ];
    }
    if (!this.aggregationAssignments[ patternId ] && concreteSolution.fulfills) {
      this.aggregationAssignments[ patternId ] = concreteSolutionId;
    }

    const color = this.aggregationAssignments[ patternId ] === concreteSolutionId ? '#00c' : concreteSolution.fulfills ? '#000' : '#ccc';
    const border = this.manualAssignments[ patternId ] === concreteSolutionId ? '4' : '0';


    const clickHandler = (event) => {
      if (this.manualAssignments[ patternId ] !== concreteSolutionId) {
        this.manualAssignments[ patternId ] = concreteSolutionId;
      } else {
        delete this.manualAssignments[ patternId ];
        delete this.aggregationAssignments[ patternId ];
      }
      console.debug('Manual selected', this.manualAssignments);
      this.triggerRerendering(true);
      this.patchGraphWithConcreteSolutions();
      event.stopImmediatePropagation();
    };


    const csSvgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    csSvgGroup.setAttribute('transform', 'translate(0,' + (index * 26 + 1) + ')');

    const csSvgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    csSvgRect.setAttribute('height', '25');
    csSvgRect.setAttribute('width', '170');
    csSvgRect.setAttribute('rx', '5');
    csSvgRect.setAttribute('ry', '5');
    csSvgRect.style.stroke = color;
    csSvgRect.style.strokeWidth = '1';
    csSvgRect.style.strokeDasharray = border;
    csSvgRect.style.cursor = 'pointer';
    csSvgRect.onclick = clickHandler;

    csSvgGroup.appendChild(csSvgRect);

    const csSvgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    csSvgText.setAttribute('x', '5');
    csSvgText.setAttribute('y', '15');
    csSvgText.style.fill = color;
    csSvgText.innerHTML = concreteSolution.name;
    csSvgText.classList.add('text');
    csSvgText.onclick = clickHandler;
    csSvgGroup.appendChild(csSvgText);

    concreteSolutionsContainerElement.appendChild(csSvgGroup);
  }
}

import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {D3Service} from '../../../graph/service/d3.service';
import {NetworkLink} from '../../model/network-link.interface';
import {MatDialog} from '@angular/material/dialog';
import {CreatePatternRelationComponent} from '../create-pattern-relation/create-pattern-relation.component';
import {PatternView} from '../../model/hal/pattern-view.model';
import PatternLanguage from '../../model/hal/pattern-language.model';
import {EdgeWithType, PatternRelationDescriptorService} from '../../service/pattern-relation-descriptor.service';
import {ToasterService} from 'angular2-toaster';
import GraphEditor from '@ustutt/grapheditor-webcomponent/lib/grapheditor';
import {DraggedEdge, edgeId} from '@ustutt/grapheditor-webcomponent/lib/edge';
import Pattern from '../../model/hal/pattern.model';
import {PatternLanguageService} from '../../service/pattern-language.service';
import {GraphInputData} from '../../model/graph-input-data.interface';
import {PatternService} from '../../service/pattern.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PatternViewService} from '../../service/pattern-view.service';
import {switchMap, tap} from 'rxjs/operators';
import {PatternResponse} from '../../model/hal/pattern-response.interface';
import {EMPTY, Observable} from 'rxjs';
import {PatternViewResponse} from '../../model/hal/pattern-view-response.interface';

export class GraphNode {
    id: string;
    title: string;
    type: string;
    x: number;
    y: number;
    patternLanguageId: string;
}

@Component({
    selector: 'pp-graph-display',
    templateUrl: './graph-display.component.html',
    styleUrls: ['./graph-display.component.scss']
})
export class GraphDisplayComponent implements AfterViewInit, OnChanges {

    @ViewChild('graphWrapper', {static: true}) graph: ElementRef;
    graphNativeElement: GraphEditor;
    @ViewChild('svg') svg: ElementRef;
    patternGraphData: any;
    isLoading = true;
    patternClicked = false;
    allPatternsLoading = true;
    @Input() data: GraphInputData;
    @Input() showPatternLanguageName: boolean;
    @Output() addedEdge = new EventEmitter<any>();
    currentPattern: Pattern;
    currentEdges: Array<EdgeWithType>;
    patternLanguages: Array<PatternLanguage>;
    private edges: Array<NetworkLink>;
    private nodes: Array<GraphNode>;
    private copyOfLinks: Array<NetworkLink>;
    private patterns: Array<Pattern>;
    private patternLanguage: PatternLanguage;
    private patternView: PatternView;
    private currentEdge: any;
    private highlightedNodeIds: Array<string> = [];
    private clickedNodeId: string = null;
    private highlightedEdgeIds: Array<string> = [];

    constructor(private cdr: ChangeDetectorRef,
                private d3Service: D3Service,
                private matDialog: MatDialog,
                private patternRelationDescriptionService: PatternRelationDescriptorService,
                private toastService: ToasterService,
                private patternLanguageService: PatternLanguageService,
                private patternViewService: PatternViewService,
                private patternService: PatternService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    static mapPatternLinksToEdges(links: any[]): NetworkLink[] {
        const edges: any = [];
        if (!links.length) {
            return [];
        }
        for (let i = 0; i < links.length; i++) {
            const currentLink = links[i];
            if (currentLink.sourcePatternId && currentLink.targetPatternId) {
                edges.push({
                    source: currentLink.sourcePatternId, target: currentLink.targetPatternId,
                    id: currentLink.id,
                    markerEnd: {template: 'arrow', scale: 0.5, relativeRotation: 0},
                });
            } else { // undirected link
                edges.push(<NetworkLink>{
                    source: currentLink.pattern1Id, target: currentLink.pattern2Id,
                    id: currentLink.id,
                    markerEnd: {template: 'arrow', scale: 0.5, relativeRotation: 0},
                    markerStart: {template: 'arrow', scale: 0.5, relativeRotation: 0}
                });
            }
        }
        return edges;
    }

    static mapPatternsToNodes(patterns: Array<Pattern>, offsetIndex: number = 0): Array<GraphNode> {
        const nodes: Array<any> = [];
        console.log(patterns);
        for (let i = 0; i < patterns.length; i++) {
            const node = {
                id: patterns[i].id,
                title: patterns[i].name,
                type: 'default',
                x: 5 * offsetIndex,
                y: 5 * offsetIndex,
                patternLanguageId: patterns[i].patternLanguageId,
                patternLanguageName: patterns[i].patternLanguageName
            };
            nodes.push(node);
        }
        return nodes;
    }

    ngAfterViewInit() {
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
    }

    edgeAdded(event) {
        this.currentEdge = event.detail.edge;
        const dialogRef = this.matDialog.open(CreatePatternRelationComponent, {
            data: {
                firstPattern: this.patterns.find((pat) => event.detail.edge.source === pat.id),
                secondPattern: this.patterns.find((pat) => event.detail.edge.target === pat.id),
                patterns: this.patterns,
                patternLanguage: this.patternLanguage,
                patternView: this.patternView
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

    private getCurrentPatternViewAndPatterns(): Observable<Pattern[]> {
        return this.patternViewService.getPatternViewByUri(this.patternView.uri).pipe(
            tap(patternViewResponse => {
                this.patternView = patternViewResponse;
            }),
            switchMap((patternViewResponse: PatternView) => this.patternService.getPatternsByUrl(patternViewResponse._links.patterns.href)),
            tap(patterns => {
                this.patterns = patterns;
            }));
    }

    addPatternToGraph(pattern: Pattern) {
        const patternList = [];
        patternList.push(pattern);
        this.patternViewService.addPatterns(this.patternView._links.patterns.href, patternList).pipe(
            switchMap(result => result ? this.getCurrentPatternViewAndPatterns() : EMPTY))
            .subscribe((res) => {
                    if (res) {
                        this.toastService.pop('success', 'Pattern added');
                        this.cdr.detectChanges();
                        this.reformatGraph();
                    }
                }
            );
    }

    nodeClicked(event) {
        const node = event['detail']['node'];
        console.log(node);
        if (event['detail']['key'] === 'info') {
            this.router.navigate(['..', (<GraphNode>node).patternLanguageId + node.id, {relativeTo: this.activatedRoute}]);
        }
        this.showInfoForClickedNode(node);
    }

    saveGraph() {
        if (this.nodes && this.patternLanguage) {
            this.patternLanguageService.saveGraph(this.patternLanguage, this.graphNativeElement.nodeList)
                .subscribe(() => console.log('saved graph layout'));
        }
        if (this.nodes && this.patternView) {
            this.patternViewService.saveGraph(this.patternView, this.graphNativeElement.nodeList)
                .subscribe(() => console.log('saved graph layout'));
        }
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

    triggerRerendering() {
        this.graphNativeElement.completeRender();
    }

    private initData() {
        this.patternGraphData = this.data;
        if (this.patternGraphData) {
            this.edges = GraphDisplayComponent.mapPatternLinksToEdges(this.patternGraphData.edges);
            this.copyOfLinks = GraphDisplayComponent.mapPatternLinksToEdges(this.patternGraphData.edges);
            this.patterns = this.patternGraphData.patterns;
            this.patternLanguage = this.patternGraphData.patternLanguage;
            this.patternView = this.patternGraphData.patternView;
            this.nodes = GraphDisplayComponent.mapPatternsToNodes(this.patterns);
            this.patternLanguages = this.getPatterns(this.patternGraphData.patternLanguages);
        }
    }

    private getPatterns(patternLanguages: Array<PatternLanguage>) {
        const amountOfPLs = patternLanguages.length;
        let index = 0;
        for (const patternLang of patternLanguages) {
            this.patternService.getPatternsByUrl(patternLang._links.patterns.href).subscribe(
                data => {
                    patternLang.patterns = data;
                    index += 1;
                    if (index === amountOfPLs) {
                        this.allPatternsLoading = false;
                    }
                }
            );
        }
        return patternLanguages;
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
        if (this.patterns.length === 0) {
            return;
        }
        if (!this.patternLanguage) {
            this.patternViewService.getGraph(this.patternView)
                .subscribe((res: { graph: Array<GraphNode> }) => {
                    this.prepareGraph(res.graph, this.patternView);
                });
        } else {
            this.patternLanguageService.getGraph(this.patternLanguage)
                .subscribe((res: { graph: Array<GraphNode> }) => {
                    this.prepareGraph(res.graph, this.patternView);
                });
        }


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
        this.graphNativeElement.addNode(GraphDisplayComponent.mapPatternsToNodes([pat], index)[0]);
    }

    private showInfoForClickedNode(node): void {
        this.clickedNodeId = node.id;
        const outgoingLinks = Array.from(this.graph.nativeElement.getEdgesByTarget(node.id));
        const ingoingLinks = Array.from(this.graph.nativeElement.getEdgesBySource(node.id));

        this.highlightedEdgeIds = [].concat(outgoingLinks).concat(ingoingLinks).map((edge) => edge.id ? edge.id : edgeId(edge));
        const outgoingNodeIds: string[] = outgoingLinks.map(it => it['source']);
        const ingoingNodeIds: string[] = ingoingLinks.map(it => it['target']);

        this.highlightedNodeIds = [];
        this.highlightedNodeIds = outgoingNodeIds.concat(ingoingNodeIds);
        this.highlightedNodeIds.push(node.id);
        this.currentPattern = this.patterns.find(pat => pat.id === node.id);
        this.getEdgesForPattern();
        this.patternClicked = true;
        this.triggerRerendering();
    }

    private initGraphData(graphData: Array<GraphNode>) {
        this.graphNativeElement.setNodes(graphData);
        if (this.patterns.length > graphData.length) { // add newly added patterns that are not in the pattern graph yet
            const newPatterns = this.patterns.filter(pat => !this.graphNativeElement.nodeList.map(node => <string>node.id).includes(pat.id));
            newPatterns.forEach((pat, index) => this.addNewPatternNodeToGraph(pat, index));
        }
        this.initGraphEdges();
        this.isLoading = false;
    }

    private prepareGraph(graph: Array<GraphNode>, patternGraphData: PatternView | PatternLanguage) {
        if ((!graph && Array.isArray(this.patternGraphData.patterns)) ||
            Array.isArray(this.patternGraphData.patterns) && (this.patternGraphData.patterns.length > graph.length)) {
            this.startSimulation();
            return;
        }
        this.initGraphData(graph);
    }
}

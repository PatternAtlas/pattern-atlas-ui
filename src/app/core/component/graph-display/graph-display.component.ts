import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { D3Service } from '../../../graph/service/d3.service';
import { NetworkLink } from '../../model/network-link.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { CreatePatternRelationComponent } from '../create-pattern-relation/create-pattern-relation.component';
import { PatternView } from '../../model/hal/pattern-view.model';
import PatternLanguage from '../../model/hal/pattern-language.model';
import { EdgeWithType, PatternRelationDescriptorService } from '../../service/pattern-relation-descriptor.service';
import { DirectedEdgeModel } from '../../model/hal/directed-edge.model';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
import { UriConverter } from '../../util/uri-converter';
import GraphEditor from '@ustutt/grapheditor-webcomponent/lib/grapheditor';
import { DraggedEdge, edgeId } from '@ustutt/grapheditor-webcomponent/lib/edge';
import Pattern from '../../model/hal/pattern.model';
import { PatternLanguageService } from '../../service/pattern-language.service';
import { GraphInputData } from '../../model/graph-input-data.interface';
import { PatternService } from '../../service/pattern.service';

export class GraphNode {
    id: string;
    title: string;
    type: string;
    x: number;
    y: number;
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
    @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
    patternLanguageData: any;
    isLoading = true;
    @Input() data: GraphInputData;
    currentPattern: Pattern;
    currentEdges: Array<EdgeWithType>;
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
                private patternService: PatternService) {
    }

    static mapPatternLinksToEdges(links: any[]): NetworkLink[] {
        const edges: any = [];
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

    ngAfterViewInit() {
        this.graphNativeElement = this.graph.nativeElement;
        if (this.graphNativeElement == null) {
            return;
        }

        this.graphNativeElement.setNodeClass = (className, node) => {
            if (this.highlightedNodeIds.length > 0) {
                if (className === 'highlighted-node') {
                    return this.highlightedNodeIds.includes(<string>node.id);
                }
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
        this.initData();
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

        dialogRef.afterClosed().pipe(
            switchMap((edge) => {
                const parentOfEdge = this.patternLanguage ? this.patternLanguage : this.patternView;

                const url = (edge && edge instanceof DirectedEdgeModel) ? parentOfEdge._links.directedEdges.href : parentOfEdge._links.undirectedEdges.href;
                return edge ? this.patternRelationDescriptionService.addRelationToPL(this.patternLanguage, edge) : of(null);
            }), // reload patterns because they must contain new links
            switchMap(() => this.getPatterns())).subscribe(res => {
            if (res) {
                this.toastService.pop('success', 'Created new Link');
                // update sidemenu, if we display details for a specific node:
                if (this.clickedNodeId) {
                    this.showInfoForClickedNode(this.graphNativeElement.getNode(this.clickedNodeId));
                }
                this.graphNativeElement.completeRender();

                this.cdr.detectChanges();
            } else {
                this.graphNativeElement.removeEdge(this.currentEdge);
                this.graphNativeElement.completeRender();
            }
        });
    }

    nodeClicked(event) {
        const node = event['detail']['node'];
        this.showInfoForClickedNode(node);
    }

    saveGraph() {
        if (this.nodes && this.patternLanguage) {
            this.patternLanguageService.saveGraph(this.patternLanguage, this.graphNativeElement.nodeList)
                .subscribe(() => console.log('saved graph layout'));
        }
    }

    reformatGraph() {
        this.nodes = this.mapPatternsToNodes(this.patterns);
        this.startSimulation();
    }

    getPatterns(): Observable<Array<Pattern>> {
        return this.patternService.getPatternsByUrl(this.patternLanguage._links.patterns.href)
            .pipe(
                tap(patterns => this.patterns = patterns)
            );
    }

    backgroundClicked() {
        this.highlightedNodeIds = [];
        this.highlightedEdgeIds = [];
        this.clickedNodeId = null;
        this.graphNativeElement.completeRender();
        this.sidenavContainer.close();
    }

    private initData() {
        this.patternLanguageData = this.data;
        this.edges = GraphDisplayComponent.mapPatternLinksToEdges(this.patternLanguageData.edges);
        this.copyOfLinks = GraphDisplayComponent.mapPatternLinksToEdges(this.patternLanguageData.copyOfLinks);
        this.patterns = this.patternLanguageData.patterns;
        this.patternLanguage = this.patternLanguageData.patternLanguage;
        this.patternView = this.patternLanguageData.patternView;
        this.nodes = this.mapPatternsToNodes(this.patterns);
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

    private mapPatternsToNodes(patterns: Array<Pattern>, offsetIndex: number = 0): Array<GraphNode> {
        const nodes: Array<any> = [];
        for (let i = 0; i < patterns.length; i++) {
            const node = {
                id: patterns[i].id,
                title: patterns[i].name,
                type: 'default',
                link: 'patternlanguages/' + UriConverter.doubleEncodeUri(this.patternLanguage.uri) + '/' + UriConverter.doubleEncodeUri(patterns[i].uri),
                x: 5 * offsetIndex,
                y: 5 * offsetIndex
            };
            nodes.push(node);
        }
        return nodes;
    }

    private getEdgesForPattern(): void {
        this.patternRelationDescriptionService.getEdgesForPattern(this.currentPattern)
            .subscribe(edges => {
                this.currentEdges = edges;
                this.cdr.detectChanges();
            });
    }

    private getGraph() {
        this.patternLanguageService.getGraph(this.patternLanguage)
            .subscribe((res: { graph: Array<GraphNode> }) => {
                if (Array.isArray(this.patternLanguage.patterns) && (this.patternLanguage.patterns.length > res.graph.length)) {
                    this.startSimulation();
                } else {
                    this.graphNativeElement.setNodes(res.graph);
                    if (this.patterns.length > res.graph.length) { // add newly added patterns that are not in the pattern graph yet
                        const newPatterns = this.patterns.filter(pat => !this.graphNativeElement.nodeList.map(node => <string>node.id).includes(pat.id));
                        newPatterns.forEach((pat, index) => this.addNewPatternNodeToGraph(pat, index));
                    }
                    this.initGraphEdges();
                    this.isLoading = false;
                }
            });
    }

    private initGraphEdges() {
        // we need to use a hard-copy of the links, because get changed (by d3?) and the webcomponent can't handle them anymore
        if (this.copyOfLinks.length > 0) {
            this.graphNativeElement.setEdges(this.copyOfLinks, false);
        }
        this.graphNativeElement.completeRender();
        this.graphNativeElement.zoomToBoundingBox(true);
    }

    private addNewPatternNodeToGraph(pat: Pattern, index: number) {
        this.graphNativeElement.addNode(this.mapPatternsToNodes([pat], index)[0]);
    }

    private showInfoForClickedNode(node): void {
        this.clickedNodeId = node.id;
        const outgoingLinks = Array.from(this.graph.nativeElement.getEdgesByTarget(node.id));
        const ingoingLinks = Array.from(this.graph.nativeElement.getEdgesBySource(node.id));

        this.highlightedEdgeIds = [].concat(outgoingLinks).concat(ingoingLinks).map((edge) => edge.id ? edge.id : edgeId(edge));
        const outgoingNodeIds: string[] = outgoingLinks.map(it => it['source']);
        const ingoingNodeIds: string[] = ingoingLinks.map(it => it['target']);

        this.highlightedNodeIds = outgoingNodeIds.concat(ingoingNodeIds);
        this.highlightedNodeIds.push(node.id);
        this.currentPattern = this.patterns.find(pat => pat.id === node.id);
        this.getEdgesForPattern();
        this.sidenavContainer.open();
        this.graphNativeElement.completeRender();
    }
}

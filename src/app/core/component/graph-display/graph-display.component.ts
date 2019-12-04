import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {D3Service} from '../../../graph/service/d3.service';
import {NetworkLink} from '../../model/network-link.interface';
import {MatDialog} from '@angular/material/dialog';
import {MatSidenavContainer} from '@angular/material/sidenav';
import {CreatePatternRelationComponent} from '../create-pattern-relation/create-pattern-relation.component';
import {PatternView} from '../../model/hal/pattern-view.model';
import PatternLanguage from '../../model/hal/pattern-language.model';
import {EdgeWithType, PatternRelationDescriptorService} from '../../service/pattern-relation-descriptor.service';
import {DirectedEdgeModel} from '../../model/hal/directed-edge.model';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {UriConverter} from '../../util/uri-converter';
import GraphEditor from '@ustutt/grapheditor-webcomponent/lib/grapheditor';
import {DraggedEdge, edgeId} from '@ustutt/grapheditor-webcomponent/lib/edge';
import Pattern from '../../model/hal/pattern.model';
import {PatternLanguageService} from '../../service/pattern-language.service';
import {GraphInputData} from '../../model/graph-input-data.interface';


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
    patternlanguageData;
    isLoading = true;
    private edges: NetworkLink[];
    private nodes: GraphNode[];
    private copyOfLinks: NetworkLink[];
    private patterns: Pattern[];
    private patternLanguage: PatternLanguage;
    private patternView: PatternView;
    private currentEdge: any;

    @Input() data: GraphInputData;
    private highlightedNodeIds: string[] = [];
    private highlightedEdgeIds: string[] = [];
    currentPattern: Pattern;
    currentEdges: EdgeWithType[];


    constructor(private cdr: ChangeDetectorRef, private d3Service: D3Service, private matDialog: MatDialog,
                private patternRelationDescriptionService: PatternRelationDescriptorService, private toastService: ToasterService,
                private patternLanguageService: PatternLanguageService) {
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

    private initData() {
        this.patternlanguageData = this.data;
        this.edges = this.mapPatternLinksToEdges(this.patternlanguageData.edges);
        this.copyOfLinks = this.mapPatternLinksToEdges(this.patternlanguageData.copyOfLinks);
        this.patterns = this.patternlanguageData.patterns;
        this.patternLanguage = this.patternlanguageData.patternLanguage;
        this.patternView = this.patternlanguageData.patternView;
        this.nodes = this.mapPatternsToNodes(this.patterns);

    }


    private startSimulation() {
        const networkGraph = this.d3Service.getNetworkGraph(this.nodes, this.edges, {
            width: 300, //1450,
            height: 1313// 1000
        });


        // allow to create edges to any other node in the graph (this enables multiple edges between nodes)
        this.graphNativeElement.onCreateDraggedEdge = (edge: DraggedEdge) => {
            this.graphNativeElement.nodeList.forEach((node) => edge.validTargets.add(<string>node.id));
            return edge;
        };

        // subscribe to the end of the network graph force-layout simulation:
        networkGraph.ticker.subscribe((d: any) => {
            console.log('started force simulation');
            this.graphNativeElement.setNodes(networkGraph.nodes, false);
            this.initGraphEdges();

            this.isLoading = false;
            this.cdr.markForCheck();
            this.saveGraph();
        });

    }


    private mapPatternLinksToEdges(links: any[]): NetworkLink[] {
        const edges = [];
        for (let i = 0; i < links.length; i++) {
            const currentlink = links[i];
            if (currentlink.sourcePatternId && currentlink.targetPatternId) {
                edges.push({
                    source: currentlink.sourcePatternId, target: currentlink.targetPatternId,
                    id: currentlink.id,
                    markerEnd: {template: 'arrow', scale: 0.5, relativeRotation: 0},
                });
            } else { // undirected link
                edges.push(<NetworkLink>{
                    source: currentlink.pattern1Id, target: currentlink.pattern2Id,
                    id: currentlink.id,
                    markerEnd: {template: 'arrow', scale: 0.5, relativeRotation: 0},
                    markerStart: {template: 'arrow', scale: 0.5, relativeRotation: 0}
                });
            }
        }
        return edges;
    }


    private mapPatternsToNodes(patterns: Pattern[]): GraphNode[] {
        const nodes = [];
        for (let i = 0; i < patterns.length; i++) {
            const node = {
                id: patterns[i].id,
                title: patterns[i].name,
                type: 'default',
                link: 'patternlanguages/' + UriConverter.doubleEncodeUri(this.patternLanguage.uri) + '/' + UriConverter.doubleEncodeUri(patterns[i].uri),
                x: 0,
                y: 0
            };
            nodes.push(node);
        }
        return nodes;
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
                return edge ? this.patternRelationDescriptionService.savePatternRelation(url, edge) : of(null);
            })).subscribe(res => {
            if (res) {
                this.toastService.pop('success', 'Created new Link');
            } else {
                this.graphNativeElement.removeEdge(this.currentEdge);
                this.graphNativeElement.completeRender();
            }
        });
    }

    nodeClicked(event) {
        const node = event['detail']['node'];
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

    private getEdgesForPattern(): void {
        this.patternRelationDescriptionService.getEdgesForPattern(this.currentPattern).subscribe(edges => {
            this.currentEdges = edges;
            console.log(this.currentEdges);
        });
    }

    saveGraph() {
        if (this.nodes && this.patternLanguage) {
            this.patternLanguageService.saveGraph(this.patternLanguage, this.nodes).subscribe(res => console.log('saved graph layout'));
        }
    }


    reformatGraph() {
        this.nodes = this.mapPatternsToNodes(this.patterns);
        this.startSimulation();
    }

    backgroundClicked($event) {
        this.highlightedNodeIds = [];
        this.highlightedEdgeIds = [];
        this.graphNativeElement.completeRender();
        this.sidenavContainer.close();
    }

    private getGraph() {
        this.patternLanguageService.getGraph(this.patternLanguage).subscribe((res: { content: { graph: GraphNode[] } }) => {
            if (!res.content || res.content.graph === null || res.content.graph.length === 0) {
                this.startSimulation();
                return;
            }
            this.graphNativeElement.setNodes(res.content.graph);
            this.initGraphEdges();
            this.isLoading = false;
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
}



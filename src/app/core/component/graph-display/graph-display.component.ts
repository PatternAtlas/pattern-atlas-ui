import {ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {D3Service} from '../../../graph/service/d3.service';
import {NetworkLink} from '../../model/network-link.interface';
import {Edge} from '../../model/hal/edge.model';
import {MatDialog} from '@angular/material/dialog';
import {MatSidenavContainer} from '@angular/material/sidenav';
import {CreatePatternRelationComponent} from '../create-pattern-relation/create-pattern-relation.component';
import {PatternView} from '../../model/hal/pattern-view.model';
import PatternLanguage from '../../model/hal/pattern-language.model';
import {PatternRelationDescriptorService} from '../../service/pattern-relation-descriptor.service';
import {DirectedEdgeModel} from '../../model/hal/directed-edge.model';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {UriConverter} from '../../util/uri-converter';
import GraphEditor from '@ustutt/grapheditor-webcomponent/lib/grapheditor';
import {edgeId} from '@ustutt/grapheditor-webcomponent/lib/edge';
import Pattern from '../../model/hal/pattern.model';
import {UndirectedEdgeModel} from '../../model/hal/undirected-edge.model';

interface GraphInputData {
    patterns: Pattern[];
    edges: Edge[];
    copyOfLinks: Edge[];
    patternLanguage: PatternLanguage;
    patternView: PatternView;
}

class GraphNode {
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
export class GraphDisplayComponent implements OnInit, OnChanges {

    @ViewChild('graphWrapper') graph: ElementRef;
    @ViewChild('svg') svg: ElementRef;
    @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
    patternlanguageData;
    isLoading = false;
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
    private outGoingDirectedEdges: Edge[];
    private inGoingDirectedEdges: Edge[];
    private inGoingUndirectedEdges: Edge[];
    currentEdges: (DirectedEdgeModel | UndirectedEdgeModel)[];


    constructor(private cdr: ChangeDetectorRef, private d3Service: D3Service, private matDialog: MatDialog,
                private patternRelationDescriptionService: PatternRelationDescriptorService, private toastService: ToasterService) {
    }

    ngOnInit() {
        this.initData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data != null) {
            this.initData();
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
        this.isLoading = true;
        this.startSimulation();
    }


    private startSimulation() {
        const networkGraph = this.d3Service.getNetworkGraph(this.nodes, this.edges, {
            width: 300, //1450,
            height: 1313// 1000
        });
        const graph: GraphEditor = this.graph.nativeElement;
        graph.setNodeClass = (className, node) => {
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

        graph.setEdgeClass = (className, edge, sourceNode, targetNode) => {
            if (targetNode == null) {
                return false;
            }
            if (className === 'low-opacity-edge' && this.highlightedNodeIds.length > 0) {
                const id = edge.id ? edge.id : edgeId(edge);
                return !this.highlightedEdgeIds.includes(<string>id);
            }
            return false;
        };

        // subscribe to the end of the network graph force-layout simulation:
        networkGraph.ticker.subscribe((d: any) => {
            console.log('started force simulation');
            graph.setNodes(networkGraph.nodes, false);
            // we need to use a hard-copy of the links, because get changed (by d3?) and the webcomponent can't handle them anymore
            if (this.copyOfLinks.length > 0) {
                graph.setEdges(this.copyOfLinks, false);
            }
            graph.completeRender();
            graph.zoomToBoundingBox(true);


            this.cdr.markForCheck();
            this.isLoading = false;
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
        console.log(this.currentEdge);
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
                const graph: GraphEditor = this.graph.nativeElement;
                graph.removeEdge(this.currentEdge);
                graph.completeRender();
                console.log(this.graph.nativeElement.getEdgesBySource(this.currentEdge.source));
            }
        });
    }

    nodeClicked(event) {
        const node = event['detail']['node'];
        console.log('node clicked');
        const outgoingLinks = Array.from(this.graph.nativeElement.getEdgesByTarget(node.id));
        const ingoingLinks = Array.from(this.graph.nativeElement.getEdgesBySource(node.id));

        this.highlightedEdgeIds = [].concat(outgoingLinks).concat(ingoingLinks).map((edge) => edge.id ? edge.id : edgeId(edge));
        const outgoingNodeIds: string[] = outgoingLinks.map(it => it['source']);
        const ingoingNodeIds: string[] = ingoingLinks.map(it => it['target']);

        this.highlightedNodeIds = outgoingNodeIds.concat(ingoingNodeIds);
        this.highlightedNodeIds.push(node.id);
        const graph: GraphEditor = this.graph.nativeElement;
        this.currentPattern = this.patterns.find(pat => pat.id === node.id);
        this.getEdgesForPattern();
        this.sidenavContainer.open();
        graph.completeRender();

    }

    private getEdgesForPattern(): void {
        this.patternRelationDescriptionService.getEdgesForPattern(this.currentPattern).subscribe(edges => {
            console.log(edges);
            this.currentEdges = edges;
        });
    }


    reformatGraph() {
        this.startSimulation();
    }
}

function handleNodeClick(node: any): void {
    console.log(node);
}



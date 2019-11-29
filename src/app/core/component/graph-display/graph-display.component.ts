import {ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {D3Service} from '../../../graph/service/d3.service';
import {NetworkLink} from '../../model/network-link.interface';
import {Pattern} from '../../../graph/model';
import {Edge} from '../../model/hal/edge.model';
import {MatDialog} from '@angular/material';
import {CreatePatternRelationComponent} from '../create-pattern-relation/create-pattern-relation.component';
import {PatternView} from '../../model/hal/pattern-view.model';
import PatternLanguage from '../../model/hal/pattern-language.model';
import {PatternRelationDescriptorService} from '../../service/pattern-relation-descriptor.service';
import {DirectedEdgeModel} from '../../model/hal/directed-edge.model';
import {switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {UriConverter} from '../../util/uri-converter';
import GraphEditor from '@ustutt/grapheditor-webcomponent/lib/grapheditor';

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
    patternlanguageData;
    private isLoading = false;
    private edges: NetworkLink[];
    private nodes: GraphNode[];
    private copyOfLinks: NetworkLink[];
    private patterns: Pattern[];
    private patternLanguage: PatternLanguage;
    private patternView: PatternView;
    private currentEdge: any;

    @Input() data: GraphInputData;


    constructor(private cdr: ChangeDetectorRef, private d3Service: D3Service, private matDialog: MatDialog,
                private patternRelationDescriptionService: PatternRelationDescriptorService, private toastService: ToasterService) {
    }

    ngOnInit() {
        console.log('init', this.data);
        this.test();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if (changes.data != null) {
            this.test();
        }
    }

    private test() {
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
        // subscribe to the end of the network graph force-layout simulation:
        networkGraph.ticker.subscribe((d: any) => {
            console.log('tick');
            const graph: GraphEditor = this.graph.nativeElement;
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
                    source: currentlink.sourcePatternId, 'target': currentlink.targetPatternId,
                    markerEnd: {template: 'arrow', scale: 0.5, relativeRotation: 0},
                });
            } else { // undirected link
                edges.push(<NetworkLink>{
                    'source': currentlink.pattern1Id, 'target': currentlink.pattern2Id,
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
                return edge ? this.patternRelationDescriptionService.savePatternRelation(url, edge) : EMPTY;
            })).subscribe(res => {
            if (res) {
                this.toastService.pop('success', 'Created new Link');
            } else {
                console.log(this.graph.nativeElement.getEdgesBySource(this.currentEdge.source));
            }
        });
    }

    nodeClicked($event) {
        const node = event['detail']['node'];
        const outgoingLinks = this.graph.nativeElement.getEdgesByTarget(node.id);
        const ingoingLinks = this.graph.nativeElement.getEdgesBySource(node.id);
        const outgoingNodeIds: string[] = Array.from(outgoingLinks).map(it => it['source']);
        const ingoingNodeIds: string[] = Array.from(ingoingLinks).map(it => it['target']);

        const linkedNodeIds = outgoingNodeIds.concat(ingoingNodeIds);
        linkedNodeIds.push(node.id);

        this.graph.nativeElement.nodeList.forEach(currentNode => {
            currentNode.type = linkedNodeIds.includes(currentNode.id) ? 'highlighted-node' : 'low-opacity-node';
        });

        console.log(this.graph.nativeElement.edgeList);


        this.graph.nativeElement.completeRender(true);
    }
}

function handleNodeClick(node: any): void {
    console.log(node);
}



import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {D3Service} from '../../../graph/service/d3.service';
import {NetworkLink} from '../../model/network-link.interface';
import {Pattern} from '../../../graph/model';
import {Edge} from '../../model/hal/edge.model';

interface GraphInputData {
    patterns: Pattern[];
    edges: Edge[];
    copyOfLinks: Edge[];
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
export class GraphDisplayComponent implements OnInit {

    @ViewChild('graphWrapper') graph: ElementRef;
    @ViewChild('svg') svg: ElementRef;
    patternlanguageData;
    private isLoading = false;
    private edges: NetworkLink[];
    private nodes: GraphNode[];
    private copyOfLinks: NetworkLink[];

    @Input('data') set data(data: GraphInputData) {
        this.patternlanguageData = data;
        this.edges = this.mapPatternLinksToEdges(this.patternlanguageData.edges);
        this.copyOfLinks = this.mapPatternLinksToEdges(this.patternlanguageData.copyOfLinks);
        this.nodes = this.mapPatternsToNodes(this.patternlanguageData.patterns);
        this.isLoading = true;
        this.startSimulation();
    }


    constructor(private cdr: ChangeDetectorRef, private d3Service: D3Service) {
    }

    ngOnInit() {

    }


    private startSimulation() {

        const networkGraph = this.d3Service.getNetworkGraph(this.nodes, this.edges, {
            width: 300, //1450,
            height: 300// 1000
        });
        // subscribe to the end of the network graph force-layout simulation:
        networkGraph.ticker.subscribe((d: any) => {
            this.graph.nativeElement.setNodes(networkGraph.nodes, true);
            // we need to use a hard-copy of the links, because get changed (by d3?) and the webcomponent can't handle them anymore
            this.graph.nativeElement.setEdges(this.copyOfLinks, true);


            this.cdr.markForCheck();
            this.isLoading = false;
        });

        this.graph.nativeElement.addEventListener('nodeenter', function test(event) {
            console.log(event.type, event.detail.node.name + ' entered');
        });
        this.graph.nativeElement.addEventListener('data-click', function test(event) {
            console.log(event.type, event.detail);
        });
        this.graph.nativeElement.addEventListener('nodeclick', function test(event) {
            handleNodeClick(event.detail.node);
        });
    }

    private mapPatternLinksToEdges(links: any[]): NetworkLink[] {
        const edges = [];
        for (let i = 0; i < links.length; i++) {
            const currentlink = links[i];
            if (currentlink.source && currentlink.target) {
                edges.push({
                    'source': currentlink.source.id, 'target': currentlink.target.id,
                    'markers': [
                        {template: 'arrow', positionOnLine: 1, scale: 0.5, relativeRotation: 0}
                    ]
                });
            } else { // undirected link
                edges.push(<NetworkLink>{
                    'source': currentlink.p1.id, 'target': currentlink.p2.id,
                    'markers': [
                        {template: 'arrow', positionOnLine: 0, scale: 0.5, relativeRotation: 0},
                        {template: 'arrow', positionOnLine: 1, scale: 0.5, relativeRotation: 0}
                    ]
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
                type: 'red',
                x: 0,
                y: 0
            };
            nodes.push(node);
        }
        return nodes;
    }
}

function handleNodeClick(node: any): void {
    console.log(node);
}


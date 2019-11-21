import {ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {D3Service} from '../../../graph/service/d3.service';

@Component({
    selector: 'pp-graph-display',
    templateUrl: './graph-display.component.html',
    styleUrls: ['./graph-display.component.scss']
})
export class GraphDisplayComponent implements OnInit, OnDestroy {

    @ViewChild('graphWrapper') graph: ElementRef;
    @ViewChild('svg') svg: ElementRef;
    patternlanguageData;
    private isLoading = false;

    @Input('data') set data(data) {
        this.patternlanguageData = data;
        this.isLoading = true;
        this.startSimulation();
    }


    constructor(private cdr: ChangeDetectorRef, private d3Service: D3Service) {
    }

    ngOnInit() {

    }


    ngOnDestroy() {

    }

    clear() {
        // TODO: Find a solution that works
    }


    private startSimulation() {

        const networkGraph = this.d3Service.getNetworkGraph(this.patternlanguageData.nodes, this.patternlanguageData.links, {
            width: 300, //1450,
            height: 300// 1000
        });
        // subscribe to the end of the network graph force-layout simulation:
        networkGraph.ticker.subscribe((d: any) => {
            this.graph.nativeElement.setNodes(networkGraph.nodes, true);
            // we need to use a hard-copy of the links, because get changed (by d3?) and the webcomponent can't handle them anymore
            this.graph.nativeElement.setEdges(this.patternlanguageData.copyOfLinks, true);


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


}

function handleNodeClick(node: any): void {
    console.log(node);
}


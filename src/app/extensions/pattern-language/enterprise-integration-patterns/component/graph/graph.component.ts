import { Component, OnInit, Input, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Node, Link, NetworkGraph } from '../../model';
import { D3Service } from '../../service/d3.service';
import { NodeInfo } from '../../model/node-info';

@Component({
  selector: 'pp-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('selectedNodeId') selectedNodeId?: string;
  
  @Input('nodes') nodes: Node[];
  @Input('links') links: Link[];

  graph: NetworkGraph;

  // the node that is currently selected or null, if there is no selection
  selectedNode?: Node;
  // selectedNodeInfo?: NodeInfo;

  private _options: { width: number, height: number } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    if(this.graph)
      this.graph.initSimulation(this.options);
  }

  constructor(
    private d3Service: D3Service,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.graph = this.d3Service.getNetworkGraph(this.nodes, this.links, this.options);
    this.graph.ticker.subscribe((d: any) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  previewNodeInformation(event: string) {
    for(let l of this.links) {
      l.preview = true;
    }
    for(let n of this.nodes) {
      n.preview = true;
    }

    let currNode = this.nodes.find(n => n.id === event);

    currNode.preview = false;

    // iterate through all links and get neighbours 
    for(let link of this.links) {
      // check source
      if(link.source instanceof Node) {
        if(link.source.name === currNode.name) {
          link.preview = false;
          if(link.target instanceof Node) {
            link.target.preview = false;
          }
        }
      } else if(typeof link.source === 'string') {
        if(link.source === currNode.name) {
          link.preview = false;
          let n = this.nodes.find(n => n.name === link.target);
          n.preview = false;
        }
      }

      // check target
      if(link.target instanceof Node) {
        if(link.target.name === currNode.name) {
          link.preview = false;
          if(link.source instanceof Node) {
            link.source.preview = false;
          }
        }
      } else if(typeof link.target === 'string') {
        if(link.target === currNode.name) {
          link.preview = false;
          let n = this.nodes.find(n => n.name === link.source);
          n.preview = false;
        }
      }
    }
  }

  dePreviewNodeInformation(event: string) {
    for(let l of this.links) {
      l.preview = false;
    }
    for(let n of this.nodes) {
      n.preview = false;
    }
  }

  deselectNode() {    
    // remove selection of nodes and links
    for(let n of this.nodes) {
      n.selected = false;
    }
    for(let l of this.links) {
      l.selected = false;
    }

    this.selectedNode = null;
    // this.selectedNodeInfo = null;
    this.selectedNodeId = null;
  }

  // $event is the clicked node id!
  nodeInformation($event: string) {

    let node = this.nodes.find(n => n.id === $event);

    this.deselectNode();

    // set clicked node as current node to display infobox (separate component) about node
    // in HTML we can do *ngIf to show infobox component 
    this.selectedNode = node;
    this.selectedNode.selected = true;

    this.selectedNodeId = $event;

    // this.selectedNodeInfo = new NodeInfo();
    // this.selectedNodeInfo.currNode = this.selectedNode;


    // // iterate through all links and get neighbours 
    for(let link of this.links) {
      // check source
      if(link.source instanceof Node) {
        if(link.source.name === node.name) {
          link.selected = true;
          if(link.target instanceof Node) {
            link.target.selected = true;
            // this.selectedNodeInfo.outgoing.push(link.target)
          }
        }
      } else if(typeof link.source === 'string') {
        if(link.source === node.name) {
          link.selected = true;
          let n = this.nodes.find(n => n.name === link.target);
          n.selected = true;
          // this.selectedNodeInfo.outgoing.push(n);
        }
      }

      // check target
      if(link.target instanceof Node) {
        if(link.target.name === node.name) {
          link.selected = true;
          if(link.source instanceof Node) {
            link.source.selected = true;
            // this.selectedNodeInfo.incoming.push(link.source);
          }
        }
      } else if(typeof link.target === 'string') {
        if(link.target === node.name) {
          link.selected = true;
          let n = this.nodes.find(n => n.name === link.source);
          n.selected = true;
          // this.selectedNodeInfo.incoming.push(n);
        }
      }
    }
  }
}

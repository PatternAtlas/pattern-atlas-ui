import { Component, OnInit, Input, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Node, Link, NetworkGraph } from '../../model';
import { D3Service } from '../../service/d3.service';

@Component({
  selector: 'pp-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('selectedNodeId') selectedNodeId?: string;
  
  @Input('nodes') nodes: Node[];
  @Input('links') links: Link[];

  @Output() nodeSelectEvent = new EventEmitter<string>();
  @Output() nodeUnselectEvent = new EventEmitter<string>();

  graph: NetworkGraph;

  // the node that is currently selected or null, if there is no selection
  selectedNode?: Node;
  // selectedNodeInfo?: NodeInfo;

  selectedLinkId: string;

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

    if (this.selectedNodeId) {
      this.nodeInformation(this.selectedNodeId);
    }
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
    // call listener
    this.nodeUnselectEvent.emit();

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
    this.selectedLinkId = null;
    
    // call listener
    this.nodeSelectEvent.emit($event);

    let node = this.nodes.find(n => n.id === $event);

    // remove selection of nodes and links
    for(let n of this.nodes) {
      n.selected = false;
    }
    for(let l of this.links) {
      l.selected = false;
    }

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

  filterNodes(filterValue: string) {
    this.showAllNodes();

    const reg = new RegExp(filterValue);

    // get patterns to hide
    let nodesToBeFiltered = this.nodes.filter(n => !reg.test(n.name));

    // get all links that contain a pattern that should be filtered 
    let linksToBeFiltered = this.links.filter(e => {
      let id = '';
      if (typeof e.source === 'string')
        id = e.source;
      else if (e.source instanceof Node) 
        id = e.source.id;

      let s = nodesToBeFiltered.find(n => n.id === id);
      if (s) return true;

      if (typeof e.target === 'string')
        id = e.target;
      else if (e.target instanceof Node)
        id = e.target.id;
      
      let t = nodesToBeFiltered.find(n => n.id === id);
      if (t) return true;

      return false;
    });

    // aquired elements have to be hidden
    nodesToBeFiltered.forEach(n => n.hide = true);
    linksToBeFiltered.forEach(l => l.hide = true);
  }

  showAllNodes() {
    this.nodes.forEach(n => n.hide = false);
    this.links.forEach(l => l.hide = false);
  }

  showLinkInfo(linkId: string) {
    this.selectedLinkId = linkId;
  }
}

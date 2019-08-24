import { Component, OnInit, Input, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Node, Link, NetworkGraph, NodeInfo } from '../../model';
import { D3Service } from '../../service/d3.service';
import LinkData from '../../model/link-data';

@Component({
  selector: 'pp-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  // set if there should already be a selected node in the graph
  @Input() selectedNodeId?: string;

  // the list of nodes to be displayed
  @Input() nodes: Node[];
  // the list of links to be displayed
  @Input() links: Link[];

  @Input() getNodeInfo: (id: string) => Promise<NodeInfo>;
  @Input() getLinkInfo: (id: string) => Promise<LinkData>;

  @Output() nodeSelectEvent = new EventEmitter<string>();
  @Output() nodeUnselectEvent = new EventEmitter<string>();

  graph: NetworkGraph;

  // the node that is currently selected or null, if there is no selection
  selectedNode?: Node;
  // the info of the currently selected node
  selectedNodeInfo?: NodeInfo;
  // selectedNodeInfo?: NodeInfo;

  selectedLink: LinkData;
  selectedLinkId: string;

  private _options: { width: number, height: number } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    if (this.graph) {
      this.graph.initSimulation(this.options);
    }
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
    // first check, if the given node id is from the current pattern graph
    if (!this.checkIfInGraph(event)) {
      return;
    }

    for (const l of this.links) {
      l.preview = true;
    }
    for (const n of this.nodes) {
      n.preview = true;
    }

    const currNode = this.nodes.find(n => n.id === event);

    currNode.preview = false;

    // iterate through all links and get neighbours
    for (const link of this.links) {
      // check source
      if (link.source instanceof Node) {
        if (link.source.name === currNode.name) {
          link.preview = false;
          if (link.target instanceof Node) {
            link.target.preview = false;
          }
        }
      } else if (typeof link.source === 'string') {
        if (link.source === currNode.name) {
          link.preview = false;
          const n = this.nodes.find(node => node.name === link.target);
          n.preview = false;
        }
      }

      // check target
      if (link.target instanceof Node) {
        if (link.target.name === currNode.name) {
          link.preview = false;
          if (link.source instanceof Node) {
            link.source.preview = false;
          }
        }
      } else if (typeof link.target === 'string') {
        if (link.target === currNode.name) {
          link.preview = false;
          const n = this.nodes.find(node => node.name === link.source);
          n.preview = false;
        }
      }
    }
  }

  dePreviewNodeInformation(event: string) {
    for (const l of this.links) {
      l.preview = false;
    }
    for (const n of this.nodes) {
      n.preview = false;
    }
  }

  deselectNode() {
    // call listener
    this.nodeUnselectEvent.emit();

    // remove selection of nodes and links
    for (const n of this.nodes) {
      n.selected = false;
    }
    for (const l of this.links) {
      l.selected = false;
    }

    this.selectedNode = null;
    // this.selectedNodeInfo = null;
    this.selectedLink = null;
    this.selectedNodeId = null;
  }

  private checkIfInGraph(nodeId: string): boolean {
    const node = this.nodes.find(i => i.id === nodeId);
    return Boolean(node);
  }

  // $event is the clicked node id!
  nodeInformation($event: string) {
    if (!this.checkIfInGraph($event)) {
      // this node is not contained in this graph -> navigate to corresponding view
      this.nodeSelectEvent.emit($event);
      return;
    }

    this.selectedLink = null;
    this.selectedLinkId = null;

    // call listener
    this.nodeSelectEvent.emit($event);

    const node = this.nodes.find(n => n.id === $event);

    // remove selection of nodes and links
    for (const n of this.nodes) {
      n.selected = false;
    }
    for (const l of this.links) {
      l.selected = false;
    }

    // set clicked node as current node to display infobox (separate component) about node
    // in HTML we can do *ngIf to show infobox component
    this.selectedNode = node;
    this.selectedNode.selected = true;

    this.selectedNodeId = $event;
    this.retrieveNodeInfo();

    // this.selectedNodeInfo = new NodeInfo();
    // this.selectedNodeInfo.currNode = this.selectedNode;


    // // iterate through all links and get neighbours
    for (const link of this.links) {
      // check source
      if (link.source instanceof Node) {
        if (link.source.name === node.name) {
          link.selected = true;
          if (link.target instanceof Node) {
            link.target.selected = true;
            // this.selectedNodeInfo.outgoing.push(link.target)
          }
        }
      } else if (typeof link.source === 'string') {
        if (link.source === node.name) {
          link.selected = true;
          const n = this.nodes.find(n => n.name === link.target);
          n.selected = true;
          // this.selectedNodeInfo.outgoing.push(n);
        }
      }

      // check target
      if (link.target instanceof Node) {
        if (link.target.name === node.name) {
          link.selected = true;
          if (link.source instanceof Node) {
            link.source.selected = true;
            // this.selectedNodeInfo.incoming.push(link.source);
          }
        }
      } else if (typeof link.target === 'string') {
        if (link.target === node.name) {
          link.selected = true;
          const n = this.nodes.find(n => n.name === link.source);
          n.selected = true;
          // this.selectedNodeInfo.incoming.push(n);
        }
      }
    }
  }

  // toBeFilteredIds contains all NODE IDS that should be filtered from the graph
  filterNodes(toBeFilteredIds: string[]) {
    this.showAllNodes();

    const nodesToBeFiltered = this.nodes.filter(n => toBeFilteredIds.includes(n.id));

    // get all links that contain a pattern that should be filtered
    const linksToBeFiltered = this.links.filter(e => {
      let id = '';
      if (typeof e.source === 'string') {
        id = e.source;
      } else if (e.source instanceof Node) {
        id = e.source.id;
      }

      const s = nodesToBeFiltered.find(n => n.id === id);
      if (s) {
        return true;
      }

      if (typeof e.target === 'string') {
        id = e.target;
      } else if (e.target instanceof Node) {
        id = e.target.id;
      }

      const t = nodesToBeFiltered.find(n => n.id === id);
      if (t) {
        return true;
      }

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

  async showLinkInfo(linkId: string) {
    this.selectedLink = await this.getLinkInfo(linkId);
    this.selectedLinkId = linkId;
  }

  async retrieveNodeInfo() {
    this.selectedNodeInfo = await this.getNodeInfo(this.selectedNodeId);
  }
}

import { Injectable } from '@angular/core';
import { Node, Link, NetworkGraph } from '../model';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor() { }

  getNetworkGraph(nodes: Node[], links: Link[], options: {width: number, height: number}) : NetworkGraph {
    const ng = new NetworkGraph(nodes, links, options);
    return ng;
  }
}

import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';
import GraphConfig from './graph-config';

const DEFAULT_CONFIG = {
  charge: -20,
  xStrength: 1,
  yStrength: 1,
  linkDistance: 300,
  linkStrength: 0.5
};

export class NetworkGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: any[] = [];
  public links: any[] = [];

  config: GraphConfig;

  constructor(nodes, links, options: { width, height }, config?: GraphConfig) {
    this.nodes = nodes;
    this.links = links;

    this.config = config || DEFAULT_CONFIG;

    this.initSimulation(options);
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(this.config.charge).distanceMax(100))
        .force('charge', d3.forceManyBody().strength(15))
        .force('center', d3.forceCenter(options.width / 2, options.height / 2))
        .force('link', d3.forceLink().id((d) => d['id']))
        .force('collision', d3.forceCollide().radius(() => 75));
      this.simulation.stop();

      // set data
      this.simulation.nodes(this.nodes);
      this.simulation.force('link')['links'](this.links && this.links.length ? this.links : []);

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('end', function () {
        ticker.emit();
      });

      console.log('start graph force simulation');
      this.simulation.alpha(1).alphaMin(0.25).restart();
    }

  }

}

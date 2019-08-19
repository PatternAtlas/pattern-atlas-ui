import { IncomingLinksLoaderService } from './../../loader/incoming-links-loader.service';
import { OutgoingLinksLoaderService } from './../../loader/outgoing-links-loader.service';
import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { GroupLoaderService } from './../../loader/group-loader.service';
import { LinkLoaderService } from './../../loader/link-loader.service';
import { CloudComputingPatternsLoaderService } from './../../loader/cloud-computing-patterns-loader.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FilterViewComponent } from 'src/app/filter/component/filter-view/filter-view.component';
import { Node, Link, NodeInfo } from 'src/app/graph/model';
import CloudComputingPattern from '../../model/cloud-computing-pattern';
import { Pattern, Relation } from '../../model/data';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as d3 from 'd3';
import { IriConverter } from 'src/app/core/util/iri-converter';
import { PatternRenderingComponentInterface } from 'src/app/core/model/pattern-rendering-component.interface';

@Component({
  selector: 'pp-cloud-computing-patterns-graph',
  templateUrl: './cloud-computing-patterns-graph.component.html',
  styleUrls: ['./cloud-computing-patterns-graph.component.scss']
})
export class CloudComputingPatternsGraphComponent implements PatternRenderingComponentInterface, OnInit {

  // id of the pattern that is currently selected. We use the Network-Graph for displaying individual patterns too. Via Infobox.
  pId: string;

  all_data: Array<Pattern>;
  groups: any;

  data: { nodes: Node[], links: Link[], id?: string };

  patternMap: Map<string, CloudComputingPattern>;
  linkMap: Map<string, Link>;

  nodes: Node[];
  links: Link[];

  @ViewChild('graph') graph;

  constructor(private pos: PatternOntologyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    public dialog: MatDialog,
    private loader: CloudComputingPatternsLoaderService,
    private linkLoader: LinkLoaderService,
    private groupLoader: GroupLoaderService,
    private filterFactory: FilterFactoryService,
    private outgoingLinkLoader: OutgoingLinksLoaderService,
    private incomingLinkLoader: IncomingLinksLoaderService) { }

  ngOnInit() {
    const uris = [
      { value: 'https://purl.org/patternpedia' },
      { value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Patterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Relations' }
    ];
    this.pos.loadUrisToStore(uris).then(() => {
      Promise.all([
        this.loader.loadContentFromStore(),
        this.linkLoader.loadContentFromStore(),
        this.groupLoader.loadContentFromStore()
      ]).then(values => {
        this.patternMap = values[0];
        this.linkMap = values[1];
        const groupMap = values[2];

        // collect all data
        const links = Array.from(this.linkMap.values());
        this.all_data = [];

        this.patternMap.forEach((value) => {
          const p = new Pattern();
          p.id = value.id;
          p.name = value.name;

          p.intent = value.intent.value;
          p.context = value.context.value;
          p.drivingQuestion = value.drivingQuestion.value;
          p.solution = value.solution.value;
          p.result = value.result.value;
          p.icon = value.icon.value;
          p.solutionSketches = value.solutionSketches.value;

          p.relations = new Array<Relation>();

          // all links that have the current node either as source or target
          const relations = links.filter(l => {
            const s = (l.source instanceof Node) ? l.source.id : l.source;
            const t = (l.target instanceof Node) ? l.target.id : l.target;

            return s === value.id || t === value.id;
          });

          relations.forEach(r => {
            const relation = new Relation();
            relation.id = r.id;
            relation.sourceId = (r.source instanceof Node) ? r.source.id : '' + r.source;
            relation.targetId = (r.target instanceof Node) ? r.target.id : '' + r.target;
            relation.weight = r.weight;
            relation.description = r.description;
            relation.isCLR = false;

            p.relations.push(relation);
          });

          this.all_data.push(p);
        });

        // groups
        this.groups = {};
        groupMap.forEach(value => {
          this.groups[value.groupName] = value.patterns;
        });

        this.data = this.transformGraphData(this.all_data);

        this.filterAllData();
      });
    });
  }

  private groupOf(patternId: string) {
    return Object.keys(this.groups).find(groupName => this.groups[groupName].includes(patternId));
  }

  private getColorFunction() {
    // for coloring of nodes
    const groupIds = Array.from(Object.keys(this.groups));
    const scale = d3.scaleOrdinal(d3.schemeCategory10);
    const color = function (d: any) {
      if (d) {
        return scale('' + groupIds.indexOf(d));
      }
      return scale('0');
    };
    return color;
  }

  private transformGraphData(data: Array<Pattern>): {nodes: Node[], links: Link[], id?: string} {
    const color = this.getColorFunction();

    const nodes = new Array<Node>();
    const links = new Array<Link>();

    for (const p of data) {
      const n = new Node(p.id);
      n.name = p.name;

      const g = this.groupOf(p.id);
      n.color = color(g);

      nodes.push(n);

      for (const r of p.relations) {
        const l = new Link(
          r.sourceId,
          r.targetId,
          r.weight,
          r.description
        );
        links.push(l);
      }
    }

    const result = {
      nodes: nodes,
      links: links,
      id: this.pId
    };
    return result;
  }

  // called when a node from the network graph was selected
  selectNode(nodeId: string) {
    // TODO navigate to pattern via router
    console.log(nodeId);
    // should not be relative, as we might click multiple nodes!
    this.zone.run(() => {
      const route = this.pId ? ['..', nodeId] : [nodeId];
      this.router.navigate(route, { relativeTo: this.activatedRoute });
    });
  }

  // called when a node was unselected i.e. when clicked somewhere else
  unselectNode() {
    // TODO navigate back to language level
  }

  navigateBack(): void {
    this.zone.run(() => {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    });
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterViewComponent, {
      width: '600px',
      data: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterAllData();
      }
    });
  }

  private filterAllData() {
    this.filterFactory.createFilter('https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns').then(filter => {
      const filtered = filter.filterPatterns(this.all_data);
      const all = this.all_data.map(p => p.id);
      const keep = filtered.map(p => p.id);

      const filterIds = all.filter(id => !keep.includes(id));

      if (this.graph) {
        this.graph.filterNodes(filterIds);
      }
    });
  }

  /**
   * This closure returns the nodeinfo from the loader.
   * Important: It has to be a closure to use 'this' correctly, otherwise it won't work.
   * Refer to this: https://stackoverflow.com/a/39981813
   * Thank you Isaac
   */
  getNodeInfo = async (id: string): Promise<NodeInfo> => {
    const uri = IriConverter.convertIdToIri(id);
    const values = await Promise.all([
      this.loader.loadContentFromStore(),
      this.outgoingLinkLoader.loadContentFromStore(uri),
      this.incomingLinkLoader.loadContentFromStore(uri)
    ]);

    const pattern = values[0].get(uri);

    const outgoing = Array.from(values[1].values());
    const incoming = Array.from(values[2].values());

    const info = new NodeInfo();
    info.name = pattern.name;
    info.group = this.groupOf(pattern.id);
    // intent as summary
    info.summary = pattern.intent.value;
    info.languageRelations = [
      {
        languageId: 'https//purl.org/patternpedia/patternlanguages/cloudcomputingpatterns',
        languageName: 'Cloud Computing Patterns',
        relations: outgoing.concat(incoming)
      }
    ];
    return Promise.resolve(info);
  }

}

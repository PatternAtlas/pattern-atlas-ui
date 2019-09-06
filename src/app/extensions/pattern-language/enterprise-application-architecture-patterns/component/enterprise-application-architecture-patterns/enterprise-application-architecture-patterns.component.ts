import { LanguageLoaderService } from './../../../enterprise-integration-patterns/loader/language-loader.service';
import { GroupClrLoaderService } from './../../loader/group-clr-loader.service';
import { LinkInfoLoaderService } from './../../loader/link-info-loader.service';
import { IncomingLinkLoaderService } from './../../loader/incoming-link-loader.service';
import { OutgoingLinkLoaderService } from './../../loader/outgoing-link-loader.service';
import { LinkLoaderService } from './../../loader/link-loader.service';
import { GroupLoaderService } from './../../loader/group-loader.service';
import { PatternsLoaderService } from './../../loader/patterns-loader.service';
import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PatternOntologyService } from './../../../../../core/service/pattern-ontology.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Link, NodeInfo, Node } from 'src/app/graph/model';
import EnterpriseApplicationArchitecturePattern from '../../model/enterprise-application-architecture-pattern';
import * as d3 from 'd3';
import { IriConverter } from 'src/app/core/util/iri-converter';
import { FilterViewComponent } from 'src/app/filter/component/filter-view/filter-view.component';
import LinkData from 'src/app/graph/model/link-data';
import { Pattern, Relation } from '../../model/data';

@Component({
  selector: 'pp-enterprise-application-architecture-patterns',
  templateUrl: './enterprise-application-architecture-patterns.component.html',
  styleUrls: ['./enterprise-application-architecture-patterns.component.scss']
})
export class EnterpriseApplicationArchitecturePatternsComponent implements OnInit {

  // id of the pattern that is currently selected. We use the Network-Graph for displaying individual patterns too. Via Infobox.
  pId: string;

  all_data: Array<Pattern>;
  groups: any;

  data: { nodes: Node[], links: Link[], id?: string };

  patternMap: Map<string, EnterpriseApplicationArchitecturePattern>;
  linkMap: Map<string, Link>;

  nodes: Node[];
  links: Link[];

  @ViewChild('graph') graph;

  constructor(private pos: PatternOntologyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private dialog: MatDialog,
    private filterFactory: FilterFactoryService,
    private pls: PatternsLoaderService,
    private gls: GroupLoaderService,
    private lls: LinkLoaderService,
    private olls: OutgoingLinkLoaderService,
    private ills: IncomingLinkLoaderService,
    private lils: LinkInfoLoaderService,
    private gcls: GroupClrLoaderService,
    private langls: LanguageLoaderService) { }

  ngOnInit() {
    // load all relevant data
    // tslint:disable: max-line-length
    const uris = [
      { value: 'https://purl.org/patternpedia' },
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns/enterpriseapplicationarchitecturepatterns-Patterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns/enterpriseapplicationarchitecturepatterns-Relations' },
      // load all cloud patterns for possible CLRs
      { value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Patterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Relations' },
      // load all eip
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Patterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Relations' },
      // load views
      { value: 'https://purl.org/patternpedia/patternviews/cloudcomputingpatterns-enterpriseapplicationarchitecturepatterns-view' },
      { value: 'https://purl.org/patternpedia/patternviews/cloudcomputingpatterns-enterpriseapplicationarchitecturepatterns-view/cloudcomputingpatterns-enterpriseapplicationarchitecturepatterns-view-Relations' },

      { value: 'https://purl.org/patternpedia/patternviews/enterpriseapplicationarchitecturepatterns-enterpriseintegrationpatterns-view' },
      { value: 'https://purl.org/patternpedia/patternviews/enterpriseapplicationarchitecturepatterns-enterpriseintegrationpatterns-view/enterpriseapplicationarchitecturepatterns-enterpriseintegrationpatterns-view-Relations' }
    ];

    this.pos.loadUrisToStore(uris).then(() => {
      Promise.all([
        this.pls.loadContentFromStore(),
        this.lls.loadContentFromStore(),
        this.gls.loadContentFromStore()
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
              p.intent = value.intent;
              p.sketch = value.sketch;
              p.motivation = value.motivation;
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

    this.nodes = nodes;
    this.links = links;

    return result;
  }

  private checkIfInList(nodeId: string): boolean {
    const node = this.nodes.find(i => i.id === nodeId);
    return Boolean(node);
  }

  // called when a node from the network graph was selected
  async selectNode(nodeId: string) {
    if (this.nodes && !this.checkIfInList(nodeId)) {
      // given id is from another language!
      // determine language, and navigate to it
      const pattern = IriConverter.convertIdToIri(nodeId);
      const language = IriConverter.getFileName(pattern);

      const languageUri = await this.langls.loadContentFromStore(language);
      const languageId = IriConverter.convertIriToId(Array.from(languageUri.values())[0]);

      const route = `patternlanguages/${languageId}/${nodeId}`;
      this.zone.run(() => {
        this.router.navigate(['/patternlanguages', languageId, nodeId]);
      });

      console.log('Routing to: ' + route);

      return;
    }
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
      data: 'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterAllData();
      }
    });
  }

  private filterAllData() {
    this.filterFactory.createFilter('https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns').then(filter => {
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
   * This closure returns the nodeinfo for the given pattern id from the loader.
   * Important: It has to be a closure to use 'this' correctly, otherwise it won't work.
   * Refer to this: https://stackoverflow.com/a/39981813
   * Thank you Isaac
   */
  getNodeInfo = async (id: string): Promise<NodeInfo> => {
    const uri = IriConverter.convertIdToIri(id);
    const values = await Promise.all([
      this.pls.loadContentFromStore(),
      this.olls.loadContentFromStore(uri),
      this.ills.loadContentFromStore(uri),
      this.gcls.loadContentFromStore(uri),
      this.gls.loadContentFromStore()
    ]);

    const pattern = values[0].get(uri);

    const outgoing = Array.from(values[1].values());
    const incoming = Array.from(values[2].values());

    const clrs = Array.from(values[3].values());

    let group = null;
    outer:
    for (const groupInfo of Array.from(values[4].values())) {
      for (const p of groupInfo.patterns) {
        if (p === IriConverter.convertIriToId(uri)) {
          group = groupInfo.groupName;
          break outer;
        }
      }
    }
    // const group = Array.from(values[4].values()).find(groupInfo => {
    //   return Boolean(groupInfo.patterns.find(pattern => pattern === uri));
    // });

    const info = new NodeInfo();
    info.name = pattern.name;
    info.group = group;
    info.summary = pattern.intent;
    info.languageRelations = [
      {
        languageId: 'https//purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns',
        languageName: 'Enterprise Application Architecture Patterns',
        relations: outgoing.concat(incoming)
      }
    ];
    // add all clrs
    clrs.forEach(lr => info.languageRelations.push(lr));

    return Promise.resolve(info);
  }

  /**
   * Returns loaded Link data for the given link Id.
   */
  getLinkInfo = async (id: string): Promise<LinkData> => {
    const uri = IriConverter.convertIdToIri(id);
    const links = await this.lils.loadContentFromStore(uri);

    const data = links.get(uri);
    return data;
  }
}

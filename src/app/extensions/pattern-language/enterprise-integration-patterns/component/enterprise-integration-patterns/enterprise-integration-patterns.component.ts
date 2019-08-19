import { EnterpriseIntegrationPatternIncomingLinkLoaderService } from './../../loader/enterprise-integration-pattern-incoming-link-loader.service';
import { IriConverter } from './../../../../../core/util/iri-converter';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import EnterpriseIntegrationPattern from '../../model/enterprise-integration-pattern';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpriseIntegrationPatternsDataService } from '../../service/enterprise-integration-patterns-data.service';
import { PatternRenderingComponentInterface } from 'src/app/core/model/pattern-rendering-component.interface';
import { EnterpriseIntegrationPatternLoaderService } from '../../loader/enterprise-integration-pattern-loader.service';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { MatDialog } from '@angular/material';
import { FilterViewComponent } from 'src/app/filter/component/filter-view/filter-view.component';
import { Node, Link, NodeInfo } from 'src/app/graph/model';
import { EnterpriseIntegrationPatternOutgoingLinkLoaderService } from '../../loader/enterprise-integration-pattern-outgoing-link-loader.service';
import { Pattern, Relation } from '../../model/data';

@Component({
  selector: 'pp-enterprise-integration-patterns',
  templateUrl: './enterprise-integration-patterns.component.html',
  styleUrls: ['./enterprise-integration-patterns.component.scss']
})
export class EnterpriseIntegrationPatternsComponent implements PatternRenderingComponentInterface, OnInit {

  // id of the pattern that is currently selected. We use the Network-Graph for displaying individual patterns too. Via Infobox.
  pId: string;

  all_data: Array<Pattern>;
  groups: any;

  data: { nodes: Node[], links: Link[], id?: string };

  patternMap: Map<string, EnterpriseIntegrationPattern>;
  linkMap: Map<string, Link>;

  nodes: Node[];
  links: Link[];

  @ViewChild('graph') graph;

  constructor(private http: HttpClient,
    private pos: PatternOntologyService,
    private loader: EnterpriseIntegrationPatternsDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private patternLoader: EnterpriseIntegrationPatternLoaderService,
    private outgoingLinkLoader: EnterpriseIntegrationPatternOutgoingLinkLoaderService,
    private incomingLinkLoader: EnterpriseIntegrationPatternIncomingLinkLoaderService,
    private filterFactory: FilterFactoryService,
    public dialog: MatDialog) { }

  ngOnInit() {
    // load base file, patterns file, and relations file
    const uris = [
      { value: 'https://purl.org/patternpedia' },
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Patterns' },
      { value: 'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Relations' }
    ];
    this.pos.loadUrisToStore(uris).then(() => {
      // get data from store
      this.loader.getAllData()
        .then(values => {
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
            p.description = value.description.value;
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
      data: 'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterAllData();
      }
    });
  }

  private filterAllData() {
    this.filterFactory.createFilter('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns').then(filter => {
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
      this.patternLoader.loadContentFromStore(uri),
      this.outgoingLinkLoader.loadContentFromStore(uri),
      this.incomingLinkLoader.loadContentFromStore(uri)
    ]);

    const pattern = values[0].get(uri);

    const outgoing = Array.from(values[1].values());
    const incoming = Array.from(values[2].values());

    const info = new NodeInfo();
    info.name = pattern.name;
    info.group = pattern.groupName;
    info.summary = pattern.description.join('\n');
    info.languageRelations = [
      {
        languageId: 'https//purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns',
        languageName: 'Enterprise Integration Patterns',
        relations: outgoing.concat(incoming)
      }
    ];
    return Promise.resolve(info);
  }
}

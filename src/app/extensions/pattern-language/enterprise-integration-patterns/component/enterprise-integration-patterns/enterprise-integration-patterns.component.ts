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

@Component({
  selector: 'pp-enterprise-integration-patterns',
  templateUrl: './enterprise-integration-patterns.component.html',
  styleUrls: ['./enterprise-integration-patterns.component.scss']
})
export class EnterpriseIntegrationPatternsComponent implements PatternRenderingComponentInterface, OnInit {

  // id of the pattern that is currently selected. We use the Network-Graph for displaying individual patterns too. Via Infobox.
  pId: string;

  data: { nodes: Node[], links: Link[], id?: string };

  patternMap: Map<string, EnterpriseIntegrationPattern>;
  linkMap: Map<string, Link>;
  groupMap: Map<string, any>;

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
          this.groupMap = values[2];

          // links
          // links also contains edges to different pattern languages. we don't want to render them as actual links of the network graph
          // => filter clp links
          this.links = Array.from(this.linkMap.values()).filter(link => {
            let source = '';
            let target = '';

            if (typeof link.source === 'string') {
              source = link.source;
            } else if (link.source instanceof Node) {
              source = link.source.id;
            }

            if (typeof link.target === 'string') {
              target = link.target;
            } else if (link.target instanceof Node) {
              target = link.target.id;
            }

            // keep link, if its source and destination is from enterpriseintegrationpatterns, and no other language
            return source.includes('enterpriseintegrationpatterns') && target.includes('enterpriseintegrationpatterns');
          });

          // groups
          const groups = {};
          this.groupMap.forEach(value => {
            groups[value.groupName] = value.patterns;
          });

          // for coloring of nodes
          const groupIds = Array.from(Object.keys(groups));
          const scale = d3.scaleOrdinal(d3.schemeCategory10);
          const color = function (d: any) {
            if (d) {
              return scale('' + groupIds.indexOf(d));
            }
            return scale('0');
          };

          // nodes
          this.nodes = [];

          // convert given IRI -> EnterpriseIntegrationPattern Map to Node list for rendering
          this.patternMap.forEach((value) => {
            const n = new Node(value.id);
            n.name = value.name;

            // go through all groups and check if the current pattern is present in the list of patterns
            // return the group (i.e. the group name) that contains the pattern. undefined if no group contains this pattern
            const group = Object.keys(groups).find(groupName => groups[groupName].includes(value.id));
            n.color = color(group);

            this.nodes.push(n);
          });

          // place data in field
          this.data = {
            nodes: this.nodes,
            links: this.links,
            id: this.pId
          };
        });
    });
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
        // there might be new filter values set -> filter data
        this.filterFactory.createFilter('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns')
          .then(filter => this.graph.filterNodes(filter));
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

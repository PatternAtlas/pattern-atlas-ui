import { ActivatedRoute, Router } from '@angular/router';
import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { IriConverter } from 'src/app/core/util/iri-converter';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { PatternDataLoaderService } from '../../loader/pattern-data-loader.service';
import { PatternRenderingComponentInterface } from 'src/app/core/model/pattern-rendering-component.interface';
import { Node, Link, Pattern, PatternRelation, NodeInfo } from '../../model';
import { FilterViewComponent } from 'src/app/filter/component/filter-view/filter-view.component';
import * as d3 from 'd3';
import { MatDialog } from '@angular/material';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';

@Component({
  selector: 'pp-pattern-graph-template',
  templateUrl: './pattern-graph-template.component.html',
  styleUrls: ['./pattern-graph-template.component.scss']
})
export class PatternGraphTemplateComponent<T extends Pattern> implements PatternRenderingComponentInterface, OnInit {

  patternLoader = null;
  languageUri = '';

  // id of the pattern that is currently selected. We use the Network-Graph for displaying individual patterns too. Via Infobox.
  pId: string;

  all_data: Array<T>;
  groups: any;

  data: { nodes: Node[], links: Link[], id?: string };

  patternMap: Map<string, any>;
  linkMap: Map<string, Link>;

  nodes: Node[];
  links: Link[];

  @ViewChild('graph') graph;

  constructor(public pos: PatternOntologyService,
    public loader: PatternDataLoaderService,
    public dialog: MatDialog,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public zone: NgZone,
    public filterFactory: FilterFactoryService) { }

  createPattern(value: any): T {
    return null;
  }

  extractSummary(value: any): string {
    return '';
  }

  private async loadPatternData(): Promise<void> {
    const uri = IriConverter.getFileName(this.languageUri);

    // we cut the patternlanguage of the set supportedIRI to create the uris of the patterns and relations file
    const index = uri.lastIndexOf('/');

    const base = uri;
    const p = `${uri}/${uri.substr(index)}-Patterns`;
    const r = `${uri}/${uri.substr(index)}-Relations`;

    const uris = [
      { value: 'https://purl.org/patternpedia' },
      { value: base },
      { value: p },
      { value: r }
    ];

    return this.pos.loadUrisToStore(uris);
  }

  ngOnInit() {
    // load pattern data manually
    this.loadPatternData().then(() => {
      // other data will be loaded indirectly via PatternDataLoaderService
      Promise.all([this.patternLoader.loadContentFromStore(),
      this.loader.loadDirectedLinks(this.languageUri),
      this.loader.loadGroups(this.languageUri)
      ]).then(values => {
        this.patternMap = values[0];
        this.linkMap = values[1];
        const groupMap = values[2];

        // collect all data
        const links = Array.from(this.linkMap.values());
        this.all_data = [];

        this.patternMap.forEach((value) => {
          const p = this.createPattern(value);

          p.relations = new Array<PatternRelation>();

          // all links that have the current node either as source or target
          const relations = links.filter(l => {
            const s = (l.source instanceof Node) ? l.source.id : l.source;
            const t = (l.target instanceof Node) ? l.target.id : l.target;

            return s === value.id || t === value.id;
          });

          relations.forEach(r => {
            const relation = new PatternRelation();
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

  private transformGraphData(data: Array<Pattern>): { nodes: Node[], links: Link[], id?: string } {
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
      data: IriConverter.getFileName(this.languageUri)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterAllData();
      }
    });
  }

  private filterAllData() {
    this.filterFactory.createFilter(IriConverter.getFileName(this.languageUri)).then(filter => {
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
      this.patternLoader.loadContentFromStore(),
      this.loader.loadOutgoingLinks(this.languageUri, uri),
      this.loader.loadIncomingLinks(this.languageUri, uri)
    ]);

    const pattern = values[0].get(uri);

    const outgoing = Array.from(values[1].values());
    const incoming = Array.from(values[2].values());

    const info = new NodeInfo();
    info.name = pattern.name;
    info.group = this.groupOf(pattern.id);

    info.summary = this.extractSummary(pattern); // pattern.intent.value;

    // FIXME how to do this abstractly?
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

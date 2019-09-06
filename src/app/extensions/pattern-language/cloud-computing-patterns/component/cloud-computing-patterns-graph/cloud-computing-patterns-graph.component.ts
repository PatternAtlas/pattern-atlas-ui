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
import { PatternGraphTemplateComponent } from 'src/app/graph/component/pattern-graph-template/pattern-graph-template.component';
import { CloudComputingPatternData } from '../../model/pattern-data';
import { PatternDataLoaderService } from 'src/app/graph/loader/pattern-data-loader.service';

@Component({
  selector: 'pp-cloud-computing-patterns-graph',
  templateUrl: '../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.html',
  styleUrls: ['../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.scss']
})
// tslint:disable-next-line: max-line-length
export class CloudComputingPatternsGraphComponent extends PatternGraphTemplateComponent<CloudComputingPatternData> implements PatternRenderingComponentInterface, OnInit {

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

  constructor(public pos: PatternOntologyService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public zone: NgZone,
    public dialog: MatDialog,
    public filterFactory: FilterFactoryService,
    public patternLoader: CloudComputingPatternsLoaderService,
    public loader: PatternDataLoaderService) {
      super(pos, loader, dialog, router, activatedRoute, zone, filterFactory);
      this.languageUri = 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#CloudComputingPatterns';
      // patternLoader from super class will be set via DI from this component
  }

  createPattern(value: any): CloudComputingPatternData {
    const p = new CloudComputingPatternData();
    p.id = value.id;
    p.name = value.name;

    p.intent = value.intent.value;
    p.context = value.context.value;
    p.drivingQuestion = value.drivingQuestion.value;
    p.solution = value.solution.value;
    p.result = value.result.value;
    p.icon = value.icon.value;
    p.solutionSketches = value.solutionSketches.value;

    return p;
  }

  extractSummary(value: any): string {
    return value.intent.value;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

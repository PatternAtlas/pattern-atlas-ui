import { Component, NgZone, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { MatDialog } from '@angular/material';
import { EnterpriseIntegrationPatternData } from '../../model/enterprise-integration-pattern-data';
import { PatternDataLoaderService } from 'src/app/graph/loader/pattern-data-loader.service';
import { PatternGraphTemplateComponent } from 'src/app/graph/component/pattern-graph-template/pattern-graph-template.component';
import { EnterpriseIntegrationPatternsLoaderService } from '../../loader/enterprise-integration-patterns-loader.service';

@Component({
  selector: 'pp-enterprise-integration-patterns',
  templateUrl: '../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.html',
  styleUrls: ['../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.scss']
})
// tslint:disable-next-line: max-line-length
export class EnterpriseIntegrationPatternsComponent extends PatternGraphTemplateComponent<EnterpriseIntegrationPatternData> implements OnInit {

  constructor(public pos: PatternOntologyService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public zone: NgZone,
    public dialog: MatDialog,
    public filterFactory: FilterFactoryService,
    public patternLoader: EnterpriseIntegrationPatternsLoaderService,
    public loader: PatternDataLoaderService,
    public cdr: ChangeDetectorRef) {
      super(pos, loader, dialog, router, activatedRoute, zone, filterFactory, cdr);
      this.languageUri = 'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns';
      this.languageName = 'Enterprise Integration Patterns';
  }

  createPattern(value: any): EnterpriseIntegrationPatternData {
    const p = new EnterpriseIntegrationPatternData();

    p.id = value.id;
    p.name = value.name;

    p.description = value.description.value;

    return p;
  }

  extractSummary(value: any): string {
    return value.description.value.join('\n');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

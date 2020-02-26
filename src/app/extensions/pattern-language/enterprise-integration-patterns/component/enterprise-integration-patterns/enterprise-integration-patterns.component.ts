import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { MatDialog } from '@angular/material/dialog';
import { EnterpriseIntegrationPatternData } from '../../model/enterprise-integration-pattern-data';
import { PatternGraphTemplateComponent } from 'src/app/graph/component/pattern-graph-template/pattern-graph-template.component';

@Component({
    selector: 'pp-enterprise-integration-patterns',
    templateUrl: '../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.html',
    styleUrls: ['../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.scss']
})
// tslint:disable-next-line: max-line-length
export class EnterpriseIntegrationPatternsComponent extends PatternGraphTemplateComponent<EnterpriseIntegrationPatternData> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public zone: NgZone,
        public dialog: MatDialog,
        public filterFactory: FilterFactoryService,
        public cdr: ChangeDetectorRef) {
        super(dialog, router, activatedRoute, zone, filterFactory, cdr);
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

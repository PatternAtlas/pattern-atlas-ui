import { Component, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { PatternGraphTemplateComponent } from 'src/app/graph/component/pattern-graph-template/pattern-graph-template.component';
import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpriseApplicationArchitecturePatternData } from '../../model/enterprise-application-architecture-pattern-data';

@Component({
    selector: 'pp-enterprise-application-architecture-patterns',
    templateUrl: '../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.html',
    styleUrls: ['../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.scss']
})
// tslint:disable-next-line:max-line-length
export class EnterpriseApplicationArchitecturePatternsComponent extends PatternGraphTemplateComponent<EnterpriseApplicationArchitecturePatternData> implements OnInit {
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public zone: NgZone,
        public dialog: MatDialog,
        public filterFactory: FilterFactoryService,
        public cdr: ChangeDetectorRef) {
        super(dialog, router, activatedRoute, zone, filterFactory, cdr);
        this.languageUri = 'https://purl.org/patternpedia/patternlanguages/enterpriseapplicationarchitecturepatterns#EnterpriseApplicationArchitecturePatterns';
        this.languageName = 'Enterprise Appplication Architecture Patterns';
        // patternLoader from super class will be set via DI from this component
    }

    ngOnInit() {
        super.ngOnInit();
    }

    createPattern(value: any): EnterpriseApplicationArchitecturePatternData {
        const p = new EnterpriseApplicationArchitecturePatternData();
        p.id = value.id;
        p.name = value.name;

        p.intent = value.intent;
        p.sketch = value.sketch;
        p.motivation = value.motivation;

        return p;
    }

    extractSummary(value: any): string {
        return value.intent;
    }


}

import { Component, NgZone, ChangeDetectorRef, OnInit } from "@angular/core";
import { PatternGraphTemplateComponent } from "src/app/graph/component/pattern-graph-template/pattern-graph-template.component";
import { PatternsLoaderService } from "../../loader/patterns-loader.service";
import { FilterFactoryService } from "src/app/filter/service/filter-factory.service";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { PatternOntologyService } from "src/app/core/service/pattern-ontology.service";
import { PatternDataLoaderService } from "src/app/graph/loader/pattern-data-loader.service";
import { EnterpriseApplicationArchitecturePatternData } from "../../model/enterprise-application-architecture-pattern-data";

@Component({
    selector: 'pp-enterprise-application-architecture-patterns',
    templateUrl: '../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.html',
    styleUrls: ['../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.scss']
})
export class EnterpriseApplicationArchitecturePatternsComponent extends PatternGraphTemplateComponent<EnterpriseApplicationArchitecturePatternData> implements OnInit {
    constructor(public pos: PatternOntologyService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public zone: NgZone,
        public dialog: MatDialog,
        public filterFactory: FilterFactoryService,
        public patternLoader: PatternsLoaderService,
        public loader: PatternDataLoaderService,
        public cdr: ChangeDetectorRef) {
        super(pos, loader, dialog, router, activatedRoute, zone, filterFactory, cdr);
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
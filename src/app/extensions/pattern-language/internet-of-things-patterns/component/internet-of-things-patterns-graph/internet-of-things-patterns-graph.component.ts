import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { InternetOfThingsPatternData } from '../../model/internet-of-things-pattern-data';
import { PatternGraphTemplateComponent } from 'src/app/graph/component/pattern-graph-template/pattern-graph-template.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { MatDialog } from '@angular/material';
import { UriConverter } from 'src/app/core/util/uri-converter';

@Component({
    selector: 'pp-internet-of-things-patterns-graph',
    templateUrl: '../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.html',
    styleUrls: ['../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.scss']
})
export class InternetOfThingsPatternsGraphComponent extends PatternGraphTemplateComponent<InternetOfThingsPatternData> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public zone: NgZone,
        public dialog: MatDialog,
        public filterFactory: FilterFactoryService,
        public cdr: ChangeDetectorRef) {
        super(dialog, router, activatedRoute, zone, filterFactory, cdr);
        this.languageUri = 'https://purl.org/patternpedia/patternlanguages/internetofthingspatterns#InternetofThingsPatterns';
        this.languageName = 'Internet of Things Patterns';
    }

    ngOnInit() {
        super.ngOnInit();
    }

    createPattern(value: any): InternetOfThingsPatternData {
        const p = new InternetOfThingsPatternData();
        p.id = UriConverter.doubleEncodeUri(value.uri);
        p.name = value.name;

        p.summary = value.summary;
        p.alias = value.alias;
        p.icon = p.icon;
        p.problem = value.rpoblem;
        p.context = value.context;
        p.force = value.force;
        p.solution = value.solution;
        p.solutionSketches = value.solutionSketch;
        p.result = value.result;
        p.variants = value.variant;

        return p;
    }

    extractSummary(value: any): string {
        return value.summary;
    }

}

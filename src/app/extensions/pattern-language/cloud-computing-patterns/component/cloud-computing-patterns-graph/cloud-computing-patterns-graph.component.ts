import { FilterFactoryService } from 'src/app/filter/service/filter-factory.service';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PatternGraphTemplateComponent } from 'src/app/graph/component/pattern-graph-template/pattern-graph-template.component';
import { CloudComputingPatternData } from '../../model/pattern-data';

@Component({
    selector: 'pp-cloud-computing-patterns-graph',
    templateUrl: '../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.html',
    styleUrls: ['../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.scss']
})
// tslint:disable-next-line: max-line-length
export class CloudComputingPatternsGraphComponent extends PatternGraphTemplateComponent<CloudComputingPatternData> implements OnInit {

    constructor(public router: Router,
                public activatedRoute: ActivatedRoute,
                public zone: NgZone,
                public dialog: MatDialog,
                public filterFactory: FilterFactoryService,
                public cdr: ChangeDetectorRef) {
        super(dialog, router, activatedRoute, zone, filterFactory, cdr);
        this.languageUri = 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#CloudComputingPatterns';
        this.languageName = 'Cloud Computing Patterns';
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

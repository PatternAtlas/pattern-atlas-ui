import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { PatternGraphTemplateComponent } from '../pattern-graph-template/pattern-graph-template.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterFactoryService } from '../../../filter/service/filter-factory.service';
import { MatDialog } from '@angular/material';
import { UriConverter } from '../../../core/util/uri-converter';

@Component({
    selector: 'pp-default-patternlanguage-graph',
    // tslint:disable-next-line:max-line-length
    templateUrl: '../pattern-graph-template/pattern-graph-template.component.html', // ../patterns-graph-template/patterns-graph-template.component.html', // ../../../../../graph/component/patterns-graph-template/patterns-graph-template.component.html
    styleUrls: ['../pattern-graph-template/pattern-graph-template.component.scss']
})
export class DefaultPatternlanguageGraphComponent extends PatternGraphTemplateComponent<any> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public zone: NgZone,
        public dialog: MatDialog,
        public filterFactory: FilterFactoryService,
        public cdr: ChangeDetectorRef) {
        super(dialog, router, activatedRoute, zone, filterFactory, cdr);
    }

    createPattern(value: any): any {
        return {id: UriConverter.doubleEncodeUri(value.uri), name: value.toPattern(this.languageUri).name};
    }


    ngOnInit() {
        super.ngOnInit();
    }

}

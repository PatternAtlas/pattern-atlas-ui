import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { PatternRenderingComponent } from '../../../../../core/model/pattern-rendering-component';
import { CloudComputingPatternsLoader } from '../../loader/cloud-computing-patterns-loader';
import { ActivatedRoute, Router } from '@angular/router';
import CloudComputingPattern from '../../model/cloud-computing-pattern';
import { IriConverter } from '../../../../../core/util/iri-converter';

@Component({
    selector: 'pp-cloud-computing-pattern',
    templateUrl: './cloud-computing-pattern.component.html',
    styleUrls: ['./cloud-computing-pattern.component.scss']
})
export class CloudComputingPatternComponent implements PatternRenderingComponent, OnInit {

    pId: string;
    pattern: CloudComputingPattern;

    constructor(private loader: CloudComputingPatternsLoader,
                private cdr: ChangeDetectorRef,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone) {
    }

    ngOnInit(): void {
        this.loader.loadContentFromStore()
            .subscribe(patternMap => {
                this.pattern = patternMap.get(IriConverter.convertIdToIri(this.pId));
                this.cdr.detectChanges();
            });
    }

    navigateBack(): void {
        this.zone.run(() => {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }

}

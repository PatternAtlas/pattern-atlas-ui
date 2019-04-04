import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IriConverter } from '../util/iri-converter';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
    selector: 'pp-default-pl-renderer',
    templateUrl: './default-pl-renderer.component.html',
    styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {

    patterns: any;
    plName: string;

    constructor(private loader: DefaultPlLoaderService,
                private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private zone: NgZone,
                private router: Router) {
    }

    ngOnInit() {
        this.loader.supportedIRI = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
        this.plName = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
        this.loader.loadContentFromStore()
            .then(result => {
                this.patterns = Array.from(result.entries());
                this.cdr.detectChanges();
            });
    }

    navigateBack(): void {
        this.zone.run(() => {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }

}

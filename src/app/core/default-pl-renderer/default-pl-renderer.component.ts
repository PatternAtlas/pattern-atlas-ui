import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IriConverter } from '../util/iri-converter';

@Component({
    selector: 'pp-default-pl-renderer',
    templateUrl: './default-pl-renderer.component.html',
    styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {

    patterns: any;
  plIri: string;
    plName: string;

    constructor(private loader: DefaultPlLoaderService,
                private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private zone: NgZone,
                private router: Router) {
    }

    ngOnInit() {
        this.loader.supportedIRI = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
      this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
      this.plName = IriConverter.extractIndividualNameFromIri(this.plIri);
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

  goToPatternCreation() {
    this.zone.run(() => {
      this.router.navigate(['create-pattern'], {relativeTo: this.activatedRoute});
    });
  }

}

import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UriConverter } from '../util/uri-converter';
import { MatDialog } from '@angular/material';
import { CompletePatternlanguage } from '../model/complete-patternlanguage.interface';
import Pattern from '../model/pattern.model';
import PatternLanguage from '../model/pattern-language.model';

@Component({
    selector: 'pp-default-pl-renderer',
    templateUrl: './default-pl-renderer.component.html',
    styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {

    patterns: Pattern[] = [];
    patternLanguage: PatternLanguage;
    plIri: string;
    plName: string;
    isLoading = true;


    constructor(private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private zone: NgZone,
                private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        // this.loader.supportedIRI = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('plid'));
        this.plIri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('plid'));
        this.plName = UriConverter.extractIndividualNameFromIri(this.plIri);

        this.loadData();
    }


    navigate(pattern: Pattern): void {
        this.zone.run(() => {
            this.router.navigate([UriConverter.doubleEncodeUri(pattern.uri)], {relativeTo: this.activatedRoute});
        });
    }

    goToPatternCreation() {
        this.zone.run(() => {
            this.router.navigate(['create-patterns'], {relativeTo: this.activatedRoute});
        });
    }


    getSectionName(patternSection: string) {
        return UriConverter.getSectionName(patternSection);
    }

    loadData() {
        // this.completePatternLanguageLoadingService.loadCompletePatternLanguage(this.plIri).then(
        //     (completePL: CompletePatternlanguage) => {
        //         this.patterns = completePL.patterns;
        //         this.patternLanguage = completePL.patternlanguage;
        //         this.isLoading = false;
        //         this.cdr.detectChanges();
        //     });
    }

}

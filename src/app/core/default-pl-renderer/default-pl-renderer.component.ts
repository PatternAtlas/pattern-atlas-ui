import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material';
import Pattern from '../model/pattern.model';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/new/pattern-language.model';

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
  patternLanguageURI: string;


    constructor(private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private zone: NgZone,
                private router: Router,
                private dialog: MatDialog,
                private patternLanguageService: PatternLanguageService) {
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
      this.patternLanguageURI = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('plEncodedUri'));
      if (this.patternLanguageURI) {
        this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageURI).subscribe(
          (patternlanguage) => {
            this.patternLanguage = patternlanguage;
            this.isLoading = false;
          });
      }
    }

}

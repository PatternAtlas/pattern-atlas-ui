import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IriConverter } from '../util/iri-converter';
import { MatDialog } from '@angular/material';
import { LoadCompletePatternlanguageService } from '../service/loader/complete-patternlanguage-loader.service';
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


  constructor(private loader: DefaultPlLoaderService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private zone: NgZone,
              private router: Router,
              private completePatternLanguageLoadingService: LoadCompletePatternlanguageService,
              private dialog: MatDialog) {
    }

    ngOnInit() {
      this.loader.supportedIRI = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
      this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
      this.plName = IriConverter.extractIndividualNameFromIri(this.plIri);

      this.loadData();
    }


  navigate(pattern: Pattern): void {
    this.zone.run(() => {
      this.router.navigate([IriConverter.convertIriToId(pattern.iri)], {relativeTo: this.activatedRoute});
    });
  }

  goToPatternCreation() {
    this.zone.run(() => {
      this.router.navigate(['create-pattern'], {relativeTo: this.activatedRoute});
    });
  }


  getSectionName(patternSection: string) {
    return IriConverter.getSectionName(patternSection);
  }

  loadData() {
    this.completePatternLanguageLoadingService.loadCompletePatternLanguage(this.plIri).then(
      (completePL: CompletePatternlanguage) => {
        this.patterns = completePL.patterns;
        this.patternLanguage = completePL.patternlanguage;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

}

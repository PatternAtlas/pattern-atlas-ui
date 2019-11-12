import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material';
import Pattern from '../model/pattern.model';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';

@Component({
    selector: 'pp-default-pl-renderer',
    templateUrl: './default-pl-renderer.component.html',
    styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {

    patterns: Pattern[] = [];
    patternLanguage: PatternLanguage;
    isLoading = true;
    patternLanguageURI: string;
  @ViewChild('graphWrapper') graph: ElementRef;


  constructor(private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private zone: NgZone,
                private router: Router,
                private dialog: MatDialog,
                private patternLanguageService: PatternLanguageService) {
    }

    ngOnInit() {
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


  private loadData(): void {
        this.patternLanguageURI = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageUri'));
        if (this.patternLanguageURI) {
            this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageURI).subscribe(
                (patternlanguage) => {
                    this.patternLanguage = patternlanguage;
                    this.isLoading = false;
                  this.initGraph();
                });


        }
    }

  private initGraph(): void {

    this.patternLanguage.patterns.forEach((pat: Pattern, index) => this.graph.nativeElement.addNode({
        id: index,
        title: pat.name,
        type: 'red',
        x: (index % 5) * 110,
        y: (Math.floor(index / 5) * 50)
      },
      true));
  }
}

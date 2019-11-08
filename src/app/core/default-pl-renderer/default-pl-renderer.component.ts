import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UriConverter } from '../util/uri-converter';
import Pattern from '../model/pattern.model';
import PatternLanguage from '../model/new/pattern-language.model';
import { PatternLanguageService } from '../service/pattern-language.service';

@Component({
    selector: 'pp-default-pl-renderer',
    templateUrl: './default-pl-renderer.component.html',
    styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {

    patterns: Pattern[] = [];
    patternLanguage: PatternLanguage;
    isLoading = true;

    constructor(private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private zone: NgZone,
                private router: Router,
                private patternLanguageService: PatternLanguageService) {
    }

    async ngOnInit() {
        this.patternLanguage = await this.patternLanguageService
            .getPatternLanguageByEncodedUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageUri'));
        this.isLoading = false;
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
}

import {Component, Input, NgZone, OnInit} from '@angular/core';
import Pattern from '../../model/pattern.model';
import {UriConverter} from '../../util/uri-converter';
import {ActivatedRoute, Router} from '@angular/router';
import PatternLanguage from '../../model/hal/pattern-language.model';

@Component({
  selector: 'pp-cardrenderer',
  templateUrl: './cardrenderer.component.html',
  styleUrls: ['./cardrenderer.component.scss']
})
export class CardrendererComponent implements OnInit {

  constructor(   private zone: NgZone,
                 private router: Router,
                 private activatedRoute: ActivatedRoute) { }

  patternlanguage: PatternLanguage;
  ngOnInit() {
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

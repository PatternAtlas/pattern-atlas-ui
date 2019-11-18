import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import Pattern from '../../model/pattern.model';
import {UriConverter} from '../../util/uri-converter';
import {ActivatedRoute, Router} from '@angular/router';
import PatternLanguage from '../../model/hal/pattern-language.model';
import UriEntity from '../../model/hal/uri-entity.model';

@Component({
  selector: 'pp-cardrenderer',
  templateUrl: './cardrenderer.component.html',
  styleUrls: ['./cardrenderer.component.scss']
})
export class CardrendererComponent implements OnInit {

  constructor(   private zone: NgZone,
                 private router: Router,
                 private activatedRoute: ActivatedRoute) { }

  @Input() uriEntities: UriEntity[];

  @Output() createEntityClicked: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit() {
  }

  navigate(pattern: UriEntity): void {
    this.zone.run(() => {
      this.router.navigate([UriConverter.doubleEncodeUri(pattern.uri)], {relativeTo: this.activatedRoute});
    });
  }

  goToPatternCreation() {
    this.createEntityClicked.emit();
  }

}

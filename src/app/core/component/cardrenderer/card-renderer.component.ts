import {Component, EventEmitter, Input, NgZone, Output} from '@angular/core';
import {UriConverter} from '../../util/uri-converter';
import {ActivatedRoute, Router} from '@angular/router';
import UriEntity from '../../model/hal/uri-entity.model';
import Pattern from '../../model/hal/pattern.model';
import {HalLink} from '../../model/hal/hal-link.interface';
import {PatternService} from '../../service/pattern.service';

@Component({
  selector: 'pp-card-renderer',
  templateUrl: './card-renderer.component.html',
  styleUrls: ['./card-renderer.component.scss']
})
export class CardRendererComponent {

  @Input() uriEntities: Array<Pattern>;
  @Output() createEntityClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private zone: NgZone,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private patternService: PatternService) {
  }

  navigate(pattern: UriEntity): void {
    this.zone.run(() => {
      this.router.navigate([UriConverter.doubleEncodeUri(pattern.uri)], {relativeTo: this.activatedRoute});
    });
  }

  delete(pattern: Pattern): void {
    this.patternService.deletePattern(pattern._links.self.href)._subscribe();
  }

  getLinkCount(directedEdges: HalLink[] | HalLink): number {
    if (!directedEdges) {
      return 0;
    }
    return Array.isArray(directedEdges) ? directedEdges.length : 1;
  }
}

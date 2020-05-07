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
    this.patternService.deletePattern(pattern._links.self.href)
      .subscribe(
        value => this.handlePatternDelete(pattern),
        error => {
          console.log(`Delete unsuccessful! ${error}`);
        }
      );
  }

  getLinkCount(directedEdges: HalLink[] | HalLink): number {
    if (!directedEdges) {
      return 0;
    }
    return Array.isArray(directedEdges) ? directedEdges.length : 1;
  }

  /**
   * This method is called when the pattern is successfully deleted by the pattern service.
   * It removes the selected pattern from the uriEntities, and
   * removes all edges from all other patterns where the pattern to delete
   * is part of the edge.
   * This method is only used to update the rendered information in the frontend.
   *
   * @param pattern: The pattern which is deleted.
   */
  private handlePatternDelete(pattern: Pattern): void {
    this.uriEntities = this.uriEntities.filter(value => value !== pattern);
    let allEdgesToRemove: HalLink[] = [];
    const allEdgesToRemoveHref: String[] = [];
    if (pattern._links.outgoingDirectedEdges) {
      Array.isArray(pattern._links.outgoingDirectedEdges) ? allEdgesToRemove = [...allEdgesToRemove, ...pattern._links.outgoingDirectedEdges] :
        allEdgesToRemove.push(pattern._links.outgoingDirectedEdges);
    }
    if (pattern._links.ingoingDirectedEdges) {
      Array.isArray(pattern._links.ingoingDirectedEdges) ? allEdgesToRemove = [...allEdgesToRemove, ...pattern._links.ingoingDirectedEdges] :
        allEdgesToRemove.push(pattern._links.ingoingDirectedEdges);
    }
    if (pattern._links.undirectedEdges) {
      Array.isArray(pattern._links.undirectedEdges) ? allEdgesToRemove = [...allEdgesToRemove, ...pattern._links.undirectedEdges] :
        allEdgesToRemove.push(pattern._links.undirectedEdges);
    }
    allEdgesToRemove.forEach(link => allEdgesToRemoveHref.push(link.href));
    this.uriEntities.forEach(otherPattern => {
      if (otherPattern._links.outgoingDirectedEdges) {
        if (Array.isArray(otherPattern._links.outgoingDirectedEdges)) {
          otherPattern._links.outgoingDirectedEdges = otherPattern._links.outgoingDirectedEdges
            .filter(removeEdge => !(allEdgesToRemoveHref.includes(removeEdge.href)));
        } else {
          if (allEdgesToRemoveHref.includes(otherPattern._links.outgoingDirectedEdges.href)) {
            otherPattern._links.outgoingDirectedEdges = undefined;
          }
        }
      }
      if (otherPattern._links.ingoingDirectedEdges) {
        if (Array.isArray(otherPattern._links.ingoingDirectedEdges)) {
          otherPattern._links.ingoingDirectedEdges = otherPattern._links.ingoingDirectedEdges
            .filter(removeEdge => !(allEdgesToRemoveHref.includes(removeEdge.href)));
        } else {
          if (allEdgesToRemoveHref.includes(otherPattern._links.ingoingDirectedEdges.href)) {
            otherPattern._links.ingoingDirectedEdges = undefined;
          }
        }
      }
      if (otherPattern._links.undirectedEdges) {
        if (Array.isArray(otherPattern._links.undirectedEdges)) {
          otherPattern._links.undirectedEdges = otherPattern._links.undirectedEdges
            .filter(removeEdge => !(allEdgesToRemoveHref.includes(removeEdge.href)));
        } else {
          if (allEdgesToRemoveHref.includes(otherPattern._links.undirectedEdges.href)) {
            otherPattern._links.undirectedEdges = undefined;
          }
        }
      }
    });
  }
}

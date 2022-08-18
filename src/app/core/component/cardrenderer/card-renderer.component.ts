import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import UriEntity from '../../model/hal/uri-entity.model';
import Pattern from '../../model/hal/pattern.model';
import { HalLink } from '../../model/hal/hal-link.interface';
import { PatternService } from '../../service/pattern.service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UiFeatures } from '../../directives/pattern-atlas-ui-repository-configuration.service';
import { PrivilegeService } from '../../../authentication/_services/privilege.service';

@Component({
  selector: 'pp-card-renderer',
  templateUrl: './card-renderer.component.html',
  styleUrls: ['./card-renderer.component.scss']
})
export class CardRendererComponent {

  readonly UiFeatures = UiFeatures;
  @Input() uriEntities: Array<Pattern>;
  @Input() showLinks = true;
  @Output() createEntityClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private zone: NgZone,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private patternService: PatternService,
              private toasterService: ToasterService,
              private dialog: MatDialog,
              private p: PrivilegeService) {
  }

  navigate(pattern: UriEntity): void {
    this.zone.run(() => {
      this.router.navigate([pattern.id], { relativeTo: this.activatedRoute });
    });
  }

  delete(pattern: Pattern): void {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        name: pattern.name,
      }
    })
      .afterClosed().subscribe(dialoganswer => {
        if (dialoganswer) {
          this.patternService.deletePattern(pattern._links.self.href)
            .subscribe(
              value => {
                this.handlePatternDelete(pattern);
                this.toasterService.pop('success', 'Pattern deleted!');
              },
              error => {
                this.toasterService.pop('error', 'Could not delete pattern!', 'A Pattern can only be deleted if it is not a part of any Pattern Views');
              }
            );
        }
      });

  }

  getLinkCount(directedEdges: HalLink[] | HalLink): number {
    if (!directedEdges) {
      return 0;
    }
    return Array.isArray(directedEdges) ? directedEdges.length : 1;
  }

  private collectAllEdgesOfPattern(pattern: Pattern): HalLink[] {
    let collectedEdges: HalLink[] = [];
    if (pattern._links.outgoingDirectedEdges) {
      Array.isArray(pattern._links.outgoingDirectedEdges) ? collectedEdges = [...collectedEdges, ...pattern._links.outgoingDirectedEdges] :
        collectedEdges.push(pattern._links.outgoingDirectedEdges);
    }
    if (pattern._links.ingoingDirectedEdges) {
      Array.isArray(pattern._links.ingoingDirectedEdges) ? collectedEdges = [...collectedEdges, ...pattern._links.ingoingDirectedEdges] :
        collectedEdges.push(pattern._links.ingoingDirectedEdges);
    }
    if (pattern._links.undirectedEdges) {
      Array.isArray(pattern._links.undirectedEdges) ? collectedEdges = [...collectedEdges, ...pattern._links.undirectedEdges] :
        collectedEdges.push(pattern._links.undirectedEdges);
    }
    return collectedEdges;
  }

  private deleteEdgesFromDeletedPattern(edgesToRemove: string []): void {
    this.uriEntities.forEach(otherPattern => {
      if (otherPattern._links.outgoingDirectedEdges) {
        if (Array.isArray(otherPattern._links.outgoingDirectedEdges)) {
          otherPattern._links.outgoingDirectedEdges = otherPattern._links.outgoingDirectedEdges
            .filter(removeEdge => !(edgesToRemove.includes(removeEdge.href)));
        } else {
          if (edgesToRemove.includes(otherPattern._links.outgoingDirectedEdges.href)) {
            otherPattern._links.outgoingDirectedEdges = undefined;
          }
        }
      }
      if (otherPattern._links.ingoingDirectedEdges) {
        if (Array.isArray(otherPattern._links.ingoingDirectedEdges)) {
          otherPattern._links.ingoingDirectedEdges = otherPattern._links.ingoingDirectedEdges
            .filter(removeEdge => !(edgesToRemove.includes(removeEdge.href)));
        } else {
          if (edgesToRemove.includes(otherPattern._links.ingoingDirectedEdges.href)) {
            otherPattern._links.ingoingDirectedEdges = undefined;
          }
        }
      }
      if (otherPattern._links.undirectedEdges) {
        if (Array.isArray(otherPattern._links.undirectedEdges)) {
          otherPattern._links.undirectedEdges = otherPattern._links.undirectedEdges
            .filter(removeEdge => !(edgesToRemove.includes(removeEdge.href)));
        } else {
          if (edgesToRemove.includes(otherPattern._links.undirectedEdges.href)) {
            otherPattern._links.undirectedEdges = undefined;
          }
        }
      }
    });
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
    this.uriEntities = this.uriEntities.filter(value => value.uri !== pattern.uri);
    let allEdgesToRemove: HalLink[];
    const allEdgesToRemoveHref: string[] = [];
    allEdgesToRemove = this.collectAllEdgesOfPattern(pattern);
    allEdgesToRemove.forEach(link => allEdgesToRemoveHref.push(link.href));
    this.deleteEdgesFromDeletedPattern(allEdgesToRemoveHref);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { PAEvidence, RatingEventModel, RatingModelRequest } from '../../shared';
import { EvidenceDialogComponent } from '../evidence-dialog/evidence-dialog.component';

@Component({
  selector: 'pp-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss']
})
export class EvidenceListComponent {

  @Input() disabled: boolean;
  @Input() evidences: PAEvidence[];
  @Output() createEvidenceEvent: EventEmitter<PAEvidence> = new EventEmitter<PAEvidence>();
  @Output() updateEvidenceEvent: EventEmitter<PAEvidence> = new EventEmitter<PAEvidence>();
  @Output() deleteEvidenceEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() ratingEvent: EventEmitter<RatingEventModel> = new EventEmitter<RatingEventModel>();

  constructor(
    public dialog: MatDialog,
    public auth: AuthenticationService,
  ) { }


  newEvidence() {
    this.auth.user.subscribe(_user => {
      if (!_user) {
        return;
      }
      let confirmDialog = this.dialog.open(EvidenceDialogComponent, {
        data: new PAEvidence(_user.id)
      });

      confirmDialog.afterClosed().subscribe(result => {
        if (result) {
          this.createEvidenceEvent.next(result);
        }
      });
    })
  }

  detail(evidence: PAEvidence) {
    let confirmDialog = this.dialog.open(EvidenceDialogComponent, {
      data: evidence
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result.id) {
        this.updateEvidenceEvent.next(result)
      } else if (result) {
        this.deleteEvidenceEvent.next(result);
      }
    });
  }

  updateRating(ratingRequest: RatingModelRequest, evidence: PAEvidence) {
    this.ratingEvent.next(new RatingEventModel(ratingRequest, evidence));
  }
}

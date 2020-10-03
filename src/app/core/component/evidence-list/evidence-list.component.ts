import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { PAEvidence } from '../../shared';
import { EvidenceDialogComponent } from '../evidence-dialog/evidence-dialog.component';

@Component({
  selector: 'pp-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss']
})
export class EvidenceListComponent implements OnInit {

  @Input() evidences: PAEvidence[];
  @Input() evidenceEntity: any;
  @Input() context: number;
  @Output() createEvidenceEvent: EventEmitter<PAEvidence> = new EventEmitter<PAEvidence>();
  @Output() updateEvidenceEvent: EventEmitter<PAEvidence> = new EventEmitter<PAEvidence>();
  @Output() deleteEvidenceEvent: EventEmitter<String> = new EventEmitter<String>();

  constructor(
    public dialog: MatDialog,
    public auth: AuthenticationService,
  ) { }

  ngOnInit(): void {

    // const a = new PAEvidence('');
    // const b = new PAEvidence('');
    // a.title = 'Title 1';
    // a.supporting = true;
    // a.userName = 'MEMBER1';
    // this.evidences = [a, a, b];
  }

  newEvidence() {
    this.auth.user.subscribe(_user => {
      if (_user) {
        let confirmDialog = this.dialog.open(EvidenceDialogComponent, {
          data: new PAEvidence(_user.id)
        });
    
        confirmDialog.afterClosed().subscribe(result => {
          console.log(result);
          if (result) {
            console.log(result);
            this.createEvidenceEvent.next(result);
          }
        });
      }
    })
  }

  detail(evidence: PAEvidence) {
    console.log(evidence);
    let confirmDialog = this.dialog.open(EvidenceDialogComponent, {
      data: evidence
    });

    confirmDialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result.id) {
        console.log('delete: ', result);
        this.updateEvidenceEvent.next(result)
      } else if (result) {
        this.deleteEvidenceEvent.next(result);
      }
    });
  }
}

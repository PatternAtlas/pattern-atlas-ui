import { Component, OnInit, Inject } from '@angular/core';
import { Issue } from '../issue-management.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  description: string;
  name: string;
}

@Component({
  selector: 'pp-issue-create-dialog',
  templateUrl: './issue-create-dialog.component.html',
  styleUrls: ['./issue-create-dialog.component.scss']
})
export class IssueCreateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<IssueCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue) {}

  cancel(): void {
    this.dialogRef.close();
  }

}

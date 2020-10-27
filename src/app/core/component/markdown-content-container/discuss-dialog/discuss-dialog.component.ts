import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pp-discuss-dialog',
  templateUrl: './discuss-dialog.component.html',
  styleUrls: ['./discuss-dialog.component.scss']
})
export class DiscussDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DiscussDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteComment(): void {
    this.data.isDelete = true;
    this.dialogRef.close(this.data);
  }
}

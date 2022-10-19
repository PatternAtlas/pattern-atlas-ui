import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pp-textfield-dialog',
  templateUrl: './textfield-dialog.component.html',
  styleUrls: ['./textfield-dialog.component.scss']
})
export class TextfieldDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TextfieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

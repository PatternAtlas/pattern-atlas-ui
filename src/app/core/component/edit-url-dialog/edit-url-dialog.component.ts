import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UiFeatures } from '../../directives/pattern-atlas-ui-repository-configuration.service';
import Pattern from '../../model/hal/pattern.model';

@Component({
  selector: 'pp-edit-url-dialog',
  templateUrl: './edit-url-dialog.component.html',
  styleUrls: ['./edit-url-dialog.component.scss']
})
export class EditUrlDialogComponent {

  readonly UiFeatures = UiFeatures;

  constructor(
    public dialogRef: MatDialogRef<EditUrlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      pattern: Pattern
    }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

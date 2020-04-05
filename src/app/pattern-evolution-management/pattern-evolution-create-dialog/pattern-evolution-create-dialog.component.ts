import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatternEvolution } from '../pattern-evolution.service';

export interface DialogData {
  description: string;
  name: string;
}

@Component({
  selector: 'pp-pattern-evolution-create-dialog',
  templateUrl: './pattern-evolution-create-dialog.component.html',
  styleUrls: ['./pattern-evolution-create-dialog.component.scss']
})
export class PatternEvolutionCreateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PatternEvolutionCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatternEvolution) {}

  cancel(): void {
    this.dialogRef.close();
  }

}

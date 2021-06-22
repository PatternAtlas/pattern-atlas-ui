import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pp-select-pattern-dialog',
  templateUrl: './select-pattern-dialog.component.html',
  styleUrls: ['./select-pattern-dialog.component.scss']
})
export class SelectPatternDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectPatternDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _fb: FormBuilder) {
  }

  selectedPatternForm: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.selectedPatternForm = this._fb.group({
      selectedPattern: ['', [Validators.required]]
    });
  }

}

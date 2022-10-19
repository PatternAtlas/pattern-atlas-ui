import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pp-implementation-dialog',
  templateUrl: './implementation-dialog.component.html',
  styleUrls: ['./implementation-dialog.component.scss']
})
export class ImplementationDialogComponent implements OnInit {

  implementationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ImplementationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {
    this.implementationForm = this.fb.group({
      type: [this.data ? this.data.type : '', [Validators.required]],
      link: [this.data ? this.data.link : '', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

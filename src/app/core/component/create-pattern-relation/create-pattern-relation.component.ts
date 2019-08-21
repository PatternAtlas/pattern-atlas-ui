import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PatternInstance } from '../../model/PatternInstance.interface';
import Pattern from '../../model/pattern.model';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'pp-create-pattern-relation',
  templateUrl: './create-pattern-relation.component.html',
  styleUrls: ['./create-pattern-relation.component.scss']
})



export class CreatePatternRelationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreatePatternRelationComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) {
  }

  patterns: Pattern[];
  types = [{name: 'directed_right', icon: 'trending_flat'}, {name: 'directed_left', icon: 'trending_flat'}, {name: 'undirected', icon: 'compare_arrows'}];
  typeForm = new FormControl();


  ngOnInit() {
  console.log(this.data);
  }

  close(): void {
    this.dialogRef.close();
  }

}
export interface DialogData {
  patternName: string;
  type?: string;
  selectedPattern: PatternInstance;
  patterns: Pattern[];
}

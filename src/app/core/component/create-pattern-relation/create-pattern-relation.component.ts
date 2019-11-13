import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PatternInstance} from '../../model/PatternInstance.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatternRelationDescriptorDirection} from '../../model/pattern-relation-descriptor-direction.enum';
import Pattern from '../../model/hal/pattern.model';

@Component({
  selector: 'pp-create-pattern-relation',
  templateUrl: './create-pattern-relation.component.html',
  styleUrls: ['./create-pattern-relation.component.scss']
})



export class CreatePatternRelationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreatePatternRelationComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) {
  }

  directionEnum = PatternRelationDescriptorDirection;
  patterns: Pattern[];
  types = [{name: PatternRelationDescriptorDirection.DirectedRight, icon: 'trending_flat'},
    {name: PatternRelationDescriptorDirection.DirectedLeft, icon: 'trending_flat'}, {
      name: PatternRelationDescriptorDirection.UnDirected,
      icon: 'compare_arrows'
    }];
  relationForm: FormGroup;
  relationTypes = ['isRelatedTo', 'isUsedBefore', 'isUsedAfter', 'dependsOn', 'canBeUsedWith',
    'cannotBeUsedWith', 'consistsOf', 'uses', 'usedIn', 'isAlternativeTo', 'isVariationOf'];


  ngOnInit() {
    this.relationForm = this.fb.group({
      toPattern: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      relationType: ['', [Validators.required]],
      description: ['', []],
    });
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

export interface PatternRelationDirection {
  name: PatternRelationDescriptorDirection;
  icon: string; // angular material icon name
}

export interface DialogDataResult {
  direction: PatternRelationDirection;
  toPattern: Pattern;
  description?: string;
  relationType?: string;
}



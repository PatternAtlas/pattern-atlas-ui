import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternRelationDescriptorDirection } from '../../model/pattern-relation-descriptor-direction.enum';
import Pattern from '../../model/hal/pattern.model';
import { DirectedEdgeModel } from '../../model/hal/directed-edge.model';
import { UndirectedEdgeModel } from '../../model/hal/undirected-edge.model';
import { PatternContainer } from '../../model/hal/pattern-container.model';
import PatternLanguage from '../../model/hal/pattern-language.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'pp-create-pattern-relation',
  templateUrl: './create-pattern-relation.component.html',
  styleUrls: ['./create-pattern-relation.component.scss']
})

/**
 * This dialog is getting used to
 *    1. Create new relations
 *    2. Edit existing relations (isDelete = true)
 *    3. Delete existing relations (isDelete = true)
 */
export class CreatePatternRelationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreatePatternRelationComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) {
  }

  isDelete: boolean;
  directionEnum = PatternRelationDescriptorDirection;
  patterns: Pattern[];
  directionTypes = [
    { name: PatternRelationDescriptorDirection.DirectedRight, icon: 'trending_flat' },
    { name: PatternRelationDescriptorDirection.DirectedLeft, icon: 'trending_flat' },
    { name: PatternRelationDescriptorDirection.UnDirected, icon: 'sync_alt' }
  ];
  relationForm: FormGroup;
  relationTypes = [
    // Fallback values, can be overwritten by providing an Observable as data.relationTypes
    'isRelatedTo',
    'isUsedBefore',
    'isUsedAfter',
    'dependsOn',
    'canBeUsedWith',
    'cannotBeUsedWith',
    'consistsOf',
    'uses',
    'usedIn',
    'isAlternativeTo',
    'isVariationOf'
  ];

  private subscriptionRefs = [];

  ngOnInit() {
    let preselectedEdgeDirection;
    try {
      preselectedEdgeDirection = this.directionTypes.filter(type => type.name === this.data.preselectedEdgeDirection)[0];
    } catch (e) {
    }

    if (this.data.description === undefined) {
      this.data.description = '';
    }
    this.isDelete = this.data.isDelete; // set view to delete/edit instead of create
    this.relationForm = this.fb.group({
      firstPattern: [this.data.firstPattern, [Validators.required]],
      secondPattern: [this.data.secondPattern, [Validators.required]],
      direction: [preselectedEdgeDirection, [Validators.required]],
      relationType: [this.data.relationType, [Validators.required]],
      description: [this.data.description, []],
    });
    if (this.data.relationTypes) {
      this.subscriptionRefs.push(this.data.relationTypes.subscribe(relationTypes => this.relationTypes = relationTypes));
    }
  }

  close(): void {
    this.dialogRef.close();
    this.subscriptionRefs.forEach(subscription => subscription.unsubscribe());
  }

  // adds a relation created by the dialog to the local data and returns whether this was successful (or not, e.g. when
  // simply closing the dialog)
  mapDialogDataToEdge(dialogResult: DialogDataResult): DirectedEdgeModel | UndirectedEdgeModel {
    if (!dialogResult || !dialogResult.secondPattern || !dialogResult.direction) {
      return null;
    }
    const type = dialogResult.relationType ? dialogResult.relationType : null;
    const description = dialogResult.description ? dialogResult.description : null;
    dialogResult.firstPattern.id = this.data.callerPatternId;
    switch (dialogResult.direction.name) {
      case PatternRelationDescriptorDirection.DirectedRight:
        return new DirectedEdgeModel(dialogResult.firstPattern, dialogResult.secondPattern, this.data.patternLanguage, description, type,
          this.data.patternContainer);
      case PatternRelationDescriptorDirection.DirectedLeft:
        return new DirectedEdgeModel(dialogResult.secondPattern, dialogResult.firstPattern, this.data.patternLanguage, description, type,
          this.data.patternContainer);
      case PatternRelationDescriptorDirection.UnDirected:
        return new UndirectedEdgeModel(dialogResult.secondPattern, dialogResult.firstPattern, this.data.patternLanguage, description, type,
          this.data.patternContainer);
    }
    return null;

  }

  /**
   * called when delete button is pressed --> delete Link
   */
  deleteLink() {
    this.data.deleteLink = true;
  }
}

export interface DialogData {
  relationType: string;
  description: string;
  callerPatternId: string;
  firstPattern?: Pattern;
  secondPattern?: Pattern;
  preselectedEdgeDirection?: PatternRelationDescriptorDirection;
  patterns: Pattern[];
  patternLanguage: PatternLanguage;
  patternContainer: PatternContainer;
  relationTypes?: Observable<string[]>;
  isDelete: boolean;   // delete button toggle
  deleteLink: boolean; // set true if delete button pressed
}

export interface PatternRelationDirection {
  name: PatternRelationDescriptorDirection;
  icon: string; // angular material icon name
}

export interface DialogDataResult {
  firstPattern: Pattern;
  direction: PatternRelationDirection;
  relationType?: string;
  secondPattern: Pattern;
  description?: string;
}

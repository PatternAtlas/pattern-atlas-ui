import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatternRelationDescriptorDirection} from '../../model/pattern-relation-descriptor-direction.enum';
import Pattern from '../../model/hal/pattern.model';
import {DirectedEdge} from '../../model/hal/directed-edge.model';
import {UndirectedEdge} from '../../model/hal/undirected-edge.model';
import {PatternView} from '../../model/hal/pattern-view.model';
import PatternLanguage from '../../model/hal/pattern-language.model';

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
            firstPattern: ['', [Validators.required]],
            secondPattern: ['', [Validators.required]],
            direction: ['', [Validators.required]],
            relationType: ['', [Validators.required]],
            description: ['', []],
        });

        if (this.data.firstPattern) {
            this.relationForm.get('firstPattern').setValue(this.data.firstPattern);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    // adds a relation created by the dialog to the local data and returns whether this was successful (or not, e.g. when simply closing the dialog)
    mapDialogDataToEdge(dialogResult: DialogDataResult): DirectedEdge | UndirectedEdge {
        if (!dialogResult || !dialogResult.secondPattern || !dialogResult.direction) {
            return null;
        }
        const type = dialogResult.relationType ? dialogResult.relationType : null;
        const description = dialogResult.description ? dialogResult.description : null;
        switch (dialogResult.direction.name) {
            case PatternRelationDescriptorDirection.DirectedRight:
                return new DirectedEdge(dialogResult.firstPattern, dialogResult.secondPattern, this.data.patternLanguage, description, type,
                    this.data.patternView);
            case PatternRelationDescriptorDirection.DirectedLeft:
                return new DirectedEdge(dialogResult.secondPattern, dialogResult.firstPattern, this.data.patternLanguage, description, type,
                    this.data.patternView);
            case PatternRelationDescriptorDirection.UnDirected:
                return new UndirectedEdge(dialogResult.secondPattern, dialogResult.firstPattern, this.data.patternLanguage, description, type,
                    this.data.patternView);
        }
        return null;

    }

}

export interface DialogData {
    firstPattern: Pattern;
    patterns: Pattern[];
    patternLanguage: PatternLanguage;
    patternView: PatternView;
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



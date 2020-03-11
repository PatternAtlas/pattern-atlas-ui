import {Component, Inject, OnInit} from '@angular/core';
import {CreatePatternRelationComponent, DialogData} from '../create-pattern-relation/create-pattern-relation.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DirectedEdgeModel} from '../../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../../model/hal/undirected-edge.model';
import {EdgeWithType, PatternRelationDescriptorService} from '../../service/pattern-relation-descriptor.service';
import {HalLink} from '../../model/hal/hal-link.interface';

@Component({
    selector: 'pp-delete-pattern-relation',
    templateUrl: './delete-pattern-relation.component.html',
    styleUrls: ['./delete-pattern-relation.component.scss']
})
export class DeletePatternRelationComponent implements OnInit {

    relationForm: FormGroup;
    currentEdges: Array<EdgeWithType> = [];
    selectedEdge: EdgeWithType;

    constructor(public dialogRef: MatDialogRef<CreatePatternRelationComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder,
                private patternRelationDescriptorService: PatternRelationDescriptorService) {
        this.getEdgesForPattern();
    }

    ngOnInit() {
        this.relationForm = this.fb.group({
            selectedEdge: ['', [Validators.required]]
        });

        if (this.data.selectedEdge) {
            this.relationForm.get('selectedEdge').setValue(this.data.selectedEdge);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    // adds a relation created by the dialog to the local data and returns whether this was successful (or not, e.g. when simply closing the dialog)
    mapDialogDataToEdge(dialogResult: DialogDataResult): DirectedEdgeModel | UndirectedEdgeModel {
        if (!dialogResult || !dialogResult.selectedEdge) {
            return null;
        }
        return dialogResult.selectedEdge;

    }

    private getEdgesForPattern(): void {
        let links = [];
        if (!this.data.edges.length) {
            links[0] = this.data.edges;
        } else {
            links = this.data.edges;
        }
        for (const link of links) {
            this.patternRelationDescriptorService.getUndirectedEdgeByUrl(link.href).subscribe(
                data => {
                    this.currentEdges.push(data);
                }
            );
        }
    }

}

export interface DialogData {
    edges: any[];
    type: string;
    selectedEdge: any;
}

export interface DialogDataResult {
    selectedEdge: any;
}

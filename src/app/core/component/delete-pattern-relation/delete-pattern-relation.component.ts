import {Component, Inject, OnInit} from '@angular/core';
import {CreatePatternRelationComponent, DialogData} from '../create-pattern-relation/create-pattern-relation.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EdgeWithType, PatternRelationDescriptorService} from '../../service/pattern-relation-descriptor.service';
import {PatternViewService} from '../../service/pattern-view.service';
import {ToasterService} from 'angular2-toaster';
import {DirectedEdgeModel} from '../../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../../model/hal/undirected-edge.model';

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
                private patternRelationDescriptorService: PatternRelationDescriptorService,
                private patternViewService: PatternViewService, private toasterService: ToasterService) {
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

    deleteEdge(edge: DirectedEdgeModel | UndirectedEdgeModel): void {
        this.patternViewService.deleteLink(edge._links.self.href).subscribe(
            (res) => {
                this.currentEdges = this.currentEdges.filter(item => item !== edge);
                this.toasterService.pop('success', 'Relation removed');
                if (this.currentEdges.length === 0) {
                    this.dialogRef.close();
                }
            }
        );
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
                    console.log(typeof this.currentEdges);
                }
            );
        }
    }

}

export interface DialogData {
    edges: DirectedEdgeModel[] | UndirectedEdgeModel[];
    type: string;
    selectedEdge: DirectedEdgeModel | UndirectedEdgeModel;
}

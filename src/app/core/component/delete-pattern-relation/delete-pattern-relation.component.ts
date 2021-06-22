import { Component, Inject, OnInit } from '@angular/core';
import { CreatePatternRelationComponent } from '../create-pattern-relation/create-pattern-relation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EdgeWithType, PatternRelationDescriptorService } from '../../service/pattern-relation-descriptor.service';
import { PatternViewService } from '../../service/pattern-view.service';
import { ToasterService } from 'angular2-toaster';
import { HalLink } from '../../model/hal/hal-link.interface';

@Component({
  selector: 'pp-delete-pattern-relation',
  templateUrl: './delete-pattern-relation.component.html',
  styleUrls: ['./delete-pattern-relation.component.scss']
})
export class DeletePatternRelationComponent implements OnInit {

  currentEdges: Array<EdgeWithType> = [];

  constructor(public dialogRef: MatDialogRef<CreatePatternRelationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeleteRelationDialogData,
              private patternRelationDescriptorService: PatternRelationDescriptorService,
              private patternViewService: PatternViewService, private toasterService: ToasterService) {
    this.getEdgesForPattern();
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
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
          const edgeWithType: EdgeWithType = new EdgeWithType();
          edgeWithType.edge = data;
          edgeWithType.type = data.type;
          this.currentEdges.push(edgeWithType);
        }
      );
    }
  }

}

export interface DeleteRelationDialogData {
  deleteEdge: EdgeWithType;
  edges: HalLink[];
  type: string;
}

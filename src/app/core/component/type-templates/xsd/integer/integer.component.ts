import { Component, OnInit } from '@angular/core';
import { DataRenderingComponent } from '../../interfaces/DataRenderingComponent.interface';
import { DialogData, MdEditorComponent } from '../../../md-editor/md-editor.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'pp-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss']
})
export class IntegerComponent implements OnInit, DataRenderingComponent {
  
  data: any;

  showActionButtons = false;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openEditor(): void {
    const dialogRef = this.dialog.open(MdEditorComponent,
      {data: {content: this.data}});
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
    });
  }
}

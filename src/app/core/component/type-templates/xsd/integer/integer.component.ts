import { Component, OnInit } from '@angular/core';
import { DataRenderingComponent } from '../../interfaces/DataRenderingComponent.interface';
import { DialogData, MdEditorComponent } from '../../../md-editor/md-editor.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'pp-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss']
})
export class IntegerComponent extends DataRenderingComponent implements OnInit {

  data: any;

  title = '';

  showActionButtons = false;

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  openEditor(): void {
    const dialogRef = this.dialog.open(MdEditorComponent,
      {data: {content: this.data, field: this.title}});
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
    });
  }
}

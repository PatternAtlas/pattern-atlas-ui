///<reference path="../../interfaces/DataRenderingComponent.interface.ts"/>
import { Component, EventEmitter, OnInit } from '@angular/core';
import { DataRenderingComponent } from '../../interfaces/DataRenderingComponent.interface';
import { DialogData, MdEditorComponent } from '../../../md-editor/md-editor.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'pp-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent extends DataRenderingComponent implements OnInit {
  data: any;

  title = '';

  showActionButtons = false;

  constructor(private dialog: MatDialog) {
    super();
    this.changeContent = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  openEditor(): void {
    const dialogRef = this.dialog.open(MdEditorComponent,
      {data: {content: this.data}});
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      console.log(result);
      this.changeContent.emit(result.content);
    });
  }

}

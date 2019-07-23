import { Component, OnInit } from '@angular/core';
import { DataRenderingComponent } from '../../interfaces/DataRenderingComponent.interface';
import { DialogData, MdEditorComponent } from '../../../md-editor/md-editor.component';

@Component({
  selector: 'pp-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent extends DataRenderingComponent implements OnInit {
  data: any;
  title = '';
  showActionButtons = false;

  constructor() {
    super();
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

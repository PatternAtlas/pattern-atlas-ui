import { Component, OnInit } from '@angular/core';
import { DataRenderingComponent } from '../../interfaces/DataRenderingComponent.interface';
import { DialogData, MdEditorComponent } from '../../../md-editor/md-editor.component';

@Component({
  selector: 'pp-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss']
})
export class IntegerComponent extends DataRenderingComponent implements OnInit {

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

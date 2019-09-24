import { Component, EventEmitter, OnInit } from '@angular/core';
import { DataRenderingComponent } from '../interfaces/DataRenderingComponent.interface';
import { MatDialog } from '@angular/material';
import { DialogData, MdEditorComponent } from '../../md-editor/md-editor.component';

@Component({
  selector: 'pp-markdown-pattern-sectioncontent',
  templateUrl: './markdown-pattern-sectioncontent.component.html',
  styleUrls: ['./markdown-pattern-sectioncontent.component.scss']
})
export class MarkdownPatternSectioncontentComponent extends DataRenderingComponent  implements OnInit {
  data: string;

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
      {data: {content: this.data, field: this.title}});
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      this.changeContent.emit(result.content);
    });
  }

}

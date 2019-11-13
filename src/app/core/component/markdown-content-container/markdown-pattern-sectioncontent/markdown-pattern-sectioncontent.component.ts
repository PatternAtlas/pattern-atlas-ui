import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {DataRenderingComponent} from '../interfaces/DataRenderingComponent.interface';
import {MatDialog} from '@angular/material';
import {DialogData, MdEditorComponent} from '../../md-editor/md-editor.component';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katex';

@Component({
  selector: 'pp-markdown-pattern-sectioncontent',
  templateUrl: './markdown-pattern-sectioncontent.component.html',
  styleUrls: ['./markdown-pattern-sectioncontent.component.scss']
})
export class MarkdownPatternSectioncontentComponent extends DataRenderingComponent  implements OnInit {
  data: string;

  title = '';

  showActionButtons = false;
  private markdown: MarkdownIt;
  @ViewChild('markdownContent') markdownDiv: ElementRef;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {
    super();
    this.changeContent = new EventEmitter<string>();
  }

  ngOnInit() {
    this.markdown = new MarkdownIt();
    this.markdown.use(markdownitKatex);
    this.markdownDiv.nativeElement.innerHTML = this.markdown.render(this.data);
    this.cdr.detectChanges();
  }

  openEditor(): void {
    const dialogRef = this.dialog.open(MdEditorComponent,
      {data: {content: this.data, field: this.title}});
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      this.changeContent.emit(result.content);
    });
  }

}

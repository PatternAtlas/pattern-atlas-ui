import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {DataChange, DataRenderingComponent} from '../interfaces/DataRenderingComponent.interface';
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
  @Input() content: string;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {
    super();
    this.changeContent = new EventEmitter<DataChange>();
  }

  ngOnInit() {
    this.markdown = new MarkdownIt();
    this.markdown.use(markdownitKatex);
    this.changeText(this.data);
  }

  changeText(value: string): void {
    this.data = value;
    this.markdownDiv.nativeElement.innerHTML = this.markdown.render(this.data);
    this.cdr.detectChanges();
  }

  openEditor(): void {
    const dialogRef = this.dialog.open(MdEditorComponent,
      {data: {content: this.data, field: this.title}});
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      const previousValue = this.data;
      if (result) {
        this.data = result.content;
        this.changeText(this.data);
      }
      this.changeContent.emit({previousValue: previousValue, currentValue: result.content});
    });
  }

}

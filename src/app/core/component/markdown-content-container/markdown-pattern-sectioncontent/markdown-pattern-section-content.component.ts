import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, ViewChild} from '@angular/core';
import {DataChange, DataRenderingComponent} from '../interfaces/DataRenderingComponent.interface';
import {MatDialog} from '@angular/material/dialog';
import {DialogData, MdEditorComponent} from '../../md-editor/md-editor.component';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katex';
import {OnInit, OnChanges} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {ConfigService} from '../../../service/config.service';

@Component({
  selector: 'pp-markdown-pattern-section-content',
  templateUrl: './markdown-pattern-section-content.component.html',
  styleUrls: ['./markdown-pattern-section-content.component.scss']
})
export class MarkdownPatternSectionContentComponent extends DataRenderingComponent implements AfterViewInit, OnChanges, OnInit {

  data: string;
  title = '';

  showActionButtons = false;
  @ViewChild('markdownContent') markdownDiv: ElementRef;
  @Input() content: string;
  private markdown: MarkdownIt;


  constructor(public cs: ConfigService, private dialog: MatDialog, private cdr: ChangeDetectorRef) {
    super();
    this.changeContent = new EventEmitter<DataChange>();
  }

  mathJaxObject = null;

  ngOnInit() {
    this.loadMathConfig();
    this.renderMath();
  }

  ngAfterViewInit() {
    this.markdown = new MarkdownIt();
    this.markdown.use(markdownitKatex);
    this.changeText(this.data);
    console.log(this.content);
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

  ngOnChanges(changes: SimpleChanges) {
    // to render math equations again on content change
    if (changes['content']) {
      this.renderMath();
    }
  }


  updateMathObt() {
    this.mathJaxObject = this.cs.nativeGlobal()['MathJax'];
  }

  renderMath() {
    this.updateMathObt();
    const angObj = this;
    setTimeout(() => {
      angObj.mathJaxObject['Hub'].Queue(['Typeset', angObj.mathJaxObject.Hub], 'mathContent');
    }, 1000);
  }

  loadMathConfig() {
    this.updateMathObt();
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']]},
      menuSettings: {zoom: 'Double-Click', zscale: '150%'},
      CommonHTML: {linebreaks: {automatic: true}},
      'HTML-CSS': {linebreaks: {automatic: true}},
      SVG: {linebreaks: {automatic: true}}
    });
  }
}

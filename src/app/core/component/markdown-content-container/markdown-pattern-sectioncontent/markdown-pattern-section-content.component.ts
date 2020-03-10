import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, ViewChild} from '@angular/core';
import {DataChange, DataRenderingComponent} from '../interfaces/DataRenderingComponent.interface';
import {MatDialog} from '@angular/material/dialog';
import {DialogData, MdEditorComponent} from '../../md-editor/md-editor.component';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katex';
import {AlgorithmDetectionService} from '../../../service/algorithm-detection.service';
import {AlgorithmType} from '../../../model/algorithm-type.enum';

@Component({
  selector: 'pp-markdown-pattern-section-content',
  templateUrl: './markdown-pattern-section-content.component.html',
  styleUrls: ['./markdown-pattern-section-content.component.scss']
})
export class MarkdownPatternSectionContentComponent extends DataRenderingComponent implements AfterViewInit {

  data: string;
  title = '';

  showActionButtons = false;
  @ViewChild('markdownContent') markdownDiv: ElementRef;
  @Input() content: string;
  private markdown: MarkdownIt;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef, private algoService: AlgorithmDetectionService) {
    super();
    this.changeContent = new EventEmitter<DataChange>();
  }

  ngAfterViewInit() {
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
        console.log(this.data);
        //check if includes gatter
        if (this.algoService.checkForAlgorithmInput(this.data) === AlgorithmType.QUANTIKZ) {
          //save Gatter
          console.log("includes gatter");
        }
        this.data = result.content;
        this.changeText(this.data);
      }

      const content = this.data
      console.log(content.slice(content.indexOf('\\begin{quantikz}'), content.indexOf('\\end{quantikz}') + 15));
      this.changeContent.emit({previousValue: previousValue, currentValue: result.content});
    });
  }
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {DataChange, DataRenderingComponent} from '../interfaces/DataRenderingComponent.interface';
import {MatDialog} from '@angular/material/dialog';
import {DialogData, MdEditorComponent} from '../../md-editor/md-editor.component';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katex';
import {ImageService} from '../../../service/image.service';


@Component({
  selector: 'pp-markdown-pattern-section-content',
  templateUrl: './markdown-pattern-section-content.component.html',
  styleUrls: ['./markdown-pattern-section-content.component.scss']
})
export class MarkdownPatternSectionContentComponent extends DataRenderingComponent implements AfterViewInit, OnDestroy {

  data: string;
  renderedData: string;
  title = '';
  mouseDown = false;
  last: MouseEvent;


  showActionButtons = false;
  @ViewChild('markdownContent') markdownDiv: ElementRef;
  @Input() content: string;
  private markdown: MarkdownIt;

  constructor(private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private imageService: ImageService
  ) {
    super();
    this.changeContent = new EventEmitter<DataChange>();
    this.imageService = imageService;
  }

  ngAfterViewInit() {
    this.markdown = new MarkdownIt();
    this.markdown.use(markdownitKatex);
    this.changeText(this.renderedData ? this.renderedData : this.data);
  }

  changeText(value: string): void {
    this.markdownDiv.nativeElement.innerHTML = '';
    this.renderedData = value;
    this.renderSVGTags(value);
    this.cdr.detectChanges();
  }

  renderSVGTags(data: string): void {
    let editData = data;
    if (!data) {
      return;
    }
    const svgIndexes: number[] = this.getNextOccurance(editData, '<SVG>', '</SVG>');
    if (svgIndexes.length > 0 && svgIndexes[0] !== -1 && svgIndexes[1] !== -1) {
      // render elements before svg imgage link
      this.markdownDiv.nativeElement.innerHTML += this.markdown.render(editData.substring(0, svgIndexes[0] - 1));
      // get id for img on database
      const id = editData.substring(svgIndexes[0] + 5, svgIndexes[1]);
      // get image and add raw svg text to html
      this.imageService.getImageById(id)
        .subscribe(res => {
          this.markdownDiv.nativeElement.innerHTML += res;
          // cut off parts that were added to html and recursive call function to render the rest.
          editData = editData.slice(svgIndexes[1] + 6);
          this.renderSVGTags(editData);
        });
    } else {
      // if no svg tag remaining - render remaining elements
      this.markdownDiv.nativeElement.innerHTML += this.markdown.render(editData);
      // this.getSVG();
    }

  }

  openEditor(): void {
    const dialogRef = this.dialog.open(MdEditorComponent,
      { data: { content: this.data, field: this.title } });
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      const previousValue = this.data;

      if (result) {
        this.data = result.content;
        this.changeText(this.data);
      }
      this.changeContent.emit({ previousValue: previousValue, currentValue: result.content });
    });
  }

  getNextOccurance(content: string, begin: string, end: string): number[] {
    if (!content) {
      return [];
    }
    return [content.indexOf(begin, 0), content.indexOf(end, 0)];
  }

  ngOnDestroy() {
    this.cdr.detach(); // cancel the changes triggered by this.cdr.detectChanges()
  }


}

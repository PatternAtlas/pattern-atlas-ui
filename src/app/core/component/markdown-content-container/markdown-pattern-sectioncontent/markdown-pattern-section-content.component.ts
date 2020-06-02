import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import {DataChange, DataRenderingComponent} from '../interfaces/DataRenderingComponent.interface';
import {MatDialog} from '@angular/material/dialog';
import {DialogData, MdEditorComponent} from '../../md-editor/md-editor.component';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katex';
import {ImageService} from '../../../service/image.service';
import * as d3 from 'd3';
import {MatSnackBar} from '@angular/material/snack-bar';
import {select, event, Selection} from 'd3-selection';
import {Point} from '../../../model/svg-objects.interface';
import {CommentDialogComponent} from '../comment-dialog/comment-dialog.component';
import {DiscussDialogComponent} from '../discuss-dialog/discuss-dialog.component';


@Component({
  selector: 'pp-markdown-pattern-section-content',
  templateUrl: './markdown-pattern-section-content.component.html',
  styleUrls: ['./markdown-pattern-section-content.component.scss']
})
export class MarkdownPatternSectionContentComponent extends DataRenderingComponent implements AfterViewInit {

  data: string;
  renderedData: string;
  title = '';
  mouseDown = false;
  last: MouseEvent;
  private texts: any;
  svg: Selection<SVGSVGElement, any, any, any>;
  svgCommentMouseDownCoordinate;
  svgCommentMouseUpCoordinate;
  svgCommentStartCoordinates;
  svgCommentWidth;
  svgCommentHeight;
  comment;
  commentSvg: SVGSVGElement;

  isCommentingEnabled = false;
  showCommentButton = true;
  showActionButtons = false;
  @ViewChild('markdownContent') markdownDiv: ElementRef;
  @Input() content: string;
  private markdown: MarkdownIt;

  constructor(private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private imageService: ImageService,
              private snackBar: MatSnackBar
  ) {
    super();
    this.changeContent = new EventEmitter<DataChange>();
    this.imageService = imageService;
  }

  ngAfterViewInit() {
    this.markdown = new MarkdownIt();
    this.markdown.use(markdownitKatex);
    this.changeText(this.renderedData);
  }

  changeText(value: string): void {
    this.markdownDiv.nativeElement.innerHTML = '';
    this.renderedData = value;
    this.renderSVGTags(value);
    this.cdr.detectChanges();
  }

  renderSVGTags(data: string): void {
    let editData = data;
    const svgIndexes: number[] = this.getNextOccurance(editData, '<SVG>', '</SVG>');
    if (svgIndexes[0] !== -1 && svgIndexes[1] !== -1) {
      // render elements before svg imgage link
      this.markdownDiv.nativeElement.innerHTML += this.markdown.render(editData.substring(0, svgIndexes[0] - 1));
      // get id for img on database
      const id = editData.substring(svgIndexes[0] + 5, svgIndexes[1]);
      // get image and add raw svg text to html
      this.imageService.getImageById(id)
        .subscribe(res => {
          //adding svgDatabaseId to svg
          if (!res.includes('<svg id')) {
            let resIncId = res.substr(0, res.indexOf('<svg ') + 5)
              + 'id=\"' + id + '\" '
              + res.substr(res.indexOf('<svg ') + 5 , res.length - 1);
            console.log(resIncId)
            resIncId = resIncId.replace(new RegExp('glyph', 'g'), 'glyph' + id);
            console.log(resIncId);
            this.markdownDiv.nativeElement.innerHTML += resIncId;
          } else {
            this.markdownDiv.nativeElement.innerHTML += res;
          }
          // cut off parts that were added to html and recursive call function to render the rest.
          editData = editData.slice(svgIndexes[1] + 6);
          this.renderSVGTags(editData);
        });
    } else {
      // if no svg tag remaining - render remaining elements
      this.markdownDiv.nativeElement.innerHTML += this.markdown.render(editData);
      // console.log(this.markdownDiv.nativeElement.innerHTML);
      this.getSVG();
      // console.log('getsvg');
    }

  }

  openEditor(): void {
    const dialogRef = this.dialog.open(MdEditorComponent,
      {data: {content: this.data, field: this.title}});
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      const previousValue = this.data;

      if (result) {
        this.data = result.content;
        this.changeText(this.renderedData);
      }
      this.changeContent.emit({previousValue: previousValue, currentValue: result.content});
    });
  }

  getNextOccurance(content: string, begin: string, end: string): number[] {
    return [content.indexOf(begin, 0), content.indexOf(end, 0)];
  }

  private getSVG() {
    this.svg = d3.selectAll<SVGSVGElement, unknown>('svg').select( function () {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].id === 'surface1' && this.attributes.getNamedItem('resized') === null) {
          const width = d3.select(this).node().width.baseVal.valueInSpecifiedUnits;
          const height =  d3.select(this).node().height.baseVal.valueInSpecifiedUnits;
          d3.select(this).attr('width', width * 2)
            .attr('height', height * 2)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('resized', 'true');
        }
      }
        return this;
    });
    d3.selectAll<SVGSVGElement, unknown>('rect').on('click', (d, i, n) => {
      this.discuss(n[i]);
    });
    // const data = this.svg.append('data-test');
    // data.attr('name', 'test111')
    //   .attr('test', 5);
  }

  public getSVGPointFromClientCoordinates(clientPoint: Point): Point {
    // const ng = this.svg.select<SVGElement>('g.nodes');
    // const p = this.svg.node().createSVGPoint();
    const p = d3.select(this.commentSvg).node().createSVGPoint();
    p.x = clientPoint.x;
    p.y = clientPoint.y;
    return p.matrixTransform(this.commentSvg.getScreenCTM().inverse());
  }

  commentSVG() {
    const snackBarInstruction = this.snackBar.open('Mark area to comment in Picture', null, {duration: 3000});
    this.isCommentingEnabled = true;
    console.log(this.isCommentingEnabled);
    console.log(this.svg);


    this.svg.on('mousedown', (d, i, n) => {
      this.commentSvg = n[i];
      const x = event.x;
      const y = event.y;
      const point = {x, y};
      this.svgCommentMouseDownCoordinate = this.getSVGPointFromClientCoordinates(point);
      console.log('this div');
      console.log(n[i].parentNode.parentElement.id);
      console.log('commentSVG');
      console.log(d3.select(n[i]));
      console.log(this.svgCommentMouseDownCoordinate.x + ' ' + this.svgCommentMouseDownCoordinate.y);
    });

    this.svg.on('mouseup', (d, i, n) => {
      console.log(this.isCommentingEnabled);
      if (this.isCommentingEnabled === true) {
        const x = event.x;
        const y = event.y;
        const point = {x, y};
        this.svgCommentMouseUpCoordinate = this.getSVGPointFromClientCoordinates(point);
        if (this.svgCommentMouseDownCoordinate !== null && this.svgCommentMouseUpCoordinate !== null) {
          const startCoordinates = {x, y};
          if (this.svgCommentMouseDownCoordinate.x < this.svgCommentMouseUpCoordinate.x) {
            startCoordinates.x = this.svgCommentMouseDownCoordinate.x;
            this.svgCommentWidth = this.svgCommentMouseUpCoordinate.x - this.svgCommentMouseDownCoordinate.x;
          } else  {
            startCoordinates.x =  this.svgCommentMouseUpCoordinate.x;
            this.svgCommentWidth = this.svgCommentMouseDownCoordinate.x - this.svgCommentMouseUpCoordinate.x;
          }
          if (this.svgCommentMouseDownCoordinate.y < this.svgCommentMouseUpCoordinate.y) {
            startCoordinates.y = this.svgCommentMouseDownCoordinate.y;
            this.svgCommentHeight = this.svgCommentMouseUpCoordinate.y - this.svgCommentMouseDownCoordinate.y;
          } else  {
            startCoordinates.y =  this.svgCommentMouseUpCoordinate.y;
            this.svgCommentHeight = this.svgCommentMouseDownCoordinate.y - this.svgCommentMouseUpCoordinate.y;
          }
          this.svgCommentStartCoordinates =  startCoordinates;

          if (this.commentSvg === n[i] && n[i].parentNode.parentElement.id === this.title) {
            console.log(this.commentSvg);
            console.log(n[i]);
            this.isCommentingEnabled = false;
            this.addCommentText();
          }
        }
      }
    });
  }

  addCommentText(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '250px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result' + result);
      if (result !== undefined) {
        this.comment = result;
        this.drawRect();
      }
    });

  }

  drawRect() {
    if (d3.select(this.commentSvg).select('g[id=comments]').node() === null) {
    d3.select(this.commentSvg).append('g').attr('id', 'comments')
    .append('rect')
      .attr('x', this.svgCommentStartCoordinates.x)
      .attr('y', this.svgCommentStartCoordinates.y)
      .attr('width', this.svgCommentWidth)
      .attr('height', this.svgCommentHeight)
      .attr('fill', 'blue')
      .attr('opacity', '0.3')
      .on('click', (d, i, n) => {
        this.discuss(n[i]);
      })
      .append('svg:title')
      .text(this.comment);

    } else {
      d3.select(this.commentSvg).select('g[id=comments]').append('rect')
        .attr('x', this.svgCommentStartCoordinates.x)
        .attr('y', this.svgCommentStartCoordinates.y)
        .attr('width', this.svgCommentWidth)
        .attr('height', this.svgCommentHeight)
        .attr('fill', 'blue')
        .attr('opacity', '0.3')
        .on('click', (d, i, n) => {
          this.discuss(n[i]);
        })
        .append('svg:title')
        .text(this.comment);
    }
    const id = d3.select(this.commentSvg).node().id;
    const data = new Blob([d3.select(this.commentSvg).node().outerHTML], {type: 'image/svg+xml'});
    const image = {id, data};
    this.imageService.updateImage(image).subscribe();
  }

  private discuss(nElement: any) {
    let title = '';
    const comments: string[] = [];
    let isTitle = true;
    d3.select<SVGSVGElement, Node>(nElement).node().childNodes.forEach(node => {
      if (isTitle) {
        title = node.textContent;
        isTitle = false;
      } else {
        comments.push(node.textContent);
      }
    });
    console.log(comments);
    const dialogRef = this.dialog.open(DiscussDialogComponent, {
      width: '500px',
      data: {
        title: title,
        comments: comments,
        isDelete: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        if (result.isDelete) {
          const id = d3.select<SVGSVGElement, Node>(nElement).node().parentNode.parentElement.id;
          d3.select(nElement).remove();
          const data = new Blob([d3.select<SVGSVGElement, Node>('#' + id).node().outerHTML], {type: 'image/svg+xml'});
          const image = {id, data};
          this.imageService.updateImage(image).subscribe();
        }
        if (result.response !== undefined) {
          d3.select(nElement).append('comment').text(result.response);
          const id = d3.select<SVGSVGElement, Node>(nElement).node().parentNode.parentElement.id;
          const data = new Blob([d3.select<SVGSVGElement, Node>(nElement).node().parentNode.parentElement.outerHTML], {type: 'image/svg+xml'});
          const image = {id, data};
          this.imageService.updateImage(image).subscribe();
        }
      }
    });
  }
}

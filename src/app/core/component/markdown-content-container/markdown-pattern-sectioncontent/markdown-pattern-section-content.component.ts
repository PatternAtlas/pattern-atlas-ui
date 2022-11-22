import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { DataChange, DataRenderingComponent } from '../interfaces/DataRenderingComponent.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, MdEditorComponent } from '../../md-editor/md-editor.component';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katexx';
import { ImageService } from '../../../service/image.service';
import * as d3 from 'd3';
import { MatSnackBar } from '@angular/material/snack-bar';
import { event, Selection } from 'd3-selection';
import { Point } from '../../../model/svg-objects.interface';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { DiscussDialogComponent } from '../discuss-dialog/discuss-dialog.component';
import { DiscussionTopic } from '../../../model/discussion-topic';
import { DiscussionService } from '../../../service/discussion.service';
import { DiscussionComment } from '../../../model/discussion-comment';
import { ImageModel } from '../../../model/image-model';
import * as QuantumCircuit from 'quantum-circuit';
import {
  PatternAtlasUiRepositoryConfigurationService, UiFeatures
} from 'src/app/core/directives/pattern-atlas-ui-repository-configuration.service';

@Component({
  selector: 'pp-markdown-pattern-section-content',
  templateUrl: './markdown-pattern-section-content.component.html',
  styleUrls: ['./markdown-pattern-section-content.component.scss']
})
export class MarkdownPatternSectionContentComponent extends DataRenderingComponent implements AfterViewInit {
  data: string;
  renderedData: string;
  patternLanguageId: string;
  title = '';
  imageModels: ImageModel[] = [];
  svg: Selection<SVGSVGElement, any, any, any>;
  svgCommentMouseDownCoordinate;
  svgCommentMouseUpCoordinate;
  svgCommentStartCoordinates;
  svgCommentWidth;
  svgCommentHeight;
  comment;
  commentSvg: SVGSVGElement;
  readonly UiFeatures = UiFeatures;

  isCommentingEnabled = false;
  showCommentButton = true;
  showActionButtons = false;
  editingFromConfigServer = false;
  showSection = true;
  @ViewChild('markdownContent') markdownDiv: ElementRef;
  @Input() content: string;
  private markdown: MarkdownIt;

  constructor(private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private imageService: ImageService,
              private snackBar: MatSnackBar,
              private discussionService: DiscussionService,
              private configurationService: PatternAtlasUiRepositoryConfigurationService
  ) {
    super();
    this.changeContent = new EventEmitter<DataChange>();
    this.editingFromConfigServer = this.configurationService.configuration.features[UiFeatures.EDITING]
  }

  ngAfterViewInit() {
    this.markdown = new MarkdownIt();
    this.markdown.set({ breaks: true });
    this.markdown.use(markdownitKatex.default, { throwOnError: false, errorColor: ' #cc0000' });
    this.changeText(this.renderedData);
  }

  changeText(value?: string): void {
    this.markdownDiv.nativeElement.innerHTML = '';
    this.renderedData = value ?? '';
    this.showSection = this.renderedData && this.renderedData.length > 0;
    this.renderSVGTags(this.renderedData);

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
          const imageModel = new ImageModel(atob(res.body.image), res.body.topicModels, id);
          this.imageModels.push(imageModel);
          // adding svgDatabaseId to svg
          if (!imageModel.image.includes('<svg id')) {
            let resIncId = imageModel.image.substr(0, imageModel.image.indexOf('<svg ') + 5)
              + 'id=\"' + id + '\" '
              + imageModel.image.substr(imageModel.image.indexOf('<svg ') + 5, imageModel.image.length - 1);
            resIncId = resIncId.replace(new RegExp('glyph', 'g'), 'glyph' + id);
            resIncId = resIncId.replace(new RegExp('clip(?!Path)', 'g'), 'clip' + id);
            this.markdownDiv.nativeElement.innerHTML += resIncId;
          } else {
            this.markdownDiv.nativeElement.innerHTML += imageModel.image;
          }
          // cut off parts that were added to html and recursive call function to render the rest.
          editData = editData.slice(svgIndexes[1] + 6);
          this.renderSVGTags(editData);
        });
    } else {
      // if no svg tag remaining - render remaining elements
      this.markdownDiv.nativeElement.innerHTML += this.markdown.render(editData);
      this.renderQASM(this.markdownDiv.nativeElement.innerHTML);
      this.getSVG();
    }

  }

  openEditor(): void {
    const dialogRef = this.dialog.open(MdEditorComponent,
      { data: { content: this.data, field: this.title, patternLanguageId: this.patternLanguageId } });
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      const previousValue = this.data;

      if (result) {
        this.data = result.content;
        this.changeText(this.renderedData);
      }
      this.changeContent.emit({ previousValue: previousValue, currentValue: result.content });
    });
  }

  getNextOccurance(content: string, begin: string, end: string): number[] {
    return [content.indexOf(begin, 0), content.indexOf(end, content.indexOf(begin, 0))];
  }

  private getSVG() {
    this.svg = d3.selectAll<SVGSVGElement, unknown>('svg').select(function () {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].id === 'surface1' && this.attributes.getNamedItem('resized') === null) {
          const width = d3.select(this).node().width.baseVal.valueInSpecifiedUnits;
          const height = d3.select(this).node().height.baseVal.valueInSpecifiedUnits;
          d3.select(this).attr('width', width * 2)
            .attr('height', height * 2)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('resized', 'true');
        }
      }
      return this;
    });

    this.imageModels.forEach(model => {
      if (d3.select('[id="' + model.imageId + '"').select('g[id=comments]').node() === null) {
        d3.select('[id="' + model.imageId + '"').append('g').attr('id', 'comments');

        model.topicModels.forEach(topic => {
          d3.select('[id="' + model.imageId + '"').select('g[id=comments]').append('rect')
            .attr('id', topic.discussionTopic.id)
            .attr('x', topic.discussionTopic.x)
            .attr('y', topic.discussionTopic.y)
            .attr('width', topic.discussionTopic.width)
            .attr('height', topic.discussionTopic.height)
            .attr('fill', topic.discussionTopic.fill)
            .attr('opacity', '0.3')
            .append('svg:title')
            .text(topic.discussionTopic.title);
          topic.discussionComments.forEach(comment => {
            d3.select('[id="' + topic.discussionTopic.id + '"').append('comment').attr('id', comment.id).text(comment.text);
          });
        });
      }
    });

    d3.selectAll<SVGSVGElement, unknown>('rect').on('click', (d, i, n) => {
      this.discuss(n[i]);
    });
  }

  public getSVGPointFromClientCoordinates(clientPoint: Point): Point {
    const p = d3.select(this.commentSvg).node().createSVGPoint();
    p.x = clientPoint.x;
    p.y = clientPoint.y;
    return p.matrixTransform(this.commentSvg.getScreenCTM().inverse());
  }

  commentSVG() {
    const snackBarInstruction = this.snackBar.open('Mark area to comment in Picture', null, { duration: 3000 });
    this.isCommentingEnabled = true;

    this.svg.on('mousedown', (d, i, n) => {
      this.commentSvg = n[i];
      const x = event.x;
      const y = event.y;
      const point = { x, y };
      this.svgCommentMouseDownCoordinate = this.getSVGPointFromClientCoordinates(point);
    });

    this.svg.on('mouseup', (d, i, n) => {
      if (this.isCommentingEnabled === true) {
        const x = event.x;
        const y = event.y;
        const point = { x, y };
        this.svgCommentMouseUpCoordinate = this.getSVGPointFromClientCoordinates(point);
        if (this.svgCommentMouseDownCoordinate !== null && this.svgCommentMouseUpCoordinate !== null) {
          const startCoordinates = { x, y };
          if (this.svgCommentMouseDownCoordinate.x < this.svgCommentMouseUpCoordinate.x) {
            startCoordinates.x = this.svgCommentMouseDownCoordinate.x;
            this.svgCommentWidth = this.svgCommentMouseUpCoordinate.x - this.svgCommentMouseDownCoordinate.x;
          } else {
            startCoordinates.x = this.svgCommentMouseUpCoordinate.x;
            this.svgCommentWidth = this.svgCommentMouseDownCoordinate.x - this.svgCommentMouseUpCoordinate.x;
          }
          if (this.svgCommentMouseDownCoordinate.y < this.svgCommentMouseUpCoordinate.y) {
            startCoordinates.y = this.svgCommentMouseDownCoordinate.y;
            this.svgCommentHeight = this.svgCommentMouseUpCoordinate.y - this.svgCommentMouseDownCoordinate.y;
          } else {
            startCoordinates.y = this.svgCommentMouseUpCoordinate.y;
            this.svgCommentHeight = this.svgCommentMouseDownCoordinate.y - this.svgCommentMouseUpCoordinate.y;
          }
          this.svgCommentStartCoordinates = startCoordinates;

          if (this.commentSvg === n[i] && n[i].parentNode.parentElement.id === this.title) {
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
      if (result !== undefined) {
        this.comment = result;
        this.drawRect();
      }
    });

  }

  drawRect() {
    if (d3.select(this.commentSvg).select('g[id=comments]').node() === null) {
      d3.select(this.commentSvg).append('g').attr('id', 'comments');
    }
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

    const id = d3.select(this.commentSvg).node().id;
    const discussionTopic = new DiscussionTopic(this.comment, null, null, this.svgCommentStartCoordinates.x,
      this.svgCommentStartCoordinates.y, this.svgCommentWidth, this.svgCommentHeight, 'blue', id);
    this.discussionService.addTopic(discussionTopic).subscribe(value => {
      const children = d3.select<SVGSVGElement, Node>(this.commentSvg).select<SVGSVGElement>('g[id=comments]').node().children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].getAttribute('x') === this.svgCommentStartCoordinates.x.toString()
          && children[i].getAttribute('y') === this.svgCommentStartCoordinates.y.toString()) {
          children[i].id = value.body.id;
        }
      }
      const data = new Blob([d3.select(this.commentSvg).node().outerHTML], { type: 'image/svg+xml' });
      const image = { id, data };
      this.imageService.updateImage(image).subscribe();
    });

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
    const dialogRef = this.dialog.open(DiscussDialogComponent, {
      width: '500px',
      data: {
        title: title,
        comments: comments,
        isDelete: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.isDelete) {
          const topicId = d3.select<SVGSVGElement, Node>(nElement).node().id;
          const imageId = d3.select<SVGSVGElement, Node>(nElement).node().parentNode.parentElement.id;
          d3.select(nElement).remove();
          const data = new Blob([d3.select<SVGSVGElement, Node>('[id="' + imageId + '"').node().outerHTML], { type: 'image/svg+xml' });
          const image = { id: imageId, data };
          this.imageService.updateImage(image).subscribe();
          this.discussionService.deleteTopicById(topicId).subscribe();
        }
        if (result.response !== undefined) {
          const replyTo = d3.select<SVGSVGElement, Node>(nElement).node().lastElementChild.id;
          const topicId = d3.select<SVGSVGElement, Node>(nElement).node().id;
          const discussionComment = new DiscussionComment(result.response, replyTo, topicId);
          this.discussionService.addComment(discussionComment, topicId).subscribe(value => {
            d3.select(nElement).append('comment').attr('id', value.body.id).text(result.response);
            const id = d3.select<SVGSVGElement, Node>(nElement).node().parentNode.parentElement.id;
            const data = new Blob([d3.select<SVGSVGElement, Node>(nElement).node().parentNode.parentElement.outerHTML], { type: 'image/svg+xml' });
            const image = { id, data };
            this.imageService.updateImage(image).subscribe();
          });
        }
      }
    });
  }

  private renderQASM(content: string) {
    const qasmIndexes: number[] = this.getNextOccurance(content, 'OPENQASM 2.0;', 'end');
    if (qasmIndexes[0] !== -1 && qasmIndexes[1] !== -1) {
      const circuit = new QuantumCircuit();
      circuit.importQASM(content.substring(qasmIndexes[0], qasmIndexes[1])
        .replace(new RegExp('<p>', 'g'), ' ').replace(new RegExp('</p>', 'g'), ' '));
      circuit.run();
      const svg = circuit.exportSVG(true);
      const quirkData = circuit.exportQuirk(true);
      const quirkURL = 'http://algassert.com/quirk#circuit=' + JSON.stringify(quirkData).replace(new RegExp('"', 'g'), '&quot;');
      this.markdownDiv.nativeElement.innerHTML = this.markdownDiv.nativeElement.innerHTML.replace(content.substring(qasmIndexes[0], qasmIndexes[1] + 3),
        svg + ' ' +
        '<a href="' + quirkURL + '" target="_blank">Open Quirk</a>');
      this.renderQASM(this.markdownDiv.nativeElement.innerHTML);
    } else {
      this.checkEmptyInnerHTML();
    }
  }

  private checkEmptyInnerHTML() {
    if (this.markdownDiv.nativeElement.innerHTML.length === 0) {
      this.markdownDiv.nativeElement.innerHTML = this.markdown.render('Enter your input for this section here.');
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Node } from '../../model';

@Component({
  selector: '[nodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;

  @Output() clickEvent = new EventEmitter<Node>();
  @Output() mouseEnterEvent = new EventEmitter<Node>();
  @Output() mouseLeaveEvent = new EventEmitter<Node>();

  onClick(event: any) {
    event.stopPropagation();

    this.clickEvent.emit(this.node);
  }

  onMouseEnter(event: any) {
    this.mouseEnterEvent.emit(this.node);
  }

  onMouseLeave(event: any) {
    this.mouseLeaveEvent.emit(this.node);
  }
}

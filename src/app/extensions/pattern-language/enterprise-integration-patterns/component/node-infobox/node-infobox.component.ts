import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodeInfo } from '../../model';

@Component({
  selector: 'pp-node-infobox',
  templateUrl: './node-infobox.component.html',
  styleUrls: ['./node-infobox.component.scss']
})
export class NodeInfoboxComponent implements OnInit {

  @Input() info: NodeInfo;

  @Output() clickEvent = new EventEmitter<Node>();
  @Output() mouseEnterEvent = new EventEmitter<Node>();
  @Output() mouseLeaveEvent = new EventEmitter<Node>();


  onClick(event: any, node: Node) {
    event.stopPropagation();

    this.clickEvent.emit(node);
  }

  onMouseEnter(event: any, node: Node) {
    event.stopPropagation();

    this.mouseEnterEvent.emit(node);
  }

  onMouseLeave(event: any, node: Node) {
    event.stopPropagation();
    
    this.mouseLeaveEvent.emit(node);
  }

  constructor() { }

  ngOnInit() {
  }

}

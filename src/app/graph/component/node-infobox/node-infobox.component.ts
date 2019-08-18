import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NodeInfo, Relation } from '../../model';
import { IriConverter } from 'src/app/core/util/iri-converter';

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

  @Output() linkClickEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  outgoing(l: Array<Relation>) {
    return l.filter(i => i.direction === 'outgoing');
  }

  incoming(l: Array<Relation>) {
    return l.filter(i => i.direction === 'incoming');
  }

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

  onInfoClick(event: any/*, link: LinkInfo*/) {
    event.stopPropagation();

    this.linkClickEvent.emit(/*link.linkId*/);
  }
}

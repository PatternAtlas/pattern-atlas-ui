import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'pp-graph-display',
  templateUrl: './graph-display.component.html',
  styleUrls: ['./graph-display.component.scss']
})
export class GraphDisplayComponent implements OnInit {

  @ViewChild('graphWrapper') graph: ElementRef;
  @Input('nodes') set nodes(nodes: any[]){
    if(nodes){
    this.graph.nativeElement.setNodes(nodes, true);
    }
  }
  constructor() { }

  ngOnInit() {

  }

}

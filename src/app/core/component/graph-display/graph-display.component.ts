import {ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'pp-graph-display',
  templateUrl: './graph-display.component.html',
  styleUrls: ['./graph-display.component.scss']
})
export class GraphDisplayComponent implements OnInit, OnDestroy {

  @ViewChild('graphWrapper') graph: ElementRef;
  @ViewChild('svg') svg: ElementRef;
  @Input('nodes') set nodes(nodes: any[]){
    if(nodes){
    this.graph.nativeElement.setNodes(nodes, true);
    }
  }
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }


  ngOnDestroy() {

  }

  clear() {
    // TODO: Find a solution that works
  }
}

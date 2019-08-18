import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './component/graph/graph.component';
import { NodeVisualComponent } from './component/node-visual/node-visual.component';
import { LinkVisualComponent } from './component/link-visual/link-visual.component';
import { NodeInfoboxComponent } from './component/node-infobox/node-infobox.component';
import { LinkInfoboxComponent } from './component/link-infobox/link-infobox.component';
import { DraggableDirective } from './component/directives/draggable.directive';
import { ZoomableDirective } from './component/directives/zoomable.directive';

@NgModule({
  declarations: [GraphComponent, NodeVisualComponent, LinkVisualComponent, NodeInfoboxComponent, LinkInfoboxComponent, DraggableDirective, ZoomableDirective],
  imports: [
    CommonModule
  ],
  exports: [
    GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    NodeInfoboxComponent,
    DraggableDirective,
    ZoomableDirective
  ]
})
export class GraphModule { }

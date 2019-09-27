import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './component/graph/graph.component';
import { NodeVisualComponent } from './component/node-visual/node-visual.component';
import { LinkVisualComponent } from './component/link-visual/link-visual.component';
import { NodeInfoboxComponent } from './component/node-infobox/node-infobox.component';
import { LinkInfoboxComponent } from './component/link-infobox/link-infobox.component';
import { DraggableDirective } from './component/directives/draggable.directive';
import { ZoomableDirective } from './component/directives/zoomable.directive';
import { PatternGraphTemplateComponent } from './component/pattern-graph-template/pattern-graph-template.component';
import { DefaultPatternlanguageGraphComponent } from './component/default-patternlanguage-graph/default-patternlanguage-graph.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    NodeInfoboxComponent,
    LinkInfoboxComponent,
    DraggableDirective,
    ZoomableDirective,
    PatternGraphTemplateComponent,
    DefaultPatternlanguageGraphComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    GraphComponent,
    DefaultPatternlanguageGraphComponent
  ],
  entryComponents: [
    GraphComponent,
    DefaultPatternlanguageGraphComponent
  ]
})
export class GraphModule { }

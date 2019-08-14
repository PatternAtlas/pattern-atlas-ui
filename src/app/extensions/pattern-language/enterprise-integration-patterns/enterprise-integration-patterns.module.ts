import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';
import { IriConverter } from 'src/app/core/util/iri-converter';
import { EnterpriseIntegrationPatternsComponent } from './component/enterprise-integration-patterns/enterprise-integration-patterns.component';
import { GraphComponent } from './component/graph/graph.component';
import { LinkVisualComponent } from './component/link-visual/link-visual.component';
import { NodeVisualComponent } from './component/node-visual/node-visual.component';
import { NodeInfoboxComponent } from './component/node-infobox/node-infobox.component';
import { EnterpriseIntegrationPatternComponent } from './component/enterprise-integration-pattern/enterprise-integration-pattern.component';
import { EnterpriseIntegrationPatternsLoaderService } from './loader/enterprise-integration-patterns-loader.service';
import { MatButtonModule, MatIcon, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDividerModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LinkInfoboxComponent } from './component/link-infobox/link-infobox.component';
import { FilterViewComponent } from 'src/app/filter/component/filter-view/filter-view.component';

@NgModule({
  declarations: [
    EnterpriseIntegrationPatternsComponent, 
    GraphComponent, 
    LinkVisualComponent, 
    NodeVisualComponent, 
    NodeInfoboxComponent, 
    EnterpriseIntegrationPatternComponent, 
    LinkInfoboxComponent,
    FilterViewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [
    EnterpriseIntegrationPatternsLoaderService
  ],
  entryComponents: [
    EnterpriseIntegrationPatternsComponent,
    EnterpriseIntegrationPatternComponent,
    FilterViewComponent
  ]
})
export class EnterpriseIntegrationPatternsModule {
  constructor(private cr: ComponentRegistryService) {
    // register module as rendering for Enterprise Integration Patterns in registry
    this.cr.registerComponent(IriConverter.convertIriToId('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns'), {
      label: "Network Graph",
      priority: 10, // this is the main renderer for this language
      plcomponent: EnterpriseIntegrationPatternsComponent, // the rendering for the pattern LANGUAGE
      pcomponent: EnterpriseIntegrationPatternsComponent // TODO is this actually used?
    });

    // adding a secondary renderer (dummy)
    // this.cr.registerComponent(IriConverter.convertIriToId('https://purl.org/patternpedia/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns'), 
    //   this.cr.getPLRenderingComponents("default"));
  }
}

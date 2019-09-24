import { ZoomableDirective } from './../../../graph/component/directives/zoomable.directive';
import { GraphComponent } from './../../../graph/component/graph/graph.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';
import { IriConverter } from 'src/app/core/util/iri-converter';
import { EnterpriseIntegrationPatternsComponent } from './component/enterprise-integration-patterns/enterprise-integration-patterns.component';
import { EnterpriseIntegrationPatternComponent } from './component/enterprise-integration-pattern/enterprise-integration-pattern.component';
import { EnterpriseIntegrationPatternsLoaderService } from './loader/enterprise-integration-patterns-loader.service';
import { MatButtonModule, MatIcon, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDividerModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GraphModule } from 'src/app/graph/graph.module';
import { FilterModule } from 'src/app/filter/filter.module';

@NgModule({
  declarations: [
    EnterpriseIntegrationPatternsComponent,
    EnterpriseIntegrationPatternComponent
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
    MatCheckboxModule,
    GraphModule,
    FilterModule
  ],
  providers: [
    EnterpriseIntegrationPatternsLoaderService
  ],
  entryComponents: [
    EnterpriseIntegrationPatternsComponent,
    EnterpriseIntegrationPatternComponent
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

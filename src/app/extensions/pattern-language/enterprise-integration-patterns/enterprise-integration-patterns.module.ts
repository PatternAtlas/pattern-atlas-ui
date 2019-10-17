import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';
import { UriConverter } from 'src/app/core/util/uri-converter';
import { EnterpriseIntegrationPatternsComponent } from './component/enterprise-integration-patterns/enterprise-integration-patterns.component';
import { EnterpriseIntegrationPatternComponent } from './component/enterprise-integration-pattern/enterprise-integration-pattern.component';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';
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
    providers: [],
    entryComponents: [
        EnterpriseIntegrationPatternsComponent,
        EnterpriseIntegrationPatternComponent
    ]
})
export class EnterpriseIntegrationPatternsModule {
    constructor(private cr: ComponentRegistryService) {
        // register module as rendering for Enterprise Integration Patterns in registry
        // tslint:disable-next-line:max-line-length
        this.cr.registerComponent(UriConverter.doubleEncodeUri('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns'), {
            label: 'Network Graph',
            priority: 10, // this is the main renderer for this language
            plcomponent: EnterpriseIntegrationPatternsComponent, // the rendering for the patterns LANGUAGE
            pcomponent: EnterpriseIntegrationPatternsComponent // TODO is this actually used?
        });

        // adding a secondary renderer (dummy)
        // this.cr.registerComponent(UriConverter.doubleEncodeUri('https://purl.org/patternpedia/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns'),
        //   this.cr.getPLRenderingComponents("default"));
    }
}

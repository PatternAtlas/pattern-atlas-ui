import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';
import { EnterpriseIntegrationPatternsComponent } from './component/enterprise-integration-patterns/enterprise-integration-patterns.component';
import { EnterpriseIntegrationPatternComponent } from './component/enterprise-integration-pattern/enterprise-integration-pattern.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
        this.cr.registerComponent('https://patternpedia.org/patternlanguages/enterpriseintegrationpatterns', {
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

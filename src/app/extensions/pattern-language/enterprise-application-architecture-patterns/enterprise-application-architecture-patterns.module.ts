import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { EnterpriseApplicationArchitecturePatternsComponent } from './component/enterprise-application-architecture-patterns/enterprise-application-architecture-patterns.component';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';
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
        EnterpriseApplicationArchitecturePatternsComponent
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
    entryComponents: [
        EnterpriseApplicationArchitecturePatternsComponent
    ]
})
export class EnterpriseApplicationArchitecturePatternsModule {
    constructor(private cr: ComponentRegistryService) {
        // register module as rendering for Enterprise Integration Patterns in registry
        // tslint:disable-next-line: max-line-length
        this.cr.registerComponent('https://patternpedia.org/patternlanguages/enterpriseapplicationarchitecturepatterns', {
            label: 'Network Graph',
            priority: 10, // this is the main renderer for this language
            plcomponent: EnterpriseApplicationArchitecturePatternsComponent, // the rendering for the patterns LANGUAGE
            pcomponent: EnterpriseApplicationArchitecturePatternsComponent
        });
    }
}

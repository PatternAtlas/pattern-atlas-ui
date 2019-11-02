/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudComputingPatternsComponent } from './component/cloud-computing-patterns/cloud-computing-patterns.component';
import { ComponentRegistryService } from '../../../core/service/component-registry.service';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CloudComputingPatternComponent } from './component/cloud-computing-pattern/cloud-computing-pattern.component';
import { UriConverter } from '../../../core/util/uri-converter';
import { NgxMdModule } from 'ngx-md';
import { CoreModule } from '../../../core/core.module';
import { CloudComputingPatternsGraphComponent } from './component/cloud-computing-patterns-graph/cloud-computing-patterns-graph.component';
import { GraphModule } from 'src/app/graph/graph.module';
import { FilterModule } from 'src/app/filter/filter.module';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatIconModule,
        NgxMdModule.forRoot(),
        CoreModule,
        RouterModule,
        GraphModule,
        FilterModule
    ],
    declarations: [
        CloudComputingPatternComponent,
        CloudComputingPatternsComponent,
        CloudComputingPatternsGraphComponent
    ],
    providers: [],
    exports: [],
    entryComponents: [
        CloudComputingPatternComponent,
        CloudComputingPatternsComponent,
        CloudComputingPatternsGraphComponent
    ]
})
export class CloudComputingPatternsModule {
    constructor(private cr: ComponentRegistryService) {
        this.cr.registerComponent(UriConverter.doubleEncodeUri('https://patternpedia.org/patternlanguages/cloudcomputingpatterns'), {
            plcomponent: CloudComputingPatternsComponent,
            pcomponent: CloudComputingPatternComponent,
            label: 'Cards'
        });

        this.cr.registerComponent(UriConverter.doubleEncodeUri('https://patternpedia.org/patternlanguages/cloudcomputingpatterns'), {
            plcomponent: CloudComputingPatternsGraphComponent,
            pcomponent: CloudComputingPatternsGraphComponent,
            label: 'Network Graph'
        });
    }
}

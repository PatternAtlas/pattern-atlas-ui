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
import { CloudComputingPatternsLoaderService } from './loader/cloud-computing-patterns-loader.service';
import { CloudComputingPatternsComponent } from './component/cloud-computing-patterns/cloud-computing-patterns.component';
import { ComponentRegistryService } from '../../../core/service/component-registry.service';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CloudComputingPatternComponent } from './component/cloud-computing-pattern/cloud-computing-pattern.component';
import { IriConverter } from '../../../core/util/iri-converter';
import { NgxMdModule } from 'ngx-md';
import { CloudComputingPatternsWriterService } from './writer/cloud-computing-patterns-writer.service';
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
    providers: [
        CloudComputingPatternsLoaderService,
        CloudComputingPatternsWriterService
    ],
    exports: [],
    entryComponents: [
        CloudComputingPatternComponent,
        CloudComputingPatternsComponent,
        CloudComputingPatternsGraphComponent
    ]
})
export class CloudComputingPatternsModule {
    constructor(private cr: ComponentRegistryService) {
      this.cr.registerComponent(IriConverter.convertIriToId('https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#CloudComputingPatterns'), {
          plcomponent: CloudComputingPatternsComponent,
          pcomponent: CloudComputingPatternComponent,
          label: 'Cards'
        }); // tslint:disable-line:max-line-length

      this.cr.registerComponent(IriConverter.convertIriToId('https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns#CloudComputingPatterns'), {
          plcomponent: CloudComputingPatternsGraphComponent,
          pcomponent: CloudComputingPatternsGraphComponent,
          label: 'Network Graph'
      }); // tslint:disable-line:max-line-length
    }
}

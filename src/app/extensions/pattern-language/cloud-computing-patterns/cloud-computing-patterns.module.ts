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
import { LoaderRegistryService } from '../../../core/service/loader/pattern-language-loader/loader-registry.service';
import { PatternOntologyService } from '../../../core/service/pattern-ontology.service';
import { CloudComputingPatternsLoader } from './loader/cloud-computing-patterns-loader';
import { CloudComputingPatternsComponent } from './component/cloud-computing-patterns/cloud-computing-patterns.component';
import { ComponentRegistryService } from '../../../core/service/component-registry.service';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CloudComputingPatternComponent } from './component/cloud-computing-pattern/cloud-computing-pattern.component';
import { IriConverter } from '../../../core/util/iri-converter';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        RouterModule
    ],
    declarations: [
        CloudComputingPatternComponent,
        CloudComputingPatternsComponent
    ],
    providers: [
        CloudComputingPatternsLoader
    ],
    exports: [],
    entryComponents: [
        CloudComputingPatternComponent,
        CloudComputingPatternsComponent
    ]
})
export class CloudComputingPatternsModule {
    constructor(private cr: ComponentRegistryService) {
        this.cr.registerComponent(IriConverter.convertIriToId('http://purl.org/patternpedia/cloudcomputingpatterns#CloudComputingPatterns'), {plcomponent: CloudComputingPatternsComponent, pcomponent: CloudComputingPatternComponent}); // tslint:disable-line:max-line-length
    }
}

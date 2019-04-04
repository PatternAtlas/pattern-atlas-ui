/*
 * Copyright (c) 2019 University of Stuttgart.
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
import { InternetOfThingsPatternsLoaderService } from './loader/internet-of-things-patterns-loader.service';
import { InternetOfThingsPatternsComponent } from './component/internet-of-things-patterns/internet-of-things-patterns.component';
import { ComponentRegistryService } from '../../../core/service/component-registry.service';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { InternetOfThingsPatternComponent } from './component/internet-of-things-pattern/internet-of-things-pattern.component';
import { IriConverter } from '../../../core/util/iri-converter';
import { NgxMdModule } from 'ngx-md';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CoreModule } from '../../../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatFormFieldModule,
        TextFieldModule,
        NgxMdModule.forRoot(),
        CoreModule,
        RouterModule
    ],
    declarations: [
        InternetOfThingsPatternComponent,
        InternetOfThingsPatternsComponent
    ],
    providers: [
        InternetOfThingsPatternsLoaderService
    ],
    exports: [],
    entryComponents: [
        InternetOfThingsPatternComponent,
        InternetOfThingsPatternsComponent
    ]
})
export class InternetOfThingsPatternsModule {
    constructor(private cr: ComponentRegistryService) {
        this.cr.registerComponent(IriConverter.convertIriToId('http://purl.org/patternpedia/internetofthingspatterns#InternetOfThingsPatterns'), {
            plcomponent: InternetOfThingsPatternsComponent,
            pcomponent: InternetOfThingsPatternComponent
        }); // tslint:disable-line:max-line-length
    }
}

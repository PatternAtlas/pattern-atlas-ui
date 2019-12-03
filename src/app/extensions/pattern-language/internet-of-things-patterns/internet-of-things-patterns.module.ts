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
import { InternetOfThingsPatternsComponent } from './component/internet-of-things-patterns/internet-of-things-patterns.component';
import { ComponentRegistryService } from '../../../core/service/component-registry.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { InternetOfThingsPatternComponent } from './component/internet-of-things-pattern/internet-of-things-pattern.component';
import { NgxMdModule } from 'ngx-md';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CoreModule } from '../../../core/core.module';
import { InternetOfThingsPatternsGraphComponent } from './component/internet-of-things-patterns-graph/internet-of-things-patterns-graph.component';
import { GraphModule } from 'src/app/graph/graph.module';

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
        RouterModule,
        GraphModule
    ],
    declarations: [
        InternetOfThingsPatternComponent,
        InternetOfThingsPatternsComponent,
        InternetOfThingsPatternsGraphComponent
    ],
    providers: [],
    exports: [],
    entryComponents: [
        InternetOfThingsPatternComponent,
        InternetOfThingsPatternsComponent,
        InternetOfThingsPatternsGraphComponent
    ]
})
export class InternetOfThingsPatternsModule {
    constructor(private cr: ComponentRegistryService) {
        // tslint:disable-next-line:max-line-length
        this.cr.registerComponent('https://patternpedia.org/patternlanguages/internetofthingspatterns', {
            plcomponent: InternetOfThingsPatternsGraphComponent,
            pcomponent: InternetOfThingsPatternsGraphComponent,
            label: 'Network Graph'
        }); // tslint:disable-line:max-line-length
    }
}

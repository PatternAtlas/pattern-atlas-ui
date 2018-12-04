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
import { PatternOntologyService } from './service/pattern-ontology.service';
import { LoaderRegistryService } from './service/loader/pattern-language-loader/loader-registry.service';
import { DefaultPlRendererComponent } from './default-pl-renderer/default-pl-renderer.component';
import { DefaultPatternRendererComponent } from './default-pattern-renderer/default-pattern-renderer.component';
import { ComponentRegistryService } from './service/component-registry.service';
import { LinkedOpenPatternsLoader } from './service/loader/pattern-language-loader/linked-open-patterns-loader.service';
import {PrettyJsonModule} from 'angular2-prettyjson';
import { MatButtonModule } from '@angular/material';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
    imports: [
        CommonModule,
        PrettyJsonModule,
        MatButtonModule,
        TextFieldModule
    ],
    exports: [],
    providers: [
        PatternOntologyService,
        LinkedOpenPatternsLoader
    ],
    declarations: [
        DefaultPlRendererComponent,
        DefaultPatternRendererComponent
    ],
    entryComponents: [
        DefaultPlRendererComponent,
        DefaultPatternRendererComponent
    ]
})
export class CoreModule {
    constructor(private lr: LoaderRegistryService,
                private pos: PatternOntologyService,
                private cr: ComponentRegistryService) {
        this.cr.registerComponent('default', {plcomponent: DefaultPlRendererComponent, pcomponent: DefaultPatternRendererComponent});
    }
}

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
import { RouterModule, Routes } from '@angular/router';
import { PatternLanguageManagementOverviewComponent } from './pattern-language-management-overview/pattern-language-management-overview.component'; // tslint:disable-line:max-line-length
import { PatternLanguageManagementOverviewResolverService } from './pattern-language-management-overview/pattern-language-management-overview-resolver.service'; // tslint:disable-line:max-line-length
import { PatternLanguageContainerComponent } from './pattern-language-container/pattern-language-container.component';
import { PatternContainerComponent } from './pattern-container/pattern-container.component'; // tslint:disable-line:max-line-length

const routes: Routes = [
    {
        path: 'patternlanguages',
        resolve: {
            patternlanguages: PatternLanguageManagementOverviewResolverService
        },
        children: [
            {
                path: '',
                component: PatternLanguageManagementOverviewComponent
            },
            {
                path: ':plid',
                component: PatternLanguageContainerComponent,
            },
            {
                path: ':plid/:pid',
                component: PatternContainerComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatternLanguageManagementRoutingModule {
    constructor() {
    }
}

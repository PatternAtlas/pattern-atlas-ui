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

import { PatternLanguageManagementRoutingModule } from './pattern-language-management-routing.module';
import { PatternLanguageManagementOverviewComponent } from './pattern-language-management-overview/pattern-language-management-overview.component'; // tslint:disable-line:max-line-length
import { CoreModule } from '../core/core.module';
import { PatternLanguageContainerComponent } from './pattern-language-container/pattern-language-container.component';
import { PatternLanguageContainerDirective } from './pattern-language-container.directive';
import { PatternContainerComponent } from './pattern-container/pattern-container.component';
import { PatternContainerDirective } from './pattern-container.directive';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule, MatInputModule,
    MatSidenavModule, MatTabsModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        PatternLanguageManagementRoutingModule,
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatCardModule,
        MatDialogModule,
        MatTabsModule,
        MatInputModule,
        CoreModule,
    ],
    declarations: [
        PatternLanguageManagementOverviewComponent,
        PatternLanguageContainerComponent,
        PatternLanguageContainerDirective,
        PatternContainerComponent,
        PatternContainerDirective,
    ]
})
export class PatternLanguageManagementModule {
}

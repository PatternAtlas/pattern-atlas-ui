import { GraphModule } from './../graph/graph.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatternLanguageManagementRoutingModule } from './pattern-language-management-routing.module';
import { PatternLanguageManagementComponent } from './pattern-language-management/pattern-language-management.component'; // tslint:disable-line:max-line-length
import { CoreModule } from '../core/core.module';
import { PatternLanguageContainerComponent } from './pattern-language-container/pattern-language-container.component';
import { PatternLanguageContainerDirective } from './pattern-language-container/pattern-language-container.directive';
import { PatternContainerComponent } from './pattern-container/pattern-container.component';
import { PatternContainerDirective } from './pattern-container/pattern-container.directive';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import { CreateEditPatternLanguageComponent } from './create-edit-pattern-language/create-edit-pattern-language.component';
import { CreatePatternComponent } from './create-pattern/create-pattern.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProcessOauthCallbackComponent } from '../core/component/process-oauth-callback/process-oauth-callback.component';
import { ToasterModule } from 'angular2-toaster';
import { PatternLanguageGraphComponent } from './pattern-language-graph/pattern-language-graph.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

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
        MatChipsModule,
        MatAutocompleteModule,
        CoreModule,
        MatGridListModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        ToasterModule,
        GraphModule,
        DragDropModule,
        MatListModule,
        MatRippleModule
    ],
    declarations: [
        PatternLanguageManagementComponent,
        PatternLanguageContainerComponent,
        PatternLanguageContainerDirective,
        PatternContainerComponent,
        PatternContainerDirective,
        CreateEditPatternLanguageComponent,
        CreatePatternComponent,
        ProcessOauthCallbackComponent,
        PatternLanguageGraphComponent
    ],
    entryComponents: [
        CreateEditPatternLanguageComponent
    ]
})
export class PatternLanguageManagementModule {
}

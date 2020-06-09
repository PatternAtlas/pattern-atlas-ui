import {GraphModule} from './../graph/graph.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatternLanguageManagementRoutingModule} from './pattern-language-management-routing.module';
import {PatternLanguageManagementComponent} from './pattern-language-management/pattern-language-management.component';
import {CoreModule} from '../core/core.module';
import {PatternLanguageContainerComponent} from './pattern-language-container/pattern-language-container.component';
import {PatternLanguageContainerDirective} from './pattern-language-container/pattern-language-container.directive';
import {PatternContainerComponent} from './pattern-container/pattern-container.component';
import {PatternContainerDirective} from './pattern-container/pattern-container.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {CreatePatternComponent} from './create-pattern/create-pattern.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProcessOauthCallbackComponent} from '../core/component/process-oauth-callback/process-oauth-callback.component';
import {ToasterModule} from 'angular2-toaster';
import {PatternLanguageGraphComponent} from './pattern-language-graph/pattern-language-graph.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphDataService } from '../core/service/graph-data.service';
import { DesignModelService } from '../design-model-module/service/design-model.service';

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

export const PL_ROUTES: Routes = [
  {
    path: '',
    component: PatternLanguageManagementComponent
  }, {
    path: ':patternLanguageId',
    component: PatternLanguageContainerComponent,
  }, {
    path: ':patternLanguageId/create-patterns',
    component: CreatePatternComponent,
  },
  {
    path: ':patternLanguageId/:patternId',
    component: PatternContainerComponent
  }

]

@NgModule({
  imports: [
    CommonModule,
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
    MatRippleModule,
    RouterModule.forChild(PL_ROUTES),
    // PatternLanguageManagementRoutingModule,

  ],
  declarations: [
    PatternLanguageManagementComponent,
    PatternLanguageContainerComponent,
    PatternLanguageContainerDirective,
    PatternContainerComponent,
    PatternContainerDirective,
    CreatePatternComponent,
    ProcessOauthCallbackComponent,
    PatternLanguageGraphComponent,
  ],
  providers: [
    { provide: GraphDataService, useClass: DesignModelService }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatternLanguageManagementModule {
}

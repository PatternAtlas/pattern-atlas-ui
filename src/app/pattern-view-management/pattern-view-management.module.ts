import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatternViewManagementComponent } from './pattern-view-management/pattern-view-management.component';
import { CoreModule } from '../core/core.module';
import { PatternViewRendererComponent } from './pattern-view-renderer/pattern-view-renderer.component';
import { AddToViewComponent } from './add-to-view/add-to-view.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule, Routes } from '@angular/router';
import { GraphDataService } from '../core/service/graph-data/graph-data.service';
import { PatternViewService } from '../core/service/pattern-view.service';
import { PatternAtlasUiFeatureToggleModule } from '../core/directives/pattern-atlas-ui-feature-toggle.module';

const PATTERN_VIEW_MANAGMENT_ROUTE: Routes = [
  {
    path: '',
    component: PatternViewManagementComponent
  },
  {
    path: ':patternViewUri',
    component: PatternViewRendererComponent
  },
];

@NgModule({
  declarations: [
    PatternViewManagementComponent,
    PatternViewRendererComponent,
    AddToViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatBadgeModule,
    CoreModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule.forChild(PATTERN_VIEW_MANAGMENT_ROUTE),
    PatternAtlasUiFeatureToggleModule
  ],
  providers: [
    { provide: GraphDataService, useClass: PatternViewService },
  ],
  entryComponents: [
    AddToViewComponent
  ]
})
export class PatternViewManagementModule {
}

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
import { Routes, RouterModule } from '@angular/router';

const PATTERN_VIEW_MANAGMENT_ROUTE: Routes = [
  // {
  //     path: 'patternviews',
  //     pathMatch: 'prefix',
  //     children: [
  {
    path: '',
    component: PatternViewManagementComponent
  },
  {
    path: ':patternViewUri',
    component: PatternViewRendererComponent
  },
  //     ]
  // }
];

@NgModule({
  declarations: [
    PatternViewManagementComponent,
    PatternViewRendererComponent,
    AddToViewComponent],
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
  ],
  entryComponents: [
    AddToViewComponent
  ]
})
export class PatternViewManagementModule {
}

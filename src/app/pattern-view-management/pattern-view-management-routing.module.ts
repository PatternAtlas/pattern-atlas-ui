import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternViewManagementComponent } from './pattern-view-management/pattern-view-management.component';
import { PatternViewRendererComponent } from './pattern-view-renderer/pattern-view-renderer.component';
import { globals } from '../globals';

const routes: Routes = [
  {
    path: globals.pathConstants.patternViews,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: PatternViewManagementComponent
      },
      {
        path: ':' + globals.pathConstants.patternViewURI,
        component: PatternViewRendererComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternViewManagementRoutingModule {
}

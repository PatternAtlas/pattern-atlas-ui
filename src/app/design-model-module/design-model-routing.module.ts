import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignModelManagementComponent } from './design-model-management/design-model-management.component';

const routes: Routes = [
  {
    path: 'designmodels',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: DesignModelManagementComponent
      },
      // {
      //   path: ':patternViewUri',
      //   component: PatternViewRendererComponent
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignModelRoutingModule {
}

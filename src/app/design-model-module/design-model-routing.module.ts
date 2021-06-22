import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignModelManagementComponent } from './component/design-model-management/design-model-management.component';
import { DesignModelRendererComponent } from './component/design-model-renderer/design-model-renderer.component';

const routes: Routes = [
  {
    path: '',
    component: DesignModelManagementComponent
  },
  {
    path: ':designModelUri',
    component: DesignModelRendererComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignModelRoutingModule {
}

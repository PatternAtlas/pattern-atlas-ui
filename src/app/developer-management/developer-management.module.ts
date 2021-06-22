import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeveloperManagementListComponent } from './developer-management-list/developer-management-list.component';

export const DEVELOPER_MANAGEMENT_ROUTES = [
  {
    path: '',
    children: [
      { path: '', component: DeveloperManagementListComponent },
    ]
  }
];

@NgModule({
  declarations: [
    DeveloperManagementListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DEVELOPER_MANAGEMENT_ROUTES),
  ]
})
export class DeveloperManagementModule {
}

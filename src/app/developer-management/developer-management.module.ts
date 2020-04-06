import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperManagementHomeComponent } from './developer-management-home/developer-management-home.component';
import { RouterModule } from '@angular/router';

export const DEVELOPER_MANAGEMENT_ROUTES = [
  {
    path: '',
    children: [
      { path: '', component: DeveloperManagementHomeComponent },
      // { path: 'userDetails', component: UserDetailsComponent }
    ]
  }
  // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({
  declarations: [
    DeveloperManagementHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DEVELOPER_MANAGEMENT_ROUTES),
  ]
})
export class DeveloperManagementModule { }

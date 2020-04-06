import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';
import { RouterModule } from '@angular/router';

export const USER_MANAGEMENT_ROUTES = [
  { 
    path: '', component: UserManagementHomeComponent 
  }, 
  // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({
  declarations: [
    UserManagementHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(USER_MANAGEMENT_ROUTES),
  ],
  exports: [
    UserManagementHomeComponent
  ]
})
export class UserManagementModule { }

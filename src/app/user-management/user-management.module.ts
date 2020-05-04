import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { UserManagementService } from './user-management.service';

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
    CoreModule,
    RouterModule.forChild(USER_MANAGEMENT_ROUTES),
    
  ],
  exports: [
    // UserManagementHomeComponent
  ],
  providers: [
    UserManagementService
  ]

})
export class UserManagementModule { }

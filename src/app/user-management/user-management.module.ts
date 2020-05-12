import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { UserManagementService } from './user-management.service';

export const USER_MANAGEMENT_ROUTES = [
  { 
    path: '', component: UserManagementListComponent 
  }, 
  // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({
  declarations: [
    UserManagementListComponent
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

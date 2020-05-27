import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

export const USER_MANAGEMENT_ROUTES = [
  {
    path: '', component: UserManagementListComponent,
  },
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
  ],
  providers: [
  ]

})
export class UserManagementModule { }

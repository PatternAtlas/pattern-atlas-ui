import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagementHomeComponent } from './admin-management-home/admin-management-home.component';
import { RouterModule } from '@angular/router';

export const ADMIN_MANAGEMENT_ROUTES = [
  {
    path: '',
    children: [
      { path: '', component: AdminManagementHomeComponent },
      // { path: 'userDetails', component: UserDetailsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminManagementHomeComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_MANAGEMENT_ROUTES),
  ]
})
export class AdminManagementModule { }

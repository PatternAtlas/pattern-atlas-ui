import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagementHomeComponent } from './admin-management-home/admin-management-home.component';
import { RouterModule } from '@angular/router';
import { UserManagementService } from '../user-management/user-management.service';
import { UserManagementModule } from '../user-management/user-management.module';
import { AdminManagementService } from './admin-management.service';
import { CoreModule } from '../core/core.module';
import {MatTableModule} from '@angular/material/table';


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
    CoreModule,
    RouterModule.forChild(ADMIN_MANAGEMENT_ROUTES),
    MatTableModule,
  ],
  providers: [
    AdminManagementService
  ]
})
export class AdminManagementModule { }

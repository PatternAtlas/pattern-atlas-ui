import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagementHomeComponent } from './admin-management-home/admin-management-home.component';
import { RouterModule } from '@angular/router';
import { UserManagementService } from '../user-management/user-management.service';
import { UserManagementModule } from '../user-management/user-management.module';
import { AdminManagementService } from './admin-management.service';
import { CoreModule } from '../core/core.module';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminManagementHomeDetailComponent } from './admin-management-home-detail/admin-management-home-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminManagementHomeStore } from './admin-management-helper/admin-management-store';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


export const ADMIN_MANAGEMENT_ROUTES = [
  {
    path: '',
    children: [
      { path: '', component: AdminManagementHomeComponent },
      { path: 'edit/:id', component: AdminManagementHomeDetailComponent },
      { path: 'create', component: AdminManagementHomeDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminManagementHomeComponent,
    AdminManagementHomeDetailComponent,
   
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(ADMIN_MANAGEMENT_ROUTES),
    // Material
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    // Form
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AdminManagementService,
    AdminManagementHomeStore,
  ]
})
export class AdminManagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AdminManagementListComponent } from './admin-management-list/admin-management-list.component';
import { AdminManagementDetailComponent } from './admin-management-detail/admin-management-detail.component';


export const ADMIN_MANAGEMENT_ROUTES = [
  {
    path: '',
    children: [
      { path: '', component: AdminManagementListComponent },
      { path: 'edit/:id', component: AdminManagementDetailComponent },
      { path: 'create', component: AdminManagementDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminManagementListComponent,
    AdminManagementDetailComponent,
   
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
  ]
})
export class AdminManagementModule { }

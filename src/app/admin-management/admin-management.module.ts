import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
/** Component */
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

export const ADMIN_MANAGEMENT_ROUTES = [
  {
    path: '',
    children: [
      { path: '', component: UserListComponent },
      { path: 'edit/:id', component: UserDetailComponent },
      { path: 'create', component: UserDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    PrivilegeComponent,
   
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
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    // Form
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  entryComponents: [
    UserDetailComponent
  ]
})
export class AdminManagementModule {
}

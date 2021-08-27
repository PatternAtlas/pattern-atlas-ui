import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export const USER_MANAGEMENT_ROUTES = [
  {
    path: '', component: UserInfoComponent,
  },
];

@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(USER_MANAGEMENT_ROUTES),
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    //FORM
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [],
  providers: []

})
export class UserManagementModule {
}

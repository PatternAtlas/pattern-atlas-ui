import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueManagementDetailComponent } from './issue-management-detail/issue-management-detail.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from '../core/core.module';
import { MatSelectModule } from '@angular/material/select';
import { IssueManagementListComponent } from './issue-management-list/issue-management-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

export const ISSUE_ROTUES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IssueManagementListComponent
      },
      {
        path: 'create',
        component: IssueManagementDetailComponent,
        // Will be used in the future
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
      {
        path: 'detail/:name',
        component: IssueManagementDetailComponent,
        // Will be used in the future
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
      {
        path: 'edit/:name',
        component: IssueManagementDetailComponent,
        // Will be used in the future
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
    ]
  },
];

@NgModule({
  declarations: [
    IssueManagementListComponent,
    IssueManagementDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(ISSUE_ROTUES),
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [
    IssueManagementListComponent
  ],
  providers: [
  ],
})
export class IssueManagementModule { }

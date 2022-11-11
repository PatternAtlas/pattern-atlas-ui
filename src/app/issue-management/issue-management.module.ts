import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueManagementDetailComponent } from './issue-management-detail/issue-management-detail.component';
import { AuthorManagementListComponent } from '../author-management/author-list/author-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from '../core/core.module';
import { MatSelectModule } from '@angular/material/select';
import { IssueManagementListComponent } from './issue-management-list/issue-management-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

export const ISSUE_ROUTES : Routes  = [
  {
    path: '',
    component: IssueManagementListComponent
  },
  {
    path: ':action',
    component: IssueManagementDetailComponent,
  },
  {
    path: ':action/:name',
    component: IssueManagementDetailComponent
  },
  {
    path: 'authors/:name',
    component: AuthorManagementListComponent,
  },
];

@NgModule({
  declarations: [
    IssueManagementListComponent,
    IssueManagementDetailComponent,
    AuthorManagementListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(ISSUE_ROUTES),
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule,
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
export class IssueManagementModule {
}

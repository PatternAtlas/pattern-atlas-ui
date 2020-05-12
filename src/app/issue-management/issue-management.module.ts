import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueCreateDialogComponent } from './issue-create-dialog/issue-create-dialog.component';
import { IssueManagementService } from './issue-management.service';
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
import { IssueManagementStore } from '../core/stores/issue-management-store';
import { IssueManagementListComponent } from './issue-management-list/issue-management-list.component';

export const ISSUE_ROTUES = [
  { 
    path: '', component: IssueManagementListComponent 
  }, 
  // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({
  declarations: [
    IssueManagementListComponent,
    IssueCreateDialogComponent,
    IssueManagementDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(ISSUE_ROTUES),
    // ModalModule.forRoot(),
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
  ],
  exports: [
    IssueManagementListComponent
  ],
  providers: [
    IssueManagementService,
    // IssueManagementStore,
  ],
  entryComponents: [
    IssueCreateDialogComponent,
  ],
})
export class IssueManagementModule { }

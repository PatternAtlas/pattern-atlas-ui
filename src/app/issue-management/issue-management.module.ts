import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueManagementHomeComponent } from './issue-management-home/issue-management-home.component';
import { IssueCreateDialogComponent } from './issue-create-dialog/issue-create-dialog.component';
import { IssueManagementService } from './issue-management.service';
import { IssueManagementHomeDetailComponent } from './issue-management-home-detail/issue-management-home-detail.component';
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

export const ISSUE_ROTUES = [
  { 
    path: '', component: IssueManagementHomeComponent 
  }, 
  // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({
  declarations: [
    IssueManagementHomeComponent,
    IssueCreateDialogComponent,
    IssueManagementHomeDetailComponent
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
    IssueManagementHomeComponent
  ],
  providers: [
    IssueManagementService,
  ],
  entryComponents: [
    IssueCreateDialogComponent,
  ],
})
export class IssueManagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateManagementHomeComponent } from './candidate-management-home/candidate-management-home.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { CandidateManagementService } from './candidate-management.service';
import { CandidateManagementHomeDetailComponent } from './candidate-management-home-detail/candidate-management-home-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export const CANDIATE_ROTUES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CandidateManagementHomeComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER } 
      },
      {
        path: 'detail/:name',
        component: CandidateManagementHomeDetailComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
      {
        path: 'edit/:name',
        component: CandidateManagementHomeDetailComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
      {
        path: 'create',
        component: CandidateManagementHomeDetailComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
      {
        path: 'create/:name',
        component: CandidateManagementHomeDetailComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      }
    ]
  }
];


@NgModule({
  declarations: [
    CandidateManagementHomeComponent,
    CandidateManagementHomeDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(CANDIATE_ROTUES),
    //Material
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [
    CandidateManagementService
  ]
})
export class CandidateManagementModule { }

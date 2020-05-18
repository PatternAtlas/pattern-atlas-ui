import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CandidateManagementListComponent } from './candidate-management-list/candidate-management-list.component';
import { CandidateManagementDetailComponent } from './candidate-management-detail/candidate-management-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

export const CANDIATE_ROTUES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CandidateManagementListComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER } 
      },
      {
        path: 'detail/:name',
        component: CandidateManagementDetailComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
      {
        path: 'edit/:name',
        component: CandidateManagementDetailComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
      {
        path: 'create',
        component: CandidateManagementDetailComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      },
      {
        path: 'create/:name',
        component: CandidateManagementDetailComponent,
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
      }
    ]
  }
];


@NgModule({
  declarations: [
    CandidateManagementListComponent,
    CandidateManagementDetailComponent
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
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [
  ]
})
export class CandidateManagementModule { }

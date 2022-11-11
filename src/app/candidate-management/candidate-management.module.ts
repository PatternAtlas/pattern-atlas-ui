import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CandidateManagementListComponent } from './candidate-management-list/candidate-management-list.component';
import { CandidateManagementDetailComponent } from './candidate-management-detail/candidate-management-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
// Routing

export const CANDIDATE_ROUTES : Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CandidateManagementListComponent,
      },
      {
        path: ':action',
        component: CandidateManagementDetailComponent,
      },
      {
        path: ':action/:name',
        component: CandidateManagementDetailComponent,
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
    RouterModule.forChild(CANDIDATE_ROUTES),
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
  providers: []
})
export class CandidateManagementModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateManagementHomeComponent } from './candidate-management-home/candidate-management-home.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';

export const CANDIATE_ROTUES = [
  { 
    path: '', component: CandidateManagementHomeComponent 
  }, 
  // { path: 'some-other-route', component: SomeOtherComponent },
];


@NgModule({
  declarations: [CandidateManagementHomeComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(CANDIATE_ROTUES),
  ]
})
export class CandidateManagementModule { }

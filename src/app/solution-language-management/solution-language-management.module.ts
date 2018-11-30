import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolutionLanguageManagementRoutingModule } from './solution-language-management-routing.module';
import { SolutionLanguageManagementComponent } from './solution-language-management/solution-language-management.component';

@NgModule({
  declarations: [SolutionLanguageManagementComponent],
  imports: [
    CommonModule,
    SolutionLanguageManagementRoutingModule
  ]
})
export class SolutionLanguageManagementModule { }

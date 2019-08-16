import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterViewComponent } from './component/filter-view/filter-view.component';
import { MatCardModule, MatDividerModule, MatFormFieldModule, MatCheckboxModule } from "@angular/material";

@NgModule({
  declarations: [FilterViewComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  exports: [
    FilterViewComponent
  ]
})
export class FilterModule { }

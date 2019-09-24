import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterViewComponent } from './component/filter-view/filter-view.component';
import { MatCardModule, MatDividerModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterViewComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    FilterViewComponent
  ]
})
export class FilterModule { }

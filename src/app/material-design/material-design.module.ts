import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTreeModule
  ],
  exports: [
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTreeModule
  ]
})
export class MaterialDesignModule {
}

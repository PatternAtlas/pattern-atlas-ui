import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModelRoutingModule } from './design-model-routing.module';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignModelManagementComponent } from './design-model-management/design-model-management.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';


@NgModule({
  declarations: [
    DesignModelManagementComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DesignModelRoutingModule,
    ReactiveFormsModule,
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
export class DesignModelModule {
}

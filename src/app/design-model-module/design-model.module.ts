import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModelManagementComponent } from './design-model-management/design-model-management.component';
import { DesignModelRoutingModule } from './design-model-routing.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DesignModelManagementComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DesignModelRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule
  ]
})
export class DesignModelModule {
}

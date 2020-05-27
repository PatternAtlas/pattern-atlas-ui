import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModelRoutingModule } from './design-model-routing.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignModelManagementComponent } from './design-model-management/design-model-management.component';


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

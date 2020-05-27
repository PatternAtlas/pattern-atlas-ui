import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DesignModelModule } from './design-model.module';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { MaterialDesignModule } from '../material-design/material-design.module';


@NgModule({
  imports: [
    DesignModelModule,
    MaterialDesignModule,

    HttpClientTestingModule,
    RouterTestingModule,
    NoopAnimationsModule
  ],
  providers: [
    ToasterService
  ]
})
export class DesignModelTestModule {
}

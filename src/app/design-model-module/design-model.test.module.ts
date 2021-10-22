import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DesignModelModule } from './design-model.module';
import { ToasterService } from 'angular2-toaster';

@NgModule({
  imports: [
    DesignModelModule,

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

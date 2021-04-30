import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowOnFeatureDirective } from './show-on-feature.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShowOnFeatureDirective],
  exports: [ShowOnFeatureDirective],
  providers: [],
})
export class PatternAtlasUiFeatureToggleModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowOnFeatureDirective } from './show-on-feature.directive';
import { HideOnFeatureDirective } from './hide-on-feature.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShowOnFeatureDirective, HideOnFeatureDirective],
  exports: [ShowOnFeatureDirective, HideOnFeatureDirective],
  providers: [],
})
export class PatternAtlasUiFeatureToggleModule {
}

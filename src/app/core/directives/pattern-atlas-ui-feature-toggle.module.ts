import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowOnFeatureDirective} from './show-on-feature.directive';
import {PatternAtlasUiRepositoryConfigurationService} from './pattern-atlas-ui-repository-configuration.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShowOnFeatureDirective],
  exports: [ShowOnFeatureDirective],
  providers: [PatternAtlasUiRepositoryConfigurationService],
})
export class PatternAtlasUiFeatureToggleModule {
}

import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PatternAtlasUiRepositoryConfigurationService } from './pattern-atlas-ui-repository-configuration.service';

@Directive({
  exportAs: 'patternAtlasUiHideOnFeature',
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'patternAtlasUiHideOnFeature, [patternAtlasUiHideOnFeature]',
})
export class HideOnFeatureDirective implements OnInit {
  @Input() public patternAtlasUiHideOnFeature: string | string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private configurationService: PatternAtlasUiRepositoryConfigurationService
  ) {
  }

  ngOnInit(): void {
    if (Array.isArray(this.patternAtlasUiHideOnFeature)) {
      let found = false;
      for (const feature of this.patternAtlasUiHideOnFeature) {
        if (this.configurationService.configuration.features[feature]) {
          this.viewContainerRef.clear();
          found = true;
        }
      }
      if (!found) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else if (typeof this.patternAtlasUiHideOnFeature === 'string') {
      if (this.configurationService.configuration.features[this.patternAtlasUiHideOnFeature]) {
        this.viewContainerRef.clear();
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
  }

}

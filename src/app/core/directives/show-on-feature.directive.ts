import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PatternAtlasUiRepositoryConfigurationService } from './pattern-atlas-ui-repository-configuration.service';

@Directive({
  exportAs: 'patternAtlasUiShowOnFeature',
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'patternAtlasUiShowOnFeature, [patternAtlasUiShowOnFeature]',
})
export class ShowOnFeatureDirective implements OnInit {
  @Input() public patternAtlasUiShowOnFeature: string | string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private configurationService: PatternAtlasUiRepositoryConfigurationService
  ) {
  }

  ngOnInit(): void {
    if (Array.isArray(this.patternAtlasUiShowOnFeature)) {
      let found = false;
      for (const feature of this.patternAtlasUiShowOnFeature) {
        if (this.configurationService.configuration.features[feature]) {
          found = true;
        }
      }
      if (!found) {
        this.viewContainerRef.clear();
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else if (typeof this.patternAtlasUiShowOnFeature === 'string') {
      if (
        this.configurationService.configuration.features[this.patternAtlasUiShowOnFeature]
      ) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    }
  }

}

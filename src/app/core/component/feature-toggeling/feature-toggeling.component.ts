import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {
  PatternAtlasUiConfiguration,
  PatternAtlasUiRepositoryConfigurationService,
  UiFeatures
} from '../../directives/pattern-atlas-ui-repository-configuration.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'pp-feature-toggeling',
  templateUrl: './feature-toggeling.component.html',
  styleUrls: ['./feature-toggeling.component.scss']
})
export class FeatureToggelingComponent implements OnInit {

  // links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  readonly UiFeatures = UiFeatures;
  config: PatternAtlasUiConfiguration;

  constructor(
    private http: HttpClient, private toasterService: ToasterService,
    private configService: PatternAtlasUiRepositoryConfigurationService,
  ) {
  }

  ngOnInit(): void {
    this.config = this.configService.configuration;

    // this.links[0] = {
    //   heading: 'Feature Selection',
    //   subHeading: 'Set the visibility of supported features',
    // };
  }

  toggleFeature(feature: UiFeatures, event: Event): void {
    this.configService.applyConfig(feature, event.target['checked']).subscribe(
      () => this.toasterService.pop('Successfully saved config!'),
      (error: HttpErrorResponse) =>
        this.toasterService.pop(
          'Error while saving config!' + error.message
        )
    );
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  PatternAtlasUiConfiguration, PatternAtlasUiRepositoryConfigurationService, UiFeatures
} from '../../directives/pattern-atlas-ui-repository-configuration.service';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pp-feature-toggle-dialog',
  templateUrl: './feature-toggle-dialog.component.html',
  styleUrls: ['./feature-toggle-dialog.component.scss']
})
export class FeatureToggleDialogComponent implements OnInit {

  readonly UiFeatures = UiFeatures;
  config: PatternAtlasUiConfiguration;

  constructor(
    private http: HttpClient, private toasterService: ToasterService,
    private configService: PatternAtlasUiRepositoryConfigurationService,
    public dialogRef: MatDialogRef<FeatureToggleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAdmin: boolean }
  ) {
  }

  public disabled(): boolean {
    return !(this.config.features.showSettings || this.data.isAdmin);
  }

  ngOnInit(): void {
    this.config = this.configService.configuration;
  }

  toggleFeature(feature: UiFeatures, event: Event): void {
    if (this.config.features.showSettings || this.data.isAdmin) {
      this.configService.applyConfig(feature, event.target['checked']).subscribe(
        () => this.toasterService.pop('success', 'Successfully updated the config!'),
        () =>
          this.toasterService.pop(
            'error', 'Error while saving config!'
          )
      );
    } else {
      this.toasterService.pop('error',
        'Adjustments are not allowed and will not be saved!'
      );
    }
  }

  onCloseDialogClick(): void {
    this.dialogRef.close();
  }

}

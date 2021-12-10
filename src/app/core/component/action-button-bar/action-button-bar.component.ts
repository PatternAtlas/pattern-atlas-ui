import {
  ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import {
  PatternAtlasUiRepositoryConfigurationService, UiFeatures
} from 'src/app/core/directives/pattern-atlas-ui-repository-configuration.service';

@Component({
  selector: 'pp-action-button-bar',
  templateUrl: './action-button-bar.component.html',
  styleUrls: ['./action-button-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ActionButtonBarComponent implements OnInit {
  readonly UiFeatures = UiFeatures;

  @Output() addClicked = new EventEmitter<void>();
  @Output() add2Clicked = new EventEmitter<void>();
  @Output() reloadClicked = new EventEmitter<void>();
  @Output() changedText = new EventEmitter<void>();
  @Output() iconEditClicked = new EventEmitter<void>();
  @Input() addButtonText: string;
  @Input() reloadButton = false;
  @Input() goBackButton = true;
  @Input() secondAddButton: boolean;
  @Input() firstAddButton = true;
  @Input() secondAddButtonText: string;
  @Input() iconEdit = false;
  @Input() iconUrl: string;

  @Input() displayText: string;

  editingFromConfigServer = false;

  constructor(private cdr: ChangeDetectorRef,
              private applicationRef: ApplicationRef,
              private configurationService: PatternAtlasUiRepositoryConfigurationService) {
  }

  ngOnInit() {
    this.editingFromConfigServer = this.configurationService.configuration.features[UiFeatures.EDITING];
  }

  addButtonClicked() {
    this.addClicked.emit();
  }

  reloadButtonClicked() {
    this.reloadClicked.emit();
  }

  secondAddButtonClicked() {
    this.add2Clicked.emit();
  }

  iconEditButtonClicked() {
    if (this.editingFromConfigServer) {
      this.iconEditClicked.emit();
    }
  }
}

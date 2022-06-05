import {
  ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import {
  PatternAtlasUiRepositoryConfigurationService, UiFeatures
} from 'src/app/core/directives/pattern-atlas-ui-repository-configuration.service';
import { PrivilegeService } from '../../../authentication/_services/privilege.service';
import { Observable, of } from 'rxjs';

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
  @Input() firstAddButton = false;
  @Input() secondAddButtonText: string;
  @Input() iconEdit = false;
  @Input() iconUrl: string;
  // Should the name of a privilege be given, the add button is only visible if the user has this privilege
  @Input() addPrivilegeName: string;

  @Input() back = false;
  @Output() backClicked = new EventEmitter<void>();

  @Input() displayText: string;

  editingFromConfigServer = false;

  constructor(private cdr: ChangeDetectorRef,
              private applicationRef: ApplicationRef,
              private configurationService: PatternAtlasUiRepositoryConfigurationService,
              private p: PrivilegeService) {
  }

  ngOnInit() {
    this.editingFromConfigServer = this.configurationService.configuration.features[UiFeatures.EDITING];
    if(this.addPrivilegeName) {
      // Check if user privilege is present
      this.p.hasPrivilege(this.addPrivilegeName)
        .subscribe(value => this.firstAddButton = value);
    } else {
      this.firstAddButton = true
    }
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

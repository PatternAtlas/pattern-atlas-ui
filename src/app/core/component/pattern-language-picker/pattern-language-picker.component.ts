import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import PatternLanguageModel from '../../model/hal/pattern-language-model.model';
import { PatternLanguageService } from '../../service/pattern-language.service';
import PatternLanguageSchemaModel from '../../model/pattern-language-schema.model';
import PatternSectionSchema from '../../model/hal/pattern-section-schema.model';
import { FormControl } from '@angular/forms';
import { ConfirmData, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export const patternLanguageNone = new PatternLanguageSchemaModel(
  '-1',
  'None',
  [
    new PatternSectionSchema('Icon', 'Icon', 'any', 0),
    new PatternSectionSchema('Context', 'Context', 'any', 1),
    new PatternSectionSchema('Driving Question', 'Driving Question', 'any', 2),
    new PatternSectionSchema('Solution', 'Solution', 'any', 3)
  ]
);

@Component({
  selector: 'pp-pattern-language-picker',
  templateUrl: './pattern-language-picker.component.html',
  styleUrls: ['./pattern-language-picker.component.scss']
})
export class PatternLanguagePickerComponent implements OnInit, OnChanges {

  @Input() disabled : boolean;

  @Input() set patternLanguageSelected(patternLanguageSelected: string) {
    if (patternLanguageSelected) {
      this._patternLanguageSelected = patternLanguageSelected;
      if (this.patternLanguages) {
        const patternLanguageSchemaModel = this.patternLanguages.find(l => l.patternLanguageId == this._patternLanguageSelected);
        this._oldValue = patternLanguageSchemaModel
        this.patternLanguageCrtl.setValue(patternLanguageSchemaModel);
      }
    }
  }
  @Input() confirmDialog: ConfirmData;
  @Output() patternLanguageSelectedChange = new EventEmitter();

  private _patternLanguageSelected: string;
  private _oldValue: PatternLanguageSchemaModel;
  patternLanguages: PatternLanguageSchemaModel[];
  patternLanguageCrtl: FormControl = new FormControl({ value: null, disabled: true });

  constructor(
    private patternLanguageService: PatternLanguageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.patternLanguageService.getPatternLanguagesSchemas().subscribe(result => {
      this.patternLanguages = result;
      this.patternLanguages.push(patternLanguageNone);
      if (this._patternLanguageSelected) {
        const patternLanguageSchemaModel = this.patternLanguages.find(l => l.patternLanguageId == this._patternLanguageSelected);
        this._oldValue = patternLanguageSchemaModel
        this.patternLanguageCrtl.setValue(patternLanguageSchemaModel);
      }
    })
  }

  selectionChange() {
    if (this.confirmDialog) {
      let confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: this.confirmDialog
      });

      confirmDialog.afterClosed().subscribe(result => {
        if (result) {
          this._oldValue = this.patternLanguageCrtl.value;
          this.patternLanguageSelectedChange.emit(this.patternLanguageCrtl.value)
        } else {
          this.patternLanguageCrtl.setValue(this._oldValue);
        }
      });
    } else {
      this.patternLanguageSelectedChange.emit(this.patternLanguageCrtl.value)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.disabled) {
      if(this.disabled) {
        this.patternLanguageCrtl.disable();
      } else {
        this.patternLanguageCrtl.enable();
      }
    }
  }

}

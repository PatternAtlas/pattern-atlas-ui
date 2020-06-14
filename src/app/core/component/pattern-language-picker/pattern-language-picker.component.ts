import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import PatternLanguageModel from '../../model/hal/pattern-language-model.model';
import { PatternLanguageService } from '../../service/pattern-language.service';
import PatternLanguageSchemaModel from '../../model/pattern-language-schema.model';
import PatternSectionSchema from '../../model/hal/pattern-section-schema.model';
import { FormControl } from '@angular/forms';

export const patternLanguageNone = new PatternLanguageSchemaModel(
  null,
  'NONE',
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
export class PatternLanguagePickerComponent implements OnInit {

  @Input() set disabled(disabled: boolean) {
    if (disabled) this.patternLanguageCrtl.disable();
    if (!disabled) this.patternLanguageCrtl.enable();
  }
  // @Input() disabled: boolean;
  // @Input() set patternLanguageSelected(patternLanguageSelected: string) {
  //   console.log(patternLanguageSelected);
  //   if (patternLanguageSelected && this.patternLanguages) {
  //     this.patternLanguageCrtl.setValue(this.patternLanguages.find(l => l.patternLanguageId == patternLanguageSelected));
  //     console.log(this.patternLanguageCrtl.value);
  //   }
  // }
  @Input() patternLanguageSelected: string;
  @Output() patternLanguageSelectedChange = new EventEmitter();

  patternLanguages: PatternLanguageSchemaModel[];
  patternLanguageCrtl: FormControl = new FormControl({ value: null, disabled: true });

  constructor(
    private patternLanguageService: PatternLanguageService,
  ) { }

  ngOnInit(): void {
    this.patternLanguageService.getPatternLanguagesSchemas().subscribe(result => {
      console.log(result);
      this.patternLanguages = result;
      this.patternLanguages.push(patternLanguageNone);
      if (this.patternLanguageSelected) this.patternLanguageCrtl.setValue(this.patternLanguages.find(l => l.patternLanguageId == this.patternLanguageSelected));
    })
  }

  selectionChange() {
    // console.log(this.patternLanguageCrtl.value);
    this.patternLanguageSelectedChange.emit(this.patternLanguageCrtl.value)
  }

}

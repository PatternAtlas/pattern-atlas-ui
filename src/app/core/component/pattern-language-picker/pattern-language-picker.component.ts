import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import PatternLanguageModel from '../../model/hal/pattern-language-model.model';
import { PatternLanguageService } from '../../service/pattern-language.service';

@Component({
  selector: 'pp-pattern-language-picker',
  templateUrl: './pattern-language-picker.component.html',
  styleUrls: ['./pattern-language-picker.component.scss']
})
export class PatternLanguagePickerComponent implements OnInit {

  @Input() disabled: boolean = false;
  @Input() patternLanguageSelected: string;
  @Output() patternLanguageSelectedChange = new EventEmitter();

  public patternLanguages: PatternLanguageModel[];

  constructor(
    private patternLanguageService: PatternLanguageService,
  ) { }

  ngOnInit(): void {
    this.patternLanguageService.getPatternLanguages().subscribe(result => {
      console.log(result);
      this.patternLanguages = result;
      const patternLanguageNone = new PatternLanguageModel();
      patternLanguageNone.name = 'NONE';
      patternLanguageNone.id = '-1';
      this.patternLanguages.push(patternLanguageNone);
      // if (!this.patternLanguageSelected) this.patternLanguageSelected = patternLanguageNone;
      // this.selectionChange()
    })
  }

  selectionChange() {
    console.log(this.patternLanguageSelected);
    this.patternLanguageSelectedChange.emit(this.patternLanguageSelected)
  }

}

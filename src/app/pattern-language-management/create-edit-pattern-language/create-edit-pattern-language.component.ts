import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/internal/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'pp-create-edit-pattern-language',
  templateUrl: './create-edit-pattern-language.component.html',
  styleUrls: ['./create-edit-pattern-language.component.scss']
})
export class CreateEditPatternLanguageComponent implements OnInit {


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  sectionCtrl = new FormControl();
  filteredSections: Observable<string[]>;
  fruits: string[] = ['Icon', 'Context', 'Driving Question', 'Solution'];
  sectionNames: string[] = ['Icon', 'Context', 'Driving Question', 'Solution', 'Solution Sketches'];


  ngOnInit(): void {


  }

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private _patternOntologieService: PatternOntologyService) {
    this.filteredSections = this.sectionCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.sectionNames.slice()));
  }


  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.sectionCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.fruits.indexOf(event.option.viewValue) !== -1) {
      return;
    }
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.sectionCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.sectionNames.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


}

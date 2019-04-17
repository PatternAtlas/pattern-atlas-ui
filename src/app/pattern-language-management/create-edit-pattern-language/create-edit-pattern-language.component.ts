import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/internal/operators';
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
  sections: string[] = ['Icon', 'Context', 'Driving Question', 'Solution'];
  sectionNames: string[] = ['Icon', 'Context', 'Driving Question', 'Solution', 'Solution Sketches'];
  patternLanguageForm: FormGroup;
  iconPreviewVisible = false;

  get name(): AbstractControl {
    return this.patternLanguageForm.get('name');
  }

  get url(): AbstractControl {
    return this.patternLanguageForm.get('url');
  }

  ngOnInit(): void {
    this.patternLanguageForm = this._fb.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required]]
    });
    this.url.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((urlValue) => {
      this.iconPreviewVisible = urlValue && (urlValue.startsWith('https://') || urlValue.startsWith('http://'));
      // this.iconPreview.nativeElement.style.backgroundUrl = urlValue;
    });
  }

  @ViewChild('sectionInput') sectionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public dialogRef: MatDialogRef<CreateEditPatternLanguageComponent>, private  _fb: FormBuilder) {
    this.filteredSections = this.sectionCtrl.valueChanges.pipe(
      startWith(null),
      map((section: string | null) => section ? this._filter(section) : this.sectionNames.slice()));
  }


  add(event: MatChipInputEvent): void {
    // Add chip only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our section
      if ((value || '').trim()) {
        this.sections.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.sectionCtrl.setValue(null);
    }
  }

  remove(section: string): void {
    const index = this.sections.indexOf(section);

    if (index >= 0) {
      this.sections.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.sections.indexOf(event.option.viewValue) !== -1) {
      return;
    }
    this.sections.push(event.option.viewValue);
    this.sectionInput.nativeElement.value = '';
    this.sectionCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.sectionNames.filter(section => section.toLowerCase().indexOf(filterValue) === 0);
  }

  close(): void {
    this.dialogRef.close(); // {field: this.data.field, content: this.intialContent});
  }

  save(): void {
    this.dialogRef.close({sections: this.sections, name: this.name.value, url: this.url.value});
  }

}

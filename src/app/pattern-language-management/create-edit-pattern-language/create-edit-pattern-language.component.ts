import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/internal/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DialogPatternLanguageResult, SectionRestrictionForm } from '../data/DialogPatternLanguageResult.interface';
import { Section } from '../../core/model/section.model';

@Component({
  selector: 'pp-create-edit-pattern-language',
  templateUrl: './create-edit-pattern-language.component.html',
  styleUrls: ['./create-edit-pattern-language.component.scss']
})
export class CreateEditPatternLanguageComponent implements OnInit {

  isFirstStep = true;
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
  saveRequested = false;
  sectionDetailsGroup: FormGroup;

  sectionFormModel: {[key in keyof SectionRestrictionForm]?: FormControl} = {
    type: new FormControl('xsd:string', Validators.required),
    cardinality: new FormControl(0),
    restrictionType: new FormControl('only'),
    name: new FormControl(null),
  };

  options: string[] = ['xsd:string', 'xsd:anyURI', 'xsd:int', 'xsd:positiveInteger'];
  restrictionOptions: string[] = ['only', 'some', 'min', 'exactly', 'max'];


  @Output() onSaveClicked = new EventEmitter<DialogPatternLanguageResult>();

  get name(): AbstractControl {
    return this.patternLanguageForm.get('name');
  }

  get iconUrl(): AbstractControl {
    return this.patternLanguageForm.get('iconUrl');
  }

  ngOnInit(): void {
    const urlRegex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
    this.patternLanguageForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_-\s]+')]],
      iconUrl: ['', [Validators.required, Validators.pattern(urlRegex)]]
    });
    this.iconUrl.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((urlValue) => {
      this.iconPreviewVisible = urlValue && (urlValue.startsWith('https://') || urlValue.startsWith('http://'));
    });

    this.sectionDetailsGroup = this._fb.group({
      sectionsArray: this._fb.array([])
    });
  }

  createSection(sectionName: string): FormGroup {

    const form: FormGroup = new FormGroup(this.sectionFormModel);
    form.get('name').patchValue(sectionName);
    form.get('restrictionType').patchValue('some');
    return form;
  }

  @ViewChild('sectionInput') sectionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public dialogRef: MatDialogRef<CreateEditPatternLanguageComponent>, private  _fb: FormBuilder, private cdr: ChangeDetectorRef) {
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

  removeSectionMatChip(section: string): void {
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
    this.dialogRef.close();
  }

  save(): void {
    this.saveRequested = true;
    console.log(this.sectionsArray.value);
    if (this.patternLanguageForm.valid && this.sectionDetailsGroup.valid) {
      this.onSaveClicked.emit({
        sections: this.sectionsArray.value.map((sectionFormValue) => {
          return new Section(sectionFormValue.type, sectionFormValue.name, sectionFormValue.min, sectionFormValue.max);
        }),
        name: this.name.value, iconUrl: this.iconUrl.value
      });
      this.dialogRef.close();
    }
  }

  addSectionDetail(sectionName: string): void {
    (<FormArray>this.sectionsArray).push(new FormGroup({
      type: new FormControl('xsd:string', Validators.required),
      cardinality: new FormControl(0),
      restrictionType: new FormControl('only'),
      name: new FormControl(sectionName),
    }));
    console.log(this.sectionsArray);
    this.cdr.detectChanges();
  }

  get sectionsArray(): FormArray {
    return this.sectionDetailsGroup.get('sectionsArray') as FormArray;
  }

  nextStep(): void {
    this.saveRequested = true;
    this.patternLanguageForm.markAsTouched();
    (<any>Object).values(this.patternLanguageForm.controls).forEach(control => {
      control.markAsTouched();
    });
    if (this.patternLanguageForm.valid) {

      this.isFirstStep = false;
      while (this.sectionsArray.length > 0) {
        this.sectionsArray.removeAt(0);
      }
      this.sections.forEach((section) => this.addSectionDetail(section));
    }

  }

  getErrorMessage(formControl: AbstractControl): string {
    if (!formControl) {
      return '';
    }
    console.log(formControl.errors);
    if (formControl.hasError('required')) {
      return 'Dies ist ein Pflichtfeld.';
    }
    if (formControl.hasError('requiredPattern')) {
      return 'Bitte eine gültige URL eingeben.';
    }
    if (formControl.hasError('requiredPattern')) {
      return 'Bitte eine gültige URL eingeben.';
    }
    if (formControl.hasError('notUrlSafe')) {
      return 'Bitte keine speziellen Zeichen verwenden.';
    }
  }


  isCardinalityInputVisible(section: any): boolean {
    return section.value.restrictionType === 'max' || section.value.restrictionType === 'min' || section.value.restrictionType === 'exactly';
  }


}



import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { DialogPatternLanguageResult } from '../data/DialogPatternLanguageResult.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import PatternLanguage from '../../core/model/new/pattern-language.model';
import PatternSchema from '../../core/model/new/pattern-schema.model';
import PatternSectionSchema from '../../core/model/new/pattern-section-schema.model';

@Component({
    selector: 'pp-create-edit-pattern-language',
    templateUrl: './create-edit-pattern-language.component.html',
    styleUrls: ['./create-edit-pattern-language.component.scss']
})
export class CreateEditPatternLanguageComponent implements OnInit {
    sectionCtrl = new FormControl();
    sections: Array<string> = ['Icon', 'Context', 'Driving Question', 'Solution'];
    patternLanguageForm: FormGroup;
    iconPreviewVisible = false;
    saveRequested = false;

    @Output() saveClicked = new EventEmitter<DialogPatternLanguageResult>();

    get name(): AbstractControl {
        return this.patternLanguageForm.get('name');
    }

    get uri(): AbstractControl {
        return this.patternLanguageForm.get('uri');
    }

    get iconUrl(): AbstractControl {
        return this.patternLanguageForm.get('iconUrl');
    }

    constructor(public dialogRef: MatDialogRef<CreateEditPatternLanguageComponent>,
                private _fb: FormBuilder) {
    }

    ngOnInit(): void {
        // tslint:disable-next-line:max-line-length
        const urlRegex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
        this.patternLanguageForm = this._fb.group({
            name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 _-]+')]],
            uri: ['', [Validators.required, Validators.pattern(urlRegex)]],
            iconUrl: ['', [Validators.pattern(urlRegex)]]
        });

        this.iconUrl.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((urlValue) => {
            this.iconPreviewVisible = urlValue && (urlValue.startsWith('https://') || urlValue.startsWith('http://'));
        });
    }

    addSection(value: string) {
        if ((value || '').trim()) {
            if (this.sections.indexOf(value) < 0) {
                this.sections.push(value.trim());
                this.sectionCtrl.setValue(null);
            }
        }
    }

    dropSection(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    }

    removeSection(section: string): void {
        const index = this.sections.indexOf(section);
        if (index >= 0) {
            this.sections.splice(index, 1);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    save(): void {
        this.saveRequested = true;
        if (this.patternLanguageForm.valid) {
            const patternLanguage = new PatternLanguage();
            patternLanguage.uri = this.uri.value;
            patternLanguage.name = this.name.value;
            patternLanguage.logo = this.iconUrl.value;
            const patternSchema = new PatternSchema();
            patternSchema.patternSectionSchemas = [];
            for (let i = 0; i < this.sections.length; i++) {
                const patternSectionSchema = new PatternSectionSchema();
                patternSectionSchema.name = this.sections[i];
                patternSectionSchema.label = this.sections[i];
                patternSectionSchema.position = i;
                patternSectionSchema.type = 'any';
                patternSchema.patternSectionSchemas.push(patternSectionSchema);
            }
            patternLanguage.patternSchema = patternSchema;
            this.saveClicked.emit({
                patternLanguage: patternLanguage
            });
            this.dialogRef.close();
        }
    }
}

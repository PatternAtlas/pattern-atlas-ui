import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { DialogPatternLanguageResult } from '../../../pattern-language-management/data/DialogPatternLanguageResult.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import PatternLanguage from '../../model/hal/pattern-language.model';
import PatternSchema from '../../model/hal/pattern-schema.model';
import PatternSectionSchema from '../../model/hal/pattern-section-schema.model';
import {ActivatedRoute} from '@angular/router';
import UriEntity from '../../model/hal/uri-entity.model';

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
    isPatternLanguageDialog = true;

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
                private _fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.isPatternLanguageDialog = (this.activatedRoute.snapshot['_routerState']['url'] !== '/patternviews');
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

          if(!this.isPatternLanguageDialog){
            this.saveClicked.emit({
              dialogResult: <UriEntity> {uri: this.uri.value, name: this.name.value}
            });
            this.dialogRef.close();
            return;
          }


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
                dialogResult: patternLanguage
            });
            this.dialogRef.close();
        }
    }
}

import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {TdTextEditorComponent} from '@covalent/text-editor';
import {ActivatedRoute} from '@angular/router';
import {UriConverter} from '../../core/util/uri-converter';
import * as marked from 'marked';
import {TokensList} from 'marked';
import Pattern from '../../core/model/pattern.model';
import {ToasterService} from 'angular2-toaster';
import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {ValidationService} from '../../core/service/validation.service';
import {PatternLanguageService} from '../../core/service/pattern-language.service';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import PatternSectionSchema from '../../core/model/hal/pattern-section-schema.model';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katex';
import {PatternService} from '../../core/service/pattern.service';


@Component({
    selector: 'pp-create-pattern',
    templateUrl: './create-pattern.component.html',
  styleUrls: ['./create-pattern.component.scss']
})
export class CreatePatternComponent implements OnInit {


    patterns: Pattern[];
    encodedUri: string;
    wasSaveButtonClicked = false;
    patternValuesFormGroup: FormGroup;


    @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
    previousTextEditorValue = `# Pattern name`;

    options: any = {
        // todo: hide the preview button because it forces fullscreen mode (and destroys our page layout)
    };
    private errormessages: string[];
    private patternlanguage: PatternLanguage;
    private sections: string[];
    private markdown;
  private patternname: string;

    constructor(private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private toastService: ToasterService,
                private patternLanguageService: PatternLanguageService,
                private patternService: PatternService) {
    }


    ngOnInit() {
        this.encodedUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageUri'));

        this.markdown = new MarkdownIt();
        this.markdown.use(markdownitKatex);

        this.patternLanguageService.getPatternLanguageByEncodedUri(this.encodedUri).subscribe((pl: PatternLanguage) => {
            this.patternlanguage = pl;
            // tslint:disable-next-line:max-line-length
            this.sections = this.patternlanguage.patternSchema ?
                this.patternlanguage.patternSchema.patternSectionSchemas.map((schema: PatternSectionSchema) => schema.label) : [];
            this.initTextEditor();
          this.initFormGroup();
        });

    }

    save(): void {
      this.parsePatternInput();

        this.wasSaveButtonClicked = true;
        if (this.patternValuesFormGroup && !this.patternValuesFormGroup.valid) {
            console.log('patterns entries not valid');
            this.updateFormValidationErrors();
            return;
        }
      const patternUri = this.patternlanguage.uri + UriConverter.encodeUri(this.patternname);
      console.log(this.patternValuesFormGroup.value);
      this.patternService.savePattern(this.patternlanguage._links.patterns.href,
        {
          uri: patternUri,
          name: this.patternname,
          content: this.patternValuesFormGroup.value
        }
        ).subscribe(res => console.log(res));

    }

    parseMarkdownText(): TokensList {
        return marked.lexer(this._textEditor.value);
    }


    onChangeMarkdownText(): void {
        const currentText = this.parseMarkdownText();
        if (this.invalidTextEdit(currentText)) {
            // TODO
        }
        if (this.markdown) {
            document.getElementById('preview').innerHTML = this.markdown.render(this._textEditor.value);
        }
    }

    // returns if a user changed the value of the sections headers (which he is not allowed to do)
    private invalidTextEdit(currentText: marked.TokensList): boolean {
        if (!this.sections) {
            return false;
        }
        // we should find a corresponding line (= that starts with ## followed by section patternName) for each section
        for (const section of this.sections) {
            const indexOfCorrespondingLine = currentText.findIndex(line =>
                (line.type === 'heading' && line.depth === 2) &&
                this.ignoreCaseAndWhitespace(line.text) ===
                this.ignoreCaseAndWhitespace(this.addSpaceForCamelCase(section))
            );
            if (indexOfCorrespondingLine === -1) {
                return true;
            }
        }
        // there should be only one name (= line that starts with # )
        return !(currentText.filter(it => it.type === 'heading' && it.depth === 1).length === 1)
            || // there should be as many second headings as sections (= line that starts with # )
            !(currentText.filter(it => it.type === 'heading' && it.depth === 2).length === this.sections.length);

    }

  private parsePatternInput(): void {
        const lines = this.parseMarkdownText();
        const patternNameIndex = lines.findIndex((it) => it.type === 'heading' && it.depth === 1);
    this.patternname = patternNameIndex !== -1 ? lines[patternNameIndex]['text'] : '';
    this.patternlanguage.patternSchema.patternSectionSchemas.forEach((schema: PatternSectionSchema) => {
      const sectionName = schema.name;
            const sectionIndex = lines.findIndex((sec) => sec.type === 'heading' && sec.depth === 2 &&
              this.ignoreCaseAndWhitespace(sec.text) === this.ignoreCaseAndWhitespace(this.addSpaceForCamelCase(sectionName)));
            if (sectionIndex !== -1) {
                const sectioncontent = [];
                for (let i = sectionIndex + 1; i < lines.length; i++) {
                    if (lines[i].type === 'heading') {
                        break;
                    }
                    if (lines[i]['text']) {
                        // if a list item was parsed before, add it to the text
                        sectioncontent.push(i > 0 && this.isListItem(i, sectionIndex, lines) ? '* ' + lines[i]['text'] : lines[i]['text']);
                    }
                }
                if (this.patternValuesFormGroup) {
                  if (this.patternValuesFormGroup.controls[sectionName]) {
                    this.patternValuesFormGroup.controls[sectionName].setValue(sectioncontent.join('\n'));
                    } else {
                        console.log('missing formcontrol:');
                    console.log(sectionName);
                    }
                } else {
                    console.error('patternValuesFormGroup is undefined');
                }

            }


        });


  }


    ignoreCaseAndWhitespace(text: string): string {
        return text.trim().replace(new RegExp('/s', 'g'), '').toLowerCase();
    }

    addSpaceForCamelCase(text: string): string {
        return text.replace(/([a-z])([A-Z])/g, '$1 $2');
    }


    getDefaultTextForSection(section: string): string {
        return 'Enter your input for this section here.';
    }


    updateFormValidationErrors(): string {
        if (this.patternValuesFormGroup.valid) {
            return '';
        }
        this.errormessages = [];
        Object.keys(this.patternValuesFormGroup.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.patternValuesFormGroup.controls[key].errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    this.errormessages.push(ValidationService.getMessageForError(key, keyError, controlErrors[keyError]));
                });
            }
        });
    }

  // init formgroup based on patternschema
  private initFormGroup() {
    this.patternValuesFormGroup = new FormGroup({});
    if (this.patternlanguage && this.patternlanguage.patternSchema && this.patternlanguage.patternSchema.patternSectionSchemas) {
      this.patternlanguage.patternSchema.patternSectionSchemas.forEach((schema: PatternSectionSchema) => {
        this.patternValuesFormGroup.addControl(schema.name, new FormControl(''));
      });
    }
  }

    private initTextEditor(): void {
        for (const section of this.sections) {
            this.previousTextEditorValue = this.previousTextEditorValue.concat(
                '\n ## ' + section + '\n' + this.getDefaultTextForSection(section));
        }
        this._textEditor.value = this.previousTextEditorValue;
        this.onChangeMarkdownText();
    }


    private isListItem(i: number, sectionIndex: number, lines: marked.TokensList): boolean {
        for (let index = sectionIndex + 1; index < i; index++) {
            if (lines[index].type === 'list_item_start') {
                return true;
            }
        }
        return false;
    }
}

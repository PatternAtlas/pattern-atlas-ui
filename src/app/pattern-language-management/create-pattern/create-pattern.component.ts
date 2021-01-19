import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { ActivatedRoute, Router } from '@angular/router';
import * as marked from 'marked';
import { TokensList } from 'marked';
import Pattern from '../../core/model/pattern.model';
import { ToasterService } from 'angular2-toaster';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService } from '../../core/service/validation.service';
import { PatternLanguageService } from '../../core/service/pattern-language.service';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import PatternSectionSchema from '../../core/model/hal/pattern-section-schema.model';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katex';
import { PatternService } from '../../core/service/pattern.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { globals } from '../../globals';
import { UriConverter } from '../../core/util/uri-converter';


@Component({
  selector: 'pp-create-pattern',
  templateUrl: './create-pattern.component.html',
  styleUrls: ['./create-pattern.component.scss']
})
export class CreatePatternComponent implements OnInit {

  iconForm: FormGroup;
  patterns: Array<Pattern>;
  patternLanguageId: string;
  iconPreviewVisible = false;
  wasSaveButtonClicked = false;
  patternValuesFormGroup: FormGroup;
  previousTextEditorValue = '# Pattern name';
  options: any = {
    // todo: hide the preview button because it forces fullscreen mode (and destroys our page layout)
  };
  errorMessages: Array<string>;
  patternLanguage: PatternLanguage;
  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  private sections: Array<string>;
  private markdown;
  private patternName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private toastService: ToasterService,
              private patternLanguageService: PatternLanguageService,
              private patternService: PatternService,
              private router: Router,
              private zone: NgZone,
              private _fb: FormBuilder) {
  }

  get iconUrl(): AbstractControl {
    return this.iconForm.get('iconUrl');
  }

  static isListItem(i: number, sectionIndex: number, lines: marked.TokensList): boolean {
    for (let index = sectionIndex + 1; index < i; index++) {
      if (lines[ index ].type === 'list_item_start') {
        return true;
      }
    }
    return false;
  }


  ngOnInit() {
    this.patternLanguageId = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get(globals.pathConstants.patternLanguageId));
    this.markdown = new MarkdownIt();
    this.markdown.use(markdownitKatex);

    this.patternLanguageService.getPatternLanguageById(this.patternLanguageId).subscribe((pl: PatternLanguage) => {
      this.patternLanguage = pl;
      this.sections = this.patternLanguage.patternSchema ?
        this.patternLanguage.patternSchema.patternSectionSchemas.map((schema: PatternSectionSchema) => schema.label) : [];
      this.initTextEditor();
      this.initFormGroup();
    });

    const urlRegex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;  // eslint-disable-line max-len
    this.iconForm = this._fb.group({
      iconUrl: ['', [Validators.pattern(urlRegex)]]
    });

    this.iconUrl.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((urlValue) => {
      this.iconPreviewVisible = urlValue && (urlValue.startsWith('https://') || urlValue.startsWith('http://'));
    });
  }

  save(): void {
    this.parsePatternInput();

    this.wasSaveButtonClicked = true;
    if (this.patternValuesFormGroup && !this.patternValuesFormGroup.valid) {
      console.log('pattern entries not valid');
      this.updateFormValidationErrors();
      return;
    }
    // We send null as uri and let the backend create proper uris, which include camel cased names of patterns
    this.patternService.savePattern(this.patternLanguage._links.patterns.href,
      {
        uri: null,
        name: this.patternName,
        content: this.patternValuesFormGroup.value,
        iconUrl: this.iconForm.value.iconUrl
      }
    ).subscribe(
      () => {
        this.toastService.pop('success', 'Pattern successfully created');
        this.zone.run(() => {
          this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        });
      },
      (error) => this.toastService.pop('error', 'Could not create Pattern', error.message)
    );

  }

  //Format Input text so MAP Patterns can be directly copied into Pattern Atlas
  reformatMapPatternInput(text: string){
    return text.replace(new RegExp('<!--.*-->', 'g'), ' ')
      .replace(new RegExp('\{#sec:.*}', 'g'), ' ')
      .replace(new RegExp('#{3,}', 'g'), '##');
  }

  parseMarkdownText(): TokensList {
    return marked.lexer(this.reformatMapPatternInput(this._textEditor.value));
  }

  onChangeMarkdownText(): void {
    this.parsePatternInput();
    const currentText = this.parseMarkdownText();
    if (this.invalidTextEdit(currentText)) {
      // TODO
    }
    if (this.markdown) {
      document.getElementById('preview').innerHTML = this.markdown.render(this.reformatMapPatternInput(this._textEditor.value));
    }
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
    this.errorMessages = [];
    Object.keys(this.patternValuesFormGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.patternValuesFormGroup.controls[ key ].errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.errorMessages.push(ValidationService.getMessageForError(key, keyError, controlErrors[ keyError ]));
        });
      }
    });
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
    return !(currentText.filter(it => it.type === 'heading' && it.depth === 1).length === 1) ||
      // there should be as many second headings as sections (= line that starts with # )
      !(currentText.filter(it => it.type === 'heading' && it.depth === 2).length === this.sections.length);
  }

  private parsePatternInput(): void {
    const lines = this.parseMarkdownText();
    const patternNameIndex = lines.findIndex((it) => it.type === 'heading' && it.depth === 1);
    this.patternName = patternNameIndex !== -1 ? lines[ patternNameIndex ][ 'text' ] : '';
    this.patternLanguage.patternSchema.patternSectionSchemas.forEach((schema: PatternSectionSchema) => {
      const sectionName = schema.name;
      const sectionIndex = lines.findIndex((sec) => sec.type === 'heading' && sec.depth === 2 &&
        this.ignoreCaseAndWhitespace(sec.text) === this.ignoreCaseAndWhitespace(this.addSpaceForCamelCase(sectionName)));
      if (sectionIndex !== -1) {
        const sectionContent = [];
        for (let i = sectionIndex + 1; i < lines.length; i++) {
          if (lines[ i ].type === 'heading') {
            break;
          }
          if (lines[ i ].type === 'space') {
            sectionContent.push('\n');
          }
          if (lines[ i ][ 'text' ]) {
            // if a list item was parsed before, add it to the text
            sectionContent.push(i > 0 && CreatePatternComponent.isListItem(i, sectionIndex, lines) ? '* ' + lines[ i ][ 'text' ] : lines[ i ][ 'text' ] );
          }
          console.log('sectioncontent:'+sectionContent)
        }
        if (this.patternValuesFormGroup) {
          if (this.patternValuesFormGroup.controls[ sectionName ]) {
            this.patternValuesFormGroup.controls[ sectionName ].setValue(sectionContent.join('\n'));
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

  // init formgroup based on patternschema
  private initFormGroup() {
    this.patternValuesFormGroup = new FormGroup({});
    if (this.patternLanguage && this.patternLanguage.patternSchema && this.patternLanguage.patternSchema.patternSectionSchemas) {
      this.patternLanguage.patternSchema.patternSectionSchemas.forEach((schema: PatternSectionSchema) => {
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
}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { DefaultPlLoaderService } from '../../core/service/loader/default-pl-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IriConverter } from '../../core/util/iri-converter';
import { GithubPersistenceService } from '../../core/service/github-persistence.service';
import * as marked from 'marked';
import { TokensList } from 'marked';
import Pattern from '../../core/model/pattern.model';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import { ToasterService } from 'angular2-toaster';
import { PlRestrictionLoaderService } from '../../core/service/loader/pattern-language-loader/pl-restriction-loader.service';
import { PatternLanguageSectionRestriction, SectionRestrictionsResult } from '../../core/model/PatternLanguageSectionRestriction.model';
import PatternPedia from '../../core/model/pattern-pedia.model';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService } from '../../core/service/validation.service';
import { switchMap } from 'rxjs/internal/operators';
import { PatternLanguagePatterns } from '../../core/model/pattern-language-patterns.model';
import { LoadCompletePatternlanguageService } from '../../core/service/loader/complete-patternlanguage-loader.service';
import { CompletePatternlanguage } from '../../core/model/complete-patternlanguage.interface';


@Component({
  selector: 'pp-create-pattern',
  templateUrl: './create-pattern.component.html',
  styleUrls: ['./create-pattern.component.scss']
})
export class CreatePatternComponent implements OnInit {


  patterns: Pattern[];
  plIri: string;
  completePatternlanguageInfos: CompletePatternlanguage;
  plName: string;
  sections: string[];
  plRestrictions: Map<string, PatternLanguageSectionRestriction[]>;
  sectionRestrictions = new Map<string, SectionRestrictionsResult>();
  xsdPrefix = new PatternPedia().defaultPrefixes.get('xsd').replace('<', '').replace('>', '');
  wasSaveButtonClicked = false;
  patternValuesFormGroup: FormGroup;

  defaultTextForType: Map<string, string> =
    new Map([
      ['https://purl.org/dc/dcmitype/Image', '![](http://)'],
      [this.xsdPrefix + 'anyURI', '[](http://)'],
      [this.xsdPrefix + 'integer', 'Replace this line by an Integer.'],
      [this.xsdPrefix + 'string', ' Enter your input for this section here.'],
      [this.xsdPrefix + 'positiveInteger', 'Replace this line by a positive Integer.'],
      [this.xsdPrefix + 'nonNegativeInteger', 'Replace this line by a positive Integer.'],
      [this.xsdPrefix + 'nonPositiveInteger', 'Replace this line by a negative Integer.'],
      [this.xsdPrefix + 'negativeInteger', 'Replace this line by a negative Integer.'],
      [this.xsdPrefix + 'date', 'dd/MM/yyyy'],
    ]);

  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  previousTextEditorValue = `# Pattern name`;

  options: any = {
    // todo: hide the preview button because it forces fullscreen mode (and destroys our page layout)
  };
  private errormessages: string[];

  constructor(private plLoader: DefaultPlLoaderService,
              private PlRestrictionLoader: PlRestrictionLoaderService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private uploadService: GithubPersistenceService,
              private pos: PatternOntologyService,
              private toastService: ToasterService,
              private router: Router,
              private patternOntologyService: PatternOntologyService,
              private completePatternLanguageLoadingService: LoadCompletePatternlanguageService) {
  }


  ngOnInit() {
    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.plLoader.supportedIRI = this.plIri;

    this.completePatternLanguageLoadingService.loadCompletePatternLanguage(this.plIri).then(
      (completePL) => {
        this.completePatternlanguageInfos = completePL;
        this.plName = completePL.patternlanguage.name;
        this.patterns = completePL.patterns;
        this.PlRestrictionLoader.supportedIRI = this.plIri;
        this.sections = completePL.patternlanguage.sections;

        this.initRestrictions();
        this.initTextEditor();

      });

  }

  save(): void {
    const pattern = this.parsePatternInput();

    this.patterns.push(pattern);
    const patternIris = !this.patterns ? [] : this.patterns.map(p => p.iri);
    this.wasSaveButtonClicked = true;
    if (!this.patternValuesFormGroup.valid) {
      this.updateFormValidationErrors();
      return;
    }

    const patternLanguage = this.completePatternlanguageInfos.patternlanguage;
    patternLanguage.patternIRIs = patternIris;

    // patternLanguage.restrictions = restrictions;
    this.uploadService.updatePL(patternLanguage).pipe(
      switchMap(() => {
        return this.uploadService.updatePLPatterns(new PatternLanguagePatterns(IriConverter.getPatternListIriForPLIri(patternLanguage.iri),
          patternLanguage.iri, this.patterns));
      }), // load updated patternlanguage file into store:
      switchMap(() => {
        return this.pos.loadUrisToStore([{value: this.plIri, token: null}]);
      })
    ).subscribe(() => {
      this.toastService.pop('success', 'Pattern created');
      this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }, (error) => {
      this.toastService.pop('error', 'Something went wrong while creating the pattern: ' + error.message);
      console.log(error);
    });

  }

  getPatternUri(patternName: string, plIri: string): string {
    return IriConverter.getFileName(plIri) + '/' + IriConverter.removeWhitespace(patternName) + '#' + IriConverter.removeWhitespace(patternName);
  }

  parseMarkdownText(): TokensList {
    return marked.lexer(this._textEditor.value);
  }

  getSectionTitle(section: string): string {
    return section.split('#has')[1];
  }

  onChangeMarkdownText(): void {
    let currentText = this.parseMarkdownText();
    if (this.invalidTextEdit(currentText)) {
      console.log('invalid markdowntext detected, undoing last editing');
      this._textEditor.value = this.previousTextEditorValue;
      currentText = this.parseMarkdownText();
      this.toastService.pop('warning', 'Reset text', `Title of Sections changed, this is not allowed`);
    }
    document.getElementById('preview').innerHTML = marked.parser(currentText);
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
        this.ignoreCaseAndWhitespace(this.addSpaceForCamelCase(this.getSectionTitle(section)))
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

  private parsePatternInput(): Pattern {
    const lines = this.parseMarkdownText();
    const patternNameIndex = lines.findIndex((it) => it.type === 'heading' && it.depth === 1);
    const patternname = patternNameIndex !== -1 ? lines[patternNameIndex]['text'] : '';
    const sectionMap = new Map<string, string[]>();
    this.sections.forEach((section: string) => {
      const sectionIndex = lines.findIndex((sec) => sec.type === 'heading' && sec.depth === 2 &&
        this.ignoreCaseAndWhitespace(sec.text) === this.ignoreCaseAndWhitespace(this.addSpaceForCamelCase(this.getSectionTitle(section))));
      if (sectionIndex !== -1) {
        const sectioncontent = [];
        for (let i = sectionIndex + 1; i < lines.length; i++) {
          if (lines[i].type === 'heading') {
            break;
          }
          if (lines[i]['text']) {
            sectioncontent.push(lines[i]['text']);
          }
        }
        if (this.patternValuesFormGroup.controls[section]) {
          this.patternValuesFormGroup.controls[section].setValue(sectioncontent);
        } else {
          console.log('missing formcontrol:');
          console.log(section);
        }
        const sectionType = this.sectionRestrictions.get(section).type;


        for (let i = 0; i < sectioncontent.length; i++) {


            if (sectionType === this.xsdPrefix + 'anyURI') {
              sectioncontent[i] = '<' + sectioncontent[i] + '>';
            }
        }
        sectionMap.set(section, sectioncontent);

      }


    });


    return new Pattern(this.getPatternUri(patternname, this.plIri), patternname, sectionMap, this.plIri);

  }


  ignoreCaseAndWhitespace(text: string): string {
    return text.trim().replace(new RegExp('/s', 'g'), '').toLowerCase();
  }

  addSpaceForCamelCase(text: string): string {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  }


  getDefaultTextForSection(section: string): string {
    if (!this.plRestrictions) {
      return null;
    }
    const restrictionWithTypeIndex = this.plRestrictions.get(section).findIndex((rest: PatternLanguageSectionRestriction) => {
      return !!rest.type;
    });
    const sectionType = restrictionWithTypeIndex !== -1 ? this.plRestrictions.get(section)[restrictionWithTypeIndex].type : '';

    let defaultText = this.defaultTextForType.get(sectionType);
    if (!defaultText) {
      defaultText = 'Enter your input for this section here.';
    }
    const restrictions = this.sectionRestrictions.get(section);
    if (!restrictions) {
      return defaultText;
    }

    if (!restrictions.maxCardinality || restrictions.maxCardinality > 1) {
      // propose listitems if multiple entries are allowed
      defaultText = '* ' + defaultText;
    }
    if (restrictions.minCardinality > 1) {
      defaultText = (defaultText + '\n').repeat(restrictions.minCardinality - 1) + defaultText;
    }
    return defaultText;
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
          this.errormessages.push(ValidationService.getMessageForError(this.getSectionTitle(key), keyError, controlErrors[keyError]));
        });
      }
    });
  }

  // init formgroup based on restrictions
  private initRestrictions() {
    this.plRestrictions = this.completePatternlanguageInfos.patternlanguage.restrictions;
        this.patternValuesFormGroup = new FormGroup({});
        this.plRestrictions.forEach((value: PatternLanguageSectionRestriction[], key: string) => {
          const allRestrictions = this.PlRestrictionLoader.getRestrictionsForSection(key, this.plRestrictions.get(key));
          const validators = [];
          if (allRestrictions) {
            this.sectionRestrictions.set(key, allRestrictions);

            if (allRestrictions.minCardinality && allRestrictions.minCardinality > 0) {
              validators.push(Validators.required);
              validators.push(Validators.minLength(allRestrictions.minCardinality));
            }
            if (allRestrictions.maxCardinality) {
              validators.push(Validators.maxLength(allRestrictions.maxCardinality));
            }
            if (allRestrictions.type === 'https://purl.org/dc/dcmitype/Image') {

              validators.push(ValidationService.xsdImage());

            } else if (allRestrictions.type.startsWith(this.xsdPrefix) &&
              (allRestrictions.type.endsWith('integer') || allRestrictions.type.endsWith('positiveInteger') || allRestrictions.type.endsWith('negativeInteger'))) {
              validators.push(ValidationService.xsdInteger());
            } else if (allRestrictions.type.startsWith(this.xsdPrefix) && allRestrictions.type.endsWith('anyURI')) {
              validators.push(ValidationService.xsdAnyURI());
            }
          }
          this.patternValuesFormGroup.addControl(key,
            new FormControl(
              '', validators
            ));
          }
        );


  }

  private initTextEditor(): void {
    for (const section of this.completePatternlanguageInfos.patternlanguage.sections) {
      this.previousTextEditorValue = this.previousTextEditorValue.concat(
        '\n ## ' + this.addSpaceForCamelCase(this.getSectionTitle(section)) + '\n' + this.getDefaultTextForSection(section));
    }
    this._textEditor.value = this.previousTextEditorValue;
    this.onChangeMarkdownText();
  }



}

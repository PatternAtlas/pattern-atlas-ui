import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { DefaultPlLoaderService } from '../../core/service/loader/default-pl-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IriConverter } from '../../core/util/iri-converter';
import { Logo } from '../../core/service/data/Logo.interface';
import { GithubPersistenceService } from '../../core/service/github-persistence.service';
import * as marked from 'marked';
import { TokensList } from 'marked';
import Pattern from '../../core/model/pattern.model';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import { SectionResponse } from '../../core/service/data/SectionResponse.interface';
import { ToasterService } from 'angular2-toaster';
import { PlRestrictionLoaderService } from '../../core/service/loader/pattern-language-loader/pl-restriction-loader.service';
import { PatternLanguageSectionRestriction, SectionRestrictionsResult } from '../../core/model/PatternLanguageSectionRestriction.model';
import PatternPedia from '../../core/model/pattern-pedia.model';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService } from '../../core/service/validation.service';
import PatternLanguage from '../../core/model/pattern-language.model';
import { PatternInstance } from '../../core/model/PatternInstance.interface';
import { DefaultPatternLoaderService } from '../../core/service/loader/default-pattern-loader.service';
import { switchMap } from 'rxjs/internal/operators';
import { PatternLanguagePatterns } from '../../core/model/pattern-language-patterns.model';


@Component({
  selector: 'pp-create-pattern',
  templateUrl: './create-pattern.component.html',
  styleUrls: ['./create-pattern.component.scss']
})
export class CreatePatternComponent implements OnInit {


  patterns: PatternInstance[];
  plIri: string;
  plName: string;
  sections: string[];
  plLogos: string[];
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

  constructor(private loader: DefaultPlLoaderService,
              private PlRestrictionLoader: PlRestrictionLoaderService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private uploadService: GithubPersistenceService,
              private pos: PatternOntologyService,
              private toastService: ToasterService,
              private router: Router,
              private patternOntologyServce: PatternOntologyService,
              private patternLoaderService: DefaultPatternLoaderService) {
  }


  ngOnInit() {
    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.loader.supportedIRI = this.plIri;


    this.patternOntologyServce.loadUrisToStore([{value: this.plIri, token: null}]).then(() => {
      this.loadPatternInfos();
      this.plName = IriConverter.extractIndividualNameFromIri(this.plIri);
      this.PlRestrictionLoader.supportedIRI = this.plIri;

      this.loadRestrictionsAndInitPatternEditor();
      this.loadLogoData();
    });
  }

  reconstructSectionFromSectionesult(queryResult: SectionResponse): string {
    return queryResult.section.value;
  }



  containsMoreThanWhitespace(teststring: string): boolean {
    return !teststring.match(new RegExp('^\\s*$', 'g'));
  }


  save(): void {
    const pattern = this.parsePatternInput();

    const patternIris = !this.patterns ? [] : this.patterns.map(p => p.uri);
    patternIris.push(pattern.iri);

    const patternList = this.patterns.map(it => it.toPattern(this.plIri));
    patternList.push(pattern);

    const restrictions = [];
    this.wasSaveButtonClicked = true;
    if (!this.patternValuesFormGroup.valid) {
      this.updateFormValidationErrors();
      return;
    }
    for (const key of this.sections) {
      if (!this.plRestrictions.get(key)) {
        continue;
      }
      restrictions.push(...this.plRestrictions.get(key));
    }

    const patternLanguage = new PatternLanguage(this.plIri, this.plName, this.plLogos, patternIris, this.sections, restrictions, null);
    this.uploadService.updatePL(patternLanguage).pipe(
      switchMap(() => {
        return this.uploadService.updatePLPatterns(new PatternLanguagePatterns(IriConverter.getPatternListIriForPLIri(patternLanguage.iri),
          patternLanguage.iri, patternList));
      }),
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
    // we should find a corresponding line (= that starts with ## followed by section name) for each section
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
    // there should be only one patternname (= line that starts with # )
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

  private loadPatternInfos() {
    this.loader.getOWLImports(this.plIri)
      .then(res => {
          const importedPatternIris = res.map(i => i.import);

          this.pos.loadUrisToStore(importedPatternIris).then(() => {

            this.loader.loadContentFromStore()
              .then(result => {
                this.patterns = Array.from(result.values());
                if (this.patterns) {
                  this.loadPatternSections();

                }
                this.cdr.detectChanges();
              });
          });
      });
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

  private loadRestrictionsAndInitPatternEditor() {
    this.loader.getPLSections(this.plIri).then((res: SectionResponse[]) => {
      this.sections = res.map((iri: any) => {
        return this.reconstructSectionFromSectionesult(iri);
      });
      this.PlRestrictionLoader.loadContentFromStore().then((response: any) => {
        this.plRestrictions = response;
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


        for (const section of this.sections) {
          this.previousTextEditorValue = this.previousTextEditorValue.concat(
            '\n ## ' + this.addSpaceForCamelCase(this.getSectionTitle(section)) + '\n' + this.getDefaultTextForSection(section));
        }
        this._textEditor.value = this.previousTextEditorValue;
        this.onChangeMarkdownText();
      });


    });

  }

  private loadLogoData() {
    this.loader.getPLLogo(this.plIri).then((res: Logo[]) => {
      this.plLogos = res.map((dataRessponse: Logo) => {
        return dataRessponse.logo.value;
      });
    });
  }

  async loadPatternSections() {
    for (let i = 0; i < this.patterns.length; i++) {
      this.patternLoaderService.patternIri = this.patterns[i].uri;
      this.patternLoaderService.supportedIRI = IriConverter.getPatternListIriForPLIri(this.plIri);
      const sectionProperties = await this.patternLoaderService.selectContentFromStore();

      const secMap = new Map<string, string[]>();
      for (let i = 0; i < sectionProperties.length; i++) {
        if (!secMap.get(sectionProperties[i].predicate.value)) {
          secMap.set(sectionProperties[i].property.value, [sectionProperties[i].predicate.value]);
        } else {
          const valArray = secMap.get(sectionProperties[i].predicate.value);
          valArray.push(sectionProperties[i].property.value);
          secMap.set(sectionProperties[i].property.value, valArray);
        }
      }
      this.patterns[i].sectionProperties = secMap;
    }
  }
}

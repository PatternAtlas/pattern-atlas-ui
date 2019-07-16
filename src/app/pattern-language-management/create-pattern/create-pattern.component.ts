import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import PatternLanguage from '../../core/model/pattern-language.model';
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
import { PatternLanguageSectionRestriction } from '../../core/model/PatternLanguageSectionRestriction.model';
import { switchMap } from 'rxjs/internal/operators';


@Component({
  selector: 'pp-create-pattern',
  templateUrl: './create-pattern.component.html',
  styleUrls: ['./create-pattern.component.scss']
})
export class CreatePatternComponent implements OnInit {


  patterns: any;
  plIri: string;
  plName: string;
  sections: string[];
  plLogos: string[];
  plRestrictions: Map<string, PatternLanguageSectionRestriction[]>;


  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  patternLanguageStructure = `# Pattern name`;

  options: any = {
    // todo: hide the preview button because it forces fullscreen mode (and destroys our page layout)
  };

  constructor(private loader: DefaultPlLoaderService,
              private PlRestrictionLoader: PlRestrictionLoaderService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private uploadService: GithubPersistenceService,
              private pos: PatternOntologyService,
              private toastService: ToasterService,
              private router: Router,
              private patternOntologyServce: PatternOntologyService) {
  }


  ngOnInit() {
    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.loader.supportedIRI = this.plIri;

    this.patternOntologyServce.loadUriToStore(this.plIri).then(() => {
      this.loadPatternInfos();
      this.plName = IriConverter.extractIndividualNameFromIri(this.plIri);
      this.PlRestrictionLoader.supportedIRI = this.plIri;

      this.loadRestrictionsAndInitPatternEditor();
      this.loadLogoData();
    });
  }

  reconstructSectionFromSectionesult(queryResult: SectionResponse): string {
    return queryResult.section.value.split('#has')[1];
  }



  containsMoreThanWhitespace(teststring: string): boolean {
    return !teststring.match(new RegExp('^\\s*$', 'g'));
  }


  save(): void {
    const pattern = this.parsePatternInput();
    const patternIris = this.patterns.length === 0 ? [] : this.patterns.map(p => p.uri);
    patternIris.push(pattern.iri);

    const restrictions = [];
    for (const key of this.sections) {
      if (!this.plRestrictions.get(key)) {
        continue;
      }
      restrictions.push(...this.plRestrictions.get(key));
    }
    const patternLanguage = new PatternLanguage(this.plIri, this.plName, this.plLogos, patternIris, this.sections, restrictions, null);
    this.uploadService.updatePL(patternLanguage).pipe(
      switchMap(() => {
        return this.uploadService.uploadPattern(pattern, patternLanguage);
      }),
      switchMap(() => {
        return this.pos.loadQueriedIrisToStore([{value: this.plIri, token: null}]);
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

  onChangeMarkdownText(): void {

    document.getElementById('preview').innerHTML = marked.parser(this.parseMarkdownText());
  }

  private parsePatternInput(): Pattern {
    const lines = this.parseMarkdownText();
    const patternNameIndex = lines.findIndex((it) => it.type === 'heading' && it.depth === 1);
    const patternname = patternNameIndex !== -1 ? lines[patternNameIndex]['text'] : '';
    const sectionMap = new Map<string, string | string[]>();
    this.sections.forEach((section: string) => {
      const sectionIndex = lines.findIndex((it) => it.type === 'heading' && it.depth === 2 &&
        this.ignoreCaseAndWhitespace(it.text) === this.ignoreCaseAndWhitespace(this.addSpaceForCamelCase(section)));
      if (sectionIndex !== -1) {
        let sectioncontent = '';
        for (let i = sectionIndex + 1; i < lines.length; i++) {
          if (lines[i].type === 'heading') {
            break;
          }
          sectioncontent = sectioncontent + lines[i]['text'] ? lines[i]['text'] : '';
        }
        sectionMap[section] = sectioncontent;
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
    const prefix = 'http://www.w3.org/2001/XMLSchema#';
    if (!this.plRestrictions) {
      return null;
    }
    const restrictionWithTypeIndex = this.plRestrictions.get(section).findIndex((rest: PatternLanguageSectionRestriction) => {
      return !!rest.type;
    });
    const sectionType = restrictionWithTypeIndex !== -1 ? this.plRestrictions.get(section)[restrictionWithTypeIndex].type : '';
    if (sectionType === (prefix + 'positiveInteger') || (sectionType === 'xsd:positiveInteger')) {
      return 'Enter a positive Integer.';
    }
    if (sectionType === (prefix + 'string') || (section === 'xsd:string')) {
      return 'Enter your text for this section here.';
    }
    if (sectionType === (prefix + 'anyURI') || (section === 'xsd:anyURI')) {
      return '<Enter/your/URI/or/URL>';
    }
    return 'Enter your input for this section here.';
  }

  private loadPatternInfos() {
    this.loader.getOWLImports(this.plIri)
      .then(res => {
          const importedPatternIris = res.map(i => i.import);
        this.pos.loadQueriedIrisToStore(importedPatternIris).then(() => {
            this.loader.loadContentFromStore()
              .then(result => {
                this.patterns = Array.from(result.values());
                this.cdr.detectChanges();
              });
          });
        }
      );
  }

  private loadRestrictionsAndInitPatternEditor() {
    this.loader.getPLSections(this.plIri).then((res: SectionResponse[]) => {
      console.log('sections: ');
      console.log(res);
      this.sections = res.map((iri: any) => {
        return this.reconstructSectionFromSectionesult(iri);
      });
      console.log('parsed sections: ');
      console.log(this.sections);
      this.PlRestrictionLoader.loadContentFromStore().then((response: any) => {
        this.plRestrictions = response;
        console.log(this.plRestrictions);
        for (const section of this.sections) {
          this.patternLanguageStructure = this.patternLanguageStructure.concat(
            '\n ## ' + this.addSpaceForCamelCase(section) + '\n' + this.getDefaultTextForSection(section));
        }
        this._textEditor.value = this.patternLanguageStructure;
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
}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import PatternLanguage from '../../core/model/pattern-language.model';
import { DefaultPlLoaderService } from '../../core/service/loader/default-pl-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IriConverter } from '../../core/util/iri-converter';
import { Logo } from '../../core/service/data/Logo.interface';
import { GithubPersistenceService } from '../../core/service/github-persistence.service';
import { switchMap } from 'rxjs/internal/operators';
import * as marked from 'marked';
import { TokensList } from 'marked';
import Pattern from '../../core/model/pattern.model';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import { Section } from '../../core/model/section.model';
import { SectionResponse } from '../../core/service/data/SectionResponse.interface';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'pp-create-pattern',
  templateUrl: './create-pattern.component.html',
  styleUrls: ['./create-pattern.component.scss']
})
export class CreatePatternComponent implements OnInit {


  patterns: any;
  plIri: string;
  plName: string;
  sections: Section[];
  plLogos: string[];


  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  patternLanguageStructure = `# Pattern name`;

  options: any = {
    // todo: hide the preview button because it forces fullscreen mode (and destroys our page layout)
  };

  constructor(private loader: DefaultPlLoaderService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private uploadService: GithubPersistenceService,
              private pos: PatternOntologyService,
              private toastService: ToasterService,
              private router: Router) {
  }


  ngOnInit() {
    this.loader.supportedIRI = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.loader.getOWLImports(this.plIri)
      .then(res => {
          console.log(res);
          const importedPatternIris = res.map(i => i.import);
          this.pos.loadUrisToStore(importedPatternIris).then(() => {
            this.loader.loadContentFromStore()
              .then(result => {
                this.patterns = Array.from(result.values());
                this.cdr.detectChanges();
              });
          });
        }
      );

    this.plName = IriConverter.extractIndividualNameFromIri(this.plIri);

    this.loader.getPLSections(this.plIri).then((res: SectionResponse[]) => {
      this.sections = res.map((iri: any) => {
        return this.reconstructSectionFromQueryResult(iri);
      });
      for (const section of this.sections) {
        this.patternLanguageStructure = this.patternLanguageStructure.concat(
          '\n ## ' + this.addSpaceForCamelCase(section.name) + '\n' + this.getDefaultTextForSection(section));
      }
      this._textEditor.value = this.patternLanguageStructure;
      this.onChangeMarkdownText();
    });

    this.loader.getPLLogo(this.plIri).then((res: Logo[]) => {
      this.plLogos = res.map((dataRessponse: Logo) => {
        return dataRessponse.logo.value;
      });
    });


  }


  reconstructSectionFromQueryResult(queryResult: SectionResponse): Section {
    return <Section>{
      name: queryResult.property.value.split('#has')[1],
      min: queryResult.cardinality ? 1 : null,
      max: queryResult.cardinality ? 1 : null,
      type: queryResult.dataRange.value
    };
  }

  private matchesOne(string: string): boolean {
    return !!string.match(('1'));
  }


  containsMoreThanWhitespace(teststring: string): boolean {
    return !teststring.match(new RegExp('^\\s*$', 'g'));
  }


  save(): void {
    const pattern = this.parsePatternInput();
    const patternIris = this.patterns.map(p => p.uri);
    patternIris.push(pattern.iri);
    const patternLanguage = new PatternLanguage(this.plIri, this.plName, this.plLogos, patternIris, this.sections);

    this.uploadService.updatePL(patternLanguage).pipe(
      switchMap(() => {
        return this.uploadService.uploadPattern(pattern, patternLanguage);
      })
    ).subscribe(() => {
      this.toastService.pop('success', 'Pattern created');
      this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }, (error) => this.toastService.pop('error', 'Something went wrong whilecreating the pattern: ' + error.message));

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

    this.sections.forEach((section: Section) => {
      const sectionIndex = lines.findIndex((it) => it.type === 'heading' && it.depth === 2 &&
        this.ignoreCaseAndWhitespace(it.text) === this.ignoreCaseAndWhitespace(this.addSpaceForCamelCase(section.name)));
      if (sectionIndex !== -1) {
        let sectioncontent = '';
        for (let i = sectionIndex + 1; i < lines.length; i++) {
          if (lines[i].type === 'heading') {
            break;
          }
          sectioncontent = sectioncontent + lines[i]['text'] ? lines[i]['text'] : '';
        }
        sectionMap[section.name] = sectioncontent;
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


  getDefaultTextForSection(section: Section): string {
    console.log(section.type);
    const prefix = 'http://www.w3.org/2001/XMLSchema#';
    if (section.type === (prefix + 'positiveInteger') || (section.type === 'xsd:positiveInteger')) {
      return 'Enter a positive Integer.';
    }
    if (section.type === (prefix + 'string') || (section.type === 'xsd:string')) {
      return 'Enter your text for this section here.';
    }
    if (section.type === (prefix + 'anyURI') || (section.type === 'xsd:anyURI')) {
      return '<Enter/your/URI/or/URL>';
    }
    return 'Enter your input for this section here.';
  }
}

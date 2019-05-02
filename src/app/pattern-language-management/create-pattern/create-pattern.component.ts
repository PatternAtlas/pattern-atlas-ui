import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import PatternLanguage from '../../core/model/pattern-language.model';
import { DefaultPlLoaderService } from '../../core/service/loader/default-pl-loader.service';
import { ActivatedRoute } from '@angular/router';
import { IriConverter } from '../../core/util/iri-converter';
import { Property } from '../../core/service/data/Property.interface';
import * as marked from 'marked';
import { Logo } from '../../core/service/data/Logo.interface';


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

  constructor(private loader: DefaultPlLoaderService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loader.supportedIRI = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.plName = IriConverter.getPLNameFromIri(this.plIri);
    this.loader.loadContentFromStore()
      .then(result => {
        this.patterns = Array.from(result.entries());
        this.cdr.detectChanges();
      });

    this.loader.getPLProperties(this.plIri).then((res: Property[]) => {
      console.log(res);
      const sectionNames = res.map((iri: Property) => {
        return this.convertIrisToSectionName(iri);
      });
      for (const section of sectionNames) {
        this.patternLanguageStructure = this.patternLanguageStructure.concat('\n ## ' + section.replace(/([a-z])([A-Z])/g, '$1 $2'));
      }
      this._textEditor.value = this.patternLanguageStructure;
      this.onChangeMarkdownText();
    });

    this.loader.getPLLogo(this.plIri).then((res: Logo[]) => {
      console.log(res);
      this.plLogos = res.map((dataRessponse: Logo) => {
        return dataRessponse.logo.value;
      });
      console.log(this.plLogos);
    });
  }

  convertIrisToSectionName(iri: Property): string {
    return iri.property.value.split('#has')[1];
  }
  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  patternLanguageStructure = `# Pattern name`;

  options: any = {
    // todo: hide the preview button because it forces fullscreen mode (and destroys our page layout)
  };

  getPatternLanguageDefinition(): PatternLanguage {
    const linesWithText = this._textEditor.value.split('\n').filter((line) => this.containsMoreThanWhitespace(line));
    const plName = linesWithText.filter((line) => this.matchPatternLanguageName(line))[0].replace('#', '').trim();
    return new PatternLanguage('http://purl.org/patternpedia/' + plName, plName, [], []);
  }

  containsMoreThanWhitespace(teststring: string): boolean {
    return !teststring.match(new RegExp('^\\s*$', 'g'));
  }

  matchPatternLanguageName(teststring: string): boolean {
    return /^(\s)?#\s.*$/.test(teststring);
  }

  matchSectionLabel(teststring: string): boolean {
    return /^(\s)?##\s.*$/.test(teststring);
  }

  save(): void {
    const patternLanguage = new PatternLanguage(this.plIri, this.plName, this.plLogos, [''], this.sections);
    // this._patternOntologieService.insertNewPatternIndividual(this.getPatternLanguageDefinition());
    // TODO: persist save
  }

  onChangeMarkdownText(changedText?: string): void {
    const tokens = changedText ? marked.lexer(changedText) : marked.lexer(this._textEditor.value);
    console.log(tokens);
    document.getElementById('preview').innerHTML = marked.parser(tokens);
  }

}

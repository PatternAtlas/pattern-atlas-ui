import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import SimpleMDE from 'simplemde/src/js/simplemde.js';
import PatternLanguage from '../../core/model/pattern-language.model';
import { DefaultPlLoaderService } from '../../core/service/loader/default-pl-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IriConverter } from '../../core/util/iri-converter';
import { Property } from '../../core/service/data/Property.interface';

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

  constructor(private loader: DefaultPlLoaderService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private zone: NgZone,
              private router: Router) {
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
      console.log(sectionNames);


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

  ngAfterViewInit(): void {

    // unfortunately there is no change method in the angular wrapper, so we have to access the unterlying javascript component
    const markdownEditor = this._textEditor;
    this._textEditor.simpleMDE.codemirror.on('change', function () {
      document.getElementById('preview').innerHTML = SimpleMDE.prototype.markdown(markdownEditor.value);
    });
    // trigger on change initially to set preview
    this._textEditor.value = this.patternLanguageStructure;


  }


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
    // this._patternOntologieService.insertNewPatternIndividual(this.getPatternLanguageDefinition());
    // TODO: persist save
  }

}

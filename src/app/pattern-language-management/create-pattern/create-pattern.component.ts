import { Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import SimpleMDE from 'simplemde/src/js/simplemde.js';
import { PatternOntologyService } from '../../core/service/pattern-ontology.service';
import PatternLanguage from '../../core/model/pattern-language.model';

@Component({
  selector: 'pp-create-pattern',
  templateUrl: './create-pattern.component.html',
  styleUrls: ['./create-pattern.component.scss']
})
export class CreatePatternComponent implements OnInit {


  ngOnInit() {
  }


  constructor(private _patternOntologieService: PatternOntologyService) {
  }

  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  patternLanguageStructure = `# Patternlanguage name 
  \n [link to your icon](http://placekitten.com/200/300)
  \n ## Driving Question 
  \n ## Context 
  \n ## Solution 
  \n ## Solution Sketches 
  \n ## Result 
  \n ## Related Patterns 
  \n ## Icon `;

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
    return new PatternLanguage('http://purl.org/patternpedia/patternlanguages/' + plName, plName, [], []);
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
    this._patternOntologieService.insertNewPatternLanguageIndividual(this.getPatternLanguageDefinition());
    // TODO: persist save
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import SimpleMDE from 'simplemde/src/js/simplemde.js';

@Component({
  selector: 'pp-create-edit-pattern-language',
  templateUrl: './create-edit-pattern-language.component.html',
  styleUrls: ['./create-edit-pattern-language.component.scss']
})
export class CreateEditPatternLanguageComponent implements OnInit, AfterViewInit {

  constructor() { }

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
    this._textEditor.simpleMDE.codemirror.on('change', function(){
      console.log(SimpleMDE.prototype.markdown(markdownEditor.value));
      document.getElementById('preview').innerHTML = SimpleMDE.prototype.markdown(markdownEditor.value);
    });
    // trigger on change initially to set preview
    this._textEditor.value = this.patternLanguageStructure;


  }

  ngOnInit() {


  }


}

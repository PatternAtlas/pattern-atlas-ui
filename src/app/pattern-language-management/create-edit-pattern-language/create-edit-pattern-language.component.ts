import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TdTextEditorComponent} from '@covalent/text-editor';
import SimpleMDE from 'simplemde/src/js/simplemde.js';

@Component({
  selector: 'pp-create-edit-pattern-language',
  templateUrl: './create-edit-pattern-language.component.html',
  styleUrls: ['./create-edit-pattern-language.component.scss']
})
export class CreateEditPatternLanguageComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;


  options: any = {
    // todo: hide the preview button because it forces fullscreen mode (and destroys our page layout)
  };

  ngAfterViewInit(): void {

    // unfortunately there is no change method in the angular wrapper, so we have to access the unterlying javascript component
    var markdownEditor = this._textEditor;
    this._textEditor.simpleMDE.codemirror.on('change', function(){
      console.log(SimpleMDE.prototype.markdown(markdownEditor.value));
      document.getElementById('preview').innerHTML = SimpleMDE.prototype.markdown(markdownEditor.value);
    });


  }

  ngOnInit() {


  }


}

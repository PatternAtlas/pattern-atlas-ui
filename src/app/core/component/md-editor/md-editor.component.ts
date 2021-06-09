import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { MarkdownEditorUtils } from '../../util/markdown-editor-utils';
import Pattern from '../../model/hal/pattern.model';
import { PatternService } from '../../service/pattern.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export class DialogData {

  field: string;
  label?: string;
  content: string;
  patternLanguageId: string;
}

@Component({
  selector: 'pp-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss']
})
export class MdEditorComponent implements OnInit {

  @ViewChild('mdEditor') private _textEditor: TdTextEditorComponent;
  private intialContent: string;
  patterns: Array<Pattern>;
  selectedPatternForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<MdEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private patternService: PatternService,
              private _fb: FormBuilder) {
    if (!data.label) {
      data.label = data.field;
    }
    this.intialContent = data.content;
    // We revert changes and close modal at click on backdrop
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close({ field: this.data.field, content: this.intialContent });
    });
    // We revert changes and close modal at hitting ESC
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.code === 'Escape') {
        this.dialogRef.close({ field: this.data.field, content: this.intialContent });
      }
    });
  }

  options: any = {
    autoDownloadFontAwesome: true,
    toolbar:
      [...MarkdownEditorUtils.standardMarkdownEditiorButtons,
        {
          name: 'latex-environment',
          action: (editor) => {
            MarkdownEditorUtils.insertTextAtCursor(editor, '$', '$');
          },
          className: 'fa fa-subscript',
          title: 'Add Formula',
        },
        '|', // Separator
        MarkdownEditorUtils.helpButton,
        'preview'
      ],
  };

  ngOnInit() {
    this.patternService.getPatternsById(this.data.patternLanguageId).subscribe(res => this.patterns = res);
    this.selectedPatternForm = this._fb.group({
      selectedPattern: ['', []]
    });
  }

  close(): void {
    this.dialogRef.close({ field: this.data.field, content: this.intialContent });
  }

  saveChanges(): void {
    this.dialogRef.close({ field: this.data.field, content: this._textEditor.value });
  }

  revert(): void {
    this._textEditor.value = this.intialContent;
  }

  addReference() {
    const pattern = this.selectedPatternForm.controls['selectedPattern'].value;
    MarkdownEditorUtils.insertTextAtCursor(this._textEditor.simpleMDE, MarkdownEditorUtils.getPatternHrefMarkdown(this.data.patternLanguageId, pattern), '');
  }
}

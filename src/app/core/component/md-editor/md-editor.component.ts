import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TdTextEditorComponent } from '@covalent/text-editor';

export class DialogData {
    field: string;
    label?: string;
    content: string;
}

@Component({
  selector: 'pp-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss']
})
export class MdEditorComponent {

    @ViewChild('mdEditor') private _textEditor: TdTextEditorComponent;
    private intialContent: string;

    constructor(public dialogRef: MatDialogRef<MdEditorComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
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

    close(): void {
      this.dialogRef.close({ field: this.data.field, content: this.intialContent });
    }

    saveChanges(): void {
      this.dialogRef.close({ field: this.data.field, content: this._textEditor.value });
    }

    revert(): void {
      this._textEditor.value = this.intialContent;
    }

}

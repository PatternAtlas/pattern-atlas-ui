import { Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';

@Component({
    selector: 'pp-image-editor',
    templateUrl: './image-editor.component.html',
    styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit {
    @ViewChild('mdEditor') private _textEditor: TdTextEditorComponent;
    private intialContent: string;
    constructor() {
    }

    ngOnInit() {
    }

}

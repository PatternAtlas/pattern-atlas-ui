import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Stackedit from 'stackedit-js';

@Component({
    selector: 'pp-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    textValue: string;
    stackedit: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        console.log('HELLO');
        // this.doStuff();
        this.stackedit = new Stackedit();
        this.stackedit.on('fileChange', (file) => {
            console.log(file);
        });

        this.stackedit.on('close', (file) => {
            console.log(file);
        });
    }

    async doStuff() {
        this.stackedit.openFile({
            name: 'Filename', // with a filename
            content: {
                text: this.textValue // and the Markdown content.
            }
        });
    }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'pp-action-button-bar',
    templateUrl: './action-button-bar.component.html',
    styleUrls: ['./action-button-bar.component.scss']
})
export class ActionButtonBarComponent implements OnInit {
    @Output() addClicked = new EventEmitter<void>();
    @Output() add2Clicked = new EventEmitter<void>();
    @Output() reloadClicked = new EventEmitter<void>();
    @Input() addButtonText: string;
    @Input() reloadButton = false;
    @Input() goBackButton = true;
    @Input() secondAddButton: boolean;
    @Input() secondAddButtonText: string;

    constructor() {
    }

    ngOnInit() {
    }

    addButtonClicked() {
        this.addClicked.emit();
    }

    reloadButtonClicked() {
        this.reloadClicked.emit();
    }


    secondAddButtonClicked() {
        this.add2Clicked.emit();
    }
}

import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pp-action-button-bar',
  templateUrl: './action-button-bar.component.html',
  styleUrls: ['./action-button-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ActionButtonBarComponent implements OnInit {
  @Output() addClicked = new EventEmitter<void>();
  @Output() add2Clicked = new EventEmitter<void>();
  @Output() reloadClicked = new EventEmitter<void>();
  @Output() changedText = new EventEmitter<void>();
  @Input() addButtonText: string;
  @Input() reloadButton = false;
  @Input() goBackButton = true;
  @Input() secondAddButton: boolean;
  @Input() firstAddButton = true;
  @Input() secondAddButtonText: string;

    @Input() back = false;
    @Output() backClicked = new EventEmitter<void>();

    @Input() displayText: string;

    constructor(private cdr: ChangeDetectorRef,
              private applicationRef: ApplicationRef) {
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

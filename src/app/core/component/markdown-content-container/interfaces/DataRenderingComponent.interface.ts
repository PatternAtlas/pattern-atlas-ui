import { EventEmitter } from '@angular/core';

export class DataRenderingComponent {
  data: string;

  title: string;

  changeContent: EventEmitter<DataChange>;
  isEditingEnabled = false;
  isCommentingEnabled = false;

  constructor() {
  }

}

export class DataChange {
  previousValue: string;
  currentValue: string;
}

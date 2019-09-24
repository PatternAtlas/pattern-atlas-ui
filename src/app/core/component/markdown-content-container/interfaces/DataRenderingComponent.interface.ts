import { EventEmitter } from '@angular/core';

export class DataRenderingComponent {
  data: string;

  title: string;

  changeContent: EventEmitter<string>;
  isEditingEnabled = false;

  constructor() {
  }
}

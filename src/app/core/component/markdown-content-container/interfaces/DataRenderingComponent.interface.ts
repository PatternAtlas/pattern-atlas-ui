import { EventEmitter } from '@angular/core';

export class DataRenderingComponent {
  data: any;

  title: string;

  changeContent: EventEmitter<string>;
  isEditingEnabled = false;

  constructor() {
  }
}

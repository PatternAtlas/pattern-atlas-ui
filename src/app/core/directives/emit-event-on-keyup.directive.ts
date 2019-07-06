import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ppEmitOnChange]'
})
export class EmitEventOnKeyupDirective {

  constructor() {
  }

  @Output('onKeyup') keyUpEventEmitter = new EventEmitter<any>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.keyUpEventEmitter.emit();
  }

}

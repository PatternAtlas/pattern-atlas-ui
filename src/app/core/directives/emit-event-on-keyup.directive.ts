import { Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Directive({
  selector: '[ppEmitOnChange]'
})
export class EmitEventOnKeyupDirective implements OnInit, OnDestroy {

  constructor() {
  }

  @Output('onKeyup') keyUpEventEmitter = new EventEmitter<any>(); // eslint-disable-line
  // @angular-eslint/no-output-rename

  private clicks = new Subject();

  ngOnInit(): void {
    // delay trigggering click events and don't trigger it if nothing changed
    this.clicks.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((e) => {
      this.keyUpEventEmitter.emit(e);
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnDestroy(): void {
    this.clicks.unsubscribe();
  }

}

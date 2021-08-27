import { Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[ppGraphEventEmmiter]'
})
export class EmitEventOnAddedEdgeDirective implements OnInit, OnDestroy {
  @Output('onAddedEdge') edgeAddedEventEmitter = new EventEmitter<any>(); // eslint-disable-line
  // @angular-eslint/no-output-rename
  @Output('onRemovedEdge') edgeRemovedEventEmitter = new EventEmitter<any>(); // eslint-disable-line
  // @angular-eslint/no-output-rename
  @Output('onClickedNode') nodeClickedEventEmitter = new EventEmitter<any>(); // eslint-disable-line
  // @angular-eslint/no-output-rename
  @Output('onClickedBackground') backgroundClickedEventEmitter = new EventEmitter<any>(); // eslint-disable-line
  // @angular-eslint/no-output-rename
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output('onNodePositionChange') onNodePositionChangeEventEmitter = new EventEmitter<any>(); // eslint-disable-line
  // @angular-eslint/no-output-rename

  constructor() {
  }

  private movements = new Subject();
  private unsubscribe: Subject<void> = new Subject();

  ngOnInit(): void {
    // delay trigggering click events and don't trigger it if nothing changed
    this.movements.pipe(
      debounceTime(1000),
      takeUntil(this.unsubscribe)
    ).subscribe((e) => {
      this.onNodePositionChangeEventEmitter.emit(e);
    });
  }

  @HostListener('edgeadd', ['$event']) onEdgeAdd($event) {
    this.edgeAddedEventEmitter.emit($event);
  }

  @HostListener('edgeremove', ['$event']) onEdgeRemove($event) {
    this.edgeRemovedEventEmitter.emit($event);
  }

  @HostListener('nodeclick', ['$event']) onNodeClick($event) {
    console.log('click-event', $event);
    if ($event.details && $event.details.key === 'image-clicked') {
      console.log('image');
      // $event.preventDefault();
      // return;
    }

    this.nodeClickedEventEmitter.emit($event);

  }

  @HostListener('backgroundclick', ['$event']) onBackgroundClick($event) {
    console.log($event);
    if ($event.details && $event.details.key === 'image-clicked') {
      console.log('image');
    }
    this.backgroundClickedEventEmitter.emit($event);
  }

  @HostListener('nodepositionchange', ['$event']) onNodePositionChange(event) {
    this.movements.next(event);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}

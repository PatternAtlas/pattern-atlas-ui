import {Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[ppGraphEventEmmiter]'
})
export class EmitEventOnAddedEdgeDirective implements OnInit, OnDestroy {
    @Output('onAddedEdge') edgeAddedEventEmitter = new EventEmitter<any>();
    @Output('onClickedNode') nodeClickedEventEmitter = new EventEmitter<any>();
    @Output('onClickedBackground') backgroundClickedEventEmitter = new EventEmitter<any>();
    @Output('onNodePositionChange') onNodePositionChangeEventEmitter = new EventEmitter<any>();

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

    @HostListener('nodeclick', ['$event']) onNodeClick($event) {
      console.log('click-event');
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

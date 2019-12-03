import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[ppGraphEventEmmiter]'
})
export class EmitEventOnAddedEdgeDirective {
    @Output('onAddedEdge') edgeAddedEventEmitter = new EventEmitter<any>();
    @Output('onClickedNode') nodeClickedEventEmitter = new EventEmitter<any>();
    @Output('onClickedBackground') backgroundClickedEventEmitter = new EventEmitter<any>();

    constructor() {
    }

    @HostListener('edgeadd', ['$event']) onEdgeAdd($event) {
        this.edgeAddedEventEmitter.emit($event);
    }

    @HostListener('nodeclick', ['$event']) onNodeClick($event) {
        this.nodeClickedEventEmitter.emit($event);
    }

    @HostListener('backgroundclick', ['$event']) onBackgroundClick($event) {
        this.backgroundClickedEventEmitter.emit($event);
    }


}

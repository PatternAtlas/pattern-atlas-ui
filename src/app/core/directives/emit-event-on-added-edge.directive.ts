import {Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
    selector: '[ppEmitOnAddEdge]'
})
export class EmitEventOnAddedEdgeDirective implements OnInit, OnDestroy {
    @Output('onAddedEdge') edgeAddedEventEmitter = new EventEmitter<any>();
    @Output('onClickedNode') nodeClickedEventEmitter = new EventEmitter<any>();

    constructor() {
    }

    @HostListener('edgeadd', ['$event']) onEdgeAdd($event) {
        this.edgeAddedEventEmitter.emit($event);
    }

    @HostListener('nodeclick', ['$event']) onNodeClick($event) {
        this.nodeClickedEventEmitter.emit($event);
    }


    ngOnInit(): void {
    }


    ngOnDestroy(): void {
    }

}

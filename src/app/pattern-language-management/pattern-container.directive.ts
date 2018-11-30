import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentRegistryService } from '../core/service/component-registry.service';
import { PatternRenderingComponentInterface } from '../core/model/pattern-rendering-component.interface';

@Directive({
    selector: '[ppPatternContainer]'
})
export class PatternContainerDirective implements OnInit {

    @Input() plId: string;
    @Input() pId: string;

    constructor(public viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private compRegistry: ComponentRegistryService) {
    }

    ngOnInit(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.compRegistry.getPLRenderingComponents(this.plId).pcomponent);
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        (<PatternRenderingComponentInterface>componentRef.instance).pId = this.pId;
    }

}

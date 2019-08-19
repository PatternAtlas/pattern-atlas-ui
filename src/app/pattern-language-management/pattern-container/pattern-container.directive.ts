/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */

import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentRegistryService } from '../../core/service/component-registry.service';
import { PatternRenderingComponentInterface } from '../../core/model/pattern-rendering-component.interface';
import { DefaultPatternRendererComponent } from '../../core/default-pattern-renderer/default-pattern-renderer.component';

@Directive({
    selector: '[ppPatternContainer]'
})
export class PatternContainerDirective implements OnInit {

    @Input() plId: string;
    @Input() pId: string;

    @Input() index?: number;

    constructor(public viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private compRegistry: ComponentRegistryService) {
    }

    ngOnInit(): void {
      const renderingComponent = this.compRegistry.getPLRenderingComponents(this.plId, this.index);

      const componentFactory = renderingComponent ?
        this.componentFactoryResolver.resolveComponentFactory(renderingComponent.pcomponent) :
        this.componentFactoryResolver.resolveComponentFactory(DefaultPatternRendererComponent);

      this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        (<PatternRenderingComponentInterface>componentRef.instance).pId = this.pId;
    }

}

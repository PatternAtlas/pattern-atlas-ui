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
import { ComponentRegistryService } from '../core/service/component-registry.service';

@Directive({
    selector: '[ppPatternLanguageContainer]'
})
export class PatternLanguageContainerDirective implements OnInit {

    @Input() plId: string;

    constructor(public viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private compRegistry: ComponentRegistryService) {
    }

    ngOnInit(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.compRegistry.getPLRenderingComponents(this.plId).plcomponent);
        this.viewContainerRef.clear();
        this.viewContainerRef.createComponent(componentFactory);
    }

}

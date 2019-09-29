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
import { PatternGraphTemplateComponent } from '../../graph/component/pattern-graph-template/pattern-graph-template.component';
import { IriConverter } from '../../core/util/iri-converter';
import { DefaultPatternlanguageGraphComponent } from '../../graph/component/default-patternlanguage-graph/default-patternlanguage-graph.component';

@Directive({
    selector: '[ppPatternLanguageContainer]'
})
export class PatternLanguageContainerDirective implements OnInit {

    @Input() plId: string;
    @Input() index?: number;
  @Input() graphView: boolean;

  selectedGraphView: boolean;

    constructor(public viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private compRegistry: ComponentRegistryService) {
    }

    ngOnInit(): void {

      const componentFactory = this.getRenderingComponent();


      this.viewContainerRef.clear();
      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      if (this.selectedGraphView) {
        const instance = (<PatternGraphTemplateComponent<any>>componentRef.instance);
        instance.languageUri = IriConverter.convertIdToIri(this.plId);
      }
    }


  private getRenderingComponent() {
    const renderingComponent = this.compRegistry.getPLRenderingComponents(this.plId, this.index);
    if (renderingComponent) {
      return this.componentFactoryResolver.resolveComponentFactory(renderingComponent.plcomponent);
    }
    // no special renderer, use default renderer (graph or cards):
    if (this.graphView) {

      this.selectedGraphView = true;
      return this.componentFactoryResolver.resolveComponentFactory(DefaultPatternlanguageGraphComponent);
    }
    return this.componentFactoryResolver.resolveComponentFactory(this.compRegistry.getPLRenderingComponents('default').plcomponent);
  }

}

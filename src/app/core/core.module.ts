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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatternOntologyService } from './service/pattern-ontology.service';
import { LoaderRegistryService } from './service/loader/pattern-language-loader/loader-registry.service';
import { DefaultPlRendererComponent } from './default-pl-renderer/default-pl-renderer.component';
import { DefaultPatternRendererComponent } from './default-pattern-renderer/default-pattern-renderer.component';
import { ComponentRegistryService } from './service/component-registry.service';
import { LinkedOpenPatternsLoader } from './service/loader/pattern-language-loader/linked-open-patterns-loader.service';
import { PrettyJsonModule } from 'angular2-prettyjson';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MdEditorComponent } from './component/md-editor/md-editor.component';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { EmitEventOnKeyupDirective } from './directives/emit-event-on-keyup.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigateBackComponent } from './component/navigate-back/navigate-back.component';
import { PatternpropertyDirective } from './component/markdown-content-container/patternproperty.directive';
import { DividerComponent } from './component/divider/divider.component';
import { NgxMdModule } from 'ngx-md';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePatternRelationComponent } from './component/create-pattern-relation/create-pattern-relation.component';
import { MarkdownPatternSectioncontentComponent } from './component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-sectioncontent.component';

@NgModule({
    imports: [
        CommonModule,
        PrettyJsonModule,
        MatButtonModule,
        TextFieldModule,
      CovalentTextEditorModule,
      MatCardModule,
      FlexLayoutModule,
      MatProgressSpinnerModule,
      MatListModule,
      MatDatepickerModule, MatInputModule,
      ReactiveFormsModule,
      MatTooltipModule,
      MatSelectModule,
      MatDialogModule,
      MatIconModule,
      NgxMdModule.forRoot(), MatNativeDateModule
    ],
  exports: [CovalentTextEditorModule, EmitEventOnKeyupDirective, MatProgressSpinnerModule, NavigateBackComponent],
    providers: [
        PatternOntologyService,
        LinkedOpenPatternsLoader
    ],
    declarations: [
        DefaultPlRendererComponent,
        DefaultPatternRendererComponent,
      MdEditorComponent,
      EmitEventOnKeyupDirective,
      NavigateBackComponent,
      PatternpropertyDirective,
      DividerComponent,
      CreatePatternRelationComponent,
      MarkdownPatternSectioncontentComponent
    ],
    entryComponents: [
        DefaultPlRendererComponent,
        DefaultPatternRendererComponent,
      MdEditorComponent,
      DividerComponent,
      CreatePatternRelationComponent,
      MarkdownPatternSectioncontentComponent
    ]
})
export class CoreModule {
    constructor(private lr: LoaderRegistryService,
                private pos: PatternOntologyService,
                private cr: ComponentRegistryService) {
        this.cr.registerComponent('default', {plcomponent: DefaultPlRendererComponent, pcomponent: DefaultPatternRendererComponent});
    }
}

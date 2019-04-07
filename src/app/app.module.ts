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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatternLanguageManagementModule } from './pattern-language-management/pattern-language-management.module';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { LandingPageComponent } from './landing-page.component';

import { HttpClientModule } from '@angular/common/http';
import { ExtensionsModule } from './extensions/extensions.module';
import { AdministrationComponent } from './administration.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SolutionLanguageManagementModule } from './solution-language-management/solution-language-management.module';
import { NgxMdModule } from 'ngx-md';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { TestComponent } from './test/test.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LandingPageComponent,
        AdministrationComponent,
        TestComponent
    ],
    imports: [
        BrowserModule,
        // NOTE: BrowserAnimationsModule issue https://github.com/angular/angular/issues/20290
        BrowserAnimationsModule,
        PatternLanguageManagementModule,
        SolutionLanguageManagementModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        NgxMdModule,
        CovalentTextEditorModule,
        CoreModule,
        HttpClientModule,
        AppRoutingModule,
      ExtensionsModule,
      FlexLayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

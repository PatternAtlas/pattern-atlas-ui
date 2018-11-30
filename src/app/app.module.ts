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
import { MatButtonModule, MatCardModule, MatIconModule, MatTabNav, MatTabsModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SolutionLanguageManagementModule } from './solution-language-management/solution-language-management.module';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LandingPageComponent,
        AdministrationComponent
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
        CoreModule,
        HttpClientModule,
        AppRoutingModule,
        ExtensionsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

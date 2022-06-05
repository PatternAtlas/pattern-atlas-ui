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

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatternViewManagementModule } from './pattern-view-management/pattern-view-management.module';
import { NgxMdModule } from 'ngx-md';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { ToasterModule } from 'angular2-toaster';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './authentication/_interceptor/token.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LandingPageComponent } from './core/component/landing-page/landing-page.component';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { MatMenuModule } from '@angular/material/menu';
import { IssueManagementModule } from './issue-management/issue-management.module';
import { CandidateManagementModule } from './candidate-management/candidate-management.module';
import { DesignModelModule } from './design-model-module/design-model.module';


import { PatternAtlasUiFeatureToggleModule } from './core/directives/pattern-atlas-ui-feature-toggle.module';
import { PatternAtlasUiRepositoryConfigurationService } from './core/directives/pattern-atlas-ui-repository-configuration.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LandingPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    PatternLanguageManagementModule,
    PatternViewManagementModule,
    DesignModelModule,
    PatternAtlasUiFeatureToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    NgxMdModule,
    CovalentTextEditorModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    ToasterModule.forRoot(),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,

    IssueManagementModule,
    CandidateManagementModule,
  ],
  providers: [
    CookieService, PatternAtlasUiRepositoryConfigurationService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}



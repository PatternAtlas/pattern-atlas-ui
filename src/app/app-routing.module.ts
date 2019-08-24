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
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AdministrationComponent } from './administration.component';
import { TestComponent } from './test/test.component';
import { ProcessOauthCallbackComponent } from './core/component/process-oauth-callback/process-oauth-callback.component';
import { ToasterModule } from 'angular2-toaster';

const routes: Routes = [
  {
    path: 'oauth-callback',
    component: ProcessOauthCallbackComponent
  }, {
        path: '',
        redirectTo: 'patternlanguages',
        pathMatch: 'full'
    },
    {
        path: 'administration',
        component: AdministrationComponent
    },
    {
        path: 'test',
        component: TestComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false, onSameUrlNavigation: 'reload'}), ToasterModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

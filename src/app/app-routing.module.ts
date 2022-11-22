import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessOauthCallbackComponent } from './core/component/process-oauth-callback/process-oauth-callback.component';
import { ToasterModule } from 'angular2-toaster';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { AuthGuardService as AuthGuard } from './authentication/_services/auth-guard.service';
import { PatternLanguageManagementResolverService } from './pattern-language-management/pattern-language-management/pattern-language-management-resolver.service'; // eslint-disable-line max-len
import { Privilege } from './core/user-management/_models/privilege.enum';
import { globals } from './globals';
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

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: globals.pathConstants.patternLanguages
  },
  {
    path: globals.pathConstants.patternLanguages,
    resolve: {
      patternlanguages: PatternLanguageManagementResolverService,
    },
    loadChildren: () => import('./pattern-language-management/pattern-language-management.module').then(m => m.PatternLanguageManagementModule),
  },
  {
    path: globals.pathConstants.patternViews,
    loadChildren: () => import('./pattern-view-management/pattern-view-management.module').then(m => m.PatternViewManagementModule),
  },
  {
    path: globals.pathConstants.designModels,
    loadChildren: () => import('./design-model-module/design-model.module').then(m => m.DesignModelModule),
  },
  {
    path: globals.pathConstants.candidate,
    loadChildren: () => import('./candidate-management/candidate-management.module').then(m => m.CandidateManagementModule),
  },
  {
    path: globals.pathConstants.issue,
    loadChildren: () => import('./issue-management/issue-management.module').then(m => m.IssueManagementModule),
  },
  {
    path: 'user-info',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard],
    data: { privilege: Privilege.USER_READ }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-management/admin-management.module').then(m => m.AdminManagementModule),
    canActivate: [AuthGuard],
    data: { privilege: Privilege.USER_READ_ALL }
  },
  {
    path: 'oauth-callback',
    component: ProcessOauthCallbackComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' }), ToasterModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { PatternLanguageGraphComponent } from './pattern-language-management/pattern-language-graph/pattern-language-graph.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessOauthCallbackComponent } from './core/component/process-oauth-callback/process-oauth-callback.component';
import { ToasterModule } from 'angular2-toaster';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { AuthGuardService as AuthGuard } from './authentication/_services/auth-guard.service'
import { DEVELOPER_MANAGEMENT_ROUTES } from './developer-management/developer-management.module';
import { USER_MANAGEMENT_ROUTES } from './user-management/user-management.module';
import { ADMIN_MANAGEMENT_ROUTES } from './admin-management/admin-management.module';
import { PatternLanguageManagementResolverService } from './pattern-language-management/pattern-language-management/pattern-language-management-resolver.service';
import { UserRole } from './core/user-management';
import { PrintHook } from '@angular/flex-layout';
import { Privilege } from './core/user-management/_models/privilege.enum';
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
        path: 'patternLanguages',
        resolve: {
            patternlanguages: PatternLanguageManagementResolverService,
        },
        loadChildren: () => import('./pattern-language-management/pattern-language-management.module').then(m => m.PatternLanguageManagementModule),
    },
    {
        path: 'patternViews',
        loadChildren: () => import('./pattern-view-management/pattern-view-management.module').then(m => m.PatternViewManagementModule),
    },
    {
        path: 'candidate',
        loadChildren: () => import('./candidate-management/candidate-management.module').then(m => m.CandidateManagementModule),
    },
    {
        path: 'issue',
        loadChildren: () => import('./issue-management/issue-management.module').then(m => m.IssueManagementModule),
    },
    {
        path: 'user-info',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [AuthGuard],
        data: { privilege: Privilege.READ_USER }  
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin-management/admin-management.module').then(m => m.AdminManagementModule),
        canActivate: [AuthGuard],
        data: { privilege: Privilege.READ_USER_ALL }  
    },
    {
        path: 'developer',
        loadChildren: () => import('./developer-management/developer-management.module').then(m => m.DeveloperManagementModule),
        canActivate: [AuthGuard],
        data: { privilege: Privilege.DEVELOPER }
    },
    {
        path: 'oauth-callback',
        component: ProcessOauthCallbackComponent
    },
    {
        path: 'graph',
        component: PatternLanguageGraphComponent
    },
    {
        path: '',
        redirectTo: 'candidate',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' }), ToasterModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import { PatternLanguageGraphComponent } from './pattern-language-management/pattern-language-graph/pattern-language-graph.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessOauthCallbackComponent } from './core/component/process-oauth-callback/process-oauth-callback.component';
import { ToasterModule } from 'angular2-toaster';
import { LoginComponent } from './core/component/login/login.component';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { AuthGuardService as AuthGuard } from './authentication/auth-guard.service'
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

export enum UserRole {
    MEMBER = "MEMBER",
    EXPERT = "EXPERT",
    AUTHOR = "AUTHOR",
    LIBRARIAN = "LIBRARIAN",
    ADMIN = "ADMIN"
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'patternEvolution',
        pathMatch: 'full'
    },
    {
        path: 'patternLanguages',
        // resolve: {
        //     patternlanguages: PatternLanguageManagementResolverService,

        // },
        loadChildren: './pattern-language-management/pattern-language-management.module#PatternLanguageManagementModule',
    },
    {
        path: 'patternViews',
        loadChildren: './pattern-view-management/pattern-view-management.module#PatternViewManagementModule',
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }  
    },
    {
        path: 'issue',
        loadChildren: './issue-management/issue-management.module#IssueManagementModule',
        // children: ISSUE_ROTUES
        // canActivate: [AuthGuard],
        // data: { role: UserRole.MEMBER }
    },
    {
        path: 'user',
        loadChildren: './user-management/user-management.module#UserManagementModule',
        // children: USER_MANAGEMENT_ROUTES
        canActivate: [AuthGuard],
        data: { role: UserRole.MEMBER }  
    },
    {
        path: 'admin',
        loadChildren: './admin-management/admin-management.module#AdminManagementModule',
        //  children: ADMIN_MANAGEMENT_ROUTES,
        canActivate: [AuthGuard],
        data: { role: UserRole.ADMIN }  
    },
    {
        path: 'developer',
        loadChildren: './developer-management/developer-management.module#DeveloperManagementModule',
        // children: DEVELOPER_MANAGEMENT_ROUTES,
        canActivate: [AuthGuard],
        data: { role: UserRole.ADMIN }
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
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' }), ToasterModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

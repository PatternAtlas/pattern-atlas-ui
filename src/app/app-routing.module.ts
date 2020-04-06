import { PatternLanguageGraphComponent } from './pattern-language-management/pattern-language-graph/pattern-language-graph.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessOauthCallbackComponent } from './core/component/process-oauth-callback/process-oauth-callback.component';
import { ToasterModule } from 'angular2-toaster';
import { LoginComponent } from './core/component/login/login.component';
import { PatternEvolutionHomeComponent } from './pattern-evolution-management/pattern-evolution-home/pattern-evolution-home.component';
import { PatternLanguageManagementResolverService } from './pattern-language-management/pattern-language-management/pattern-language-management-resolver.service';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { PL_ROUTES } from './pattern-language-management/pattern-language-management.module';
import { PatternLanguageManagementComponent } from './pattern-language-management/pattern-language-management/pattern-language-management.component';
import { PatternLanguageContainerComponent } from './pattern-language-management/pattern-language-container/pattern-language-container.component';
import { CreatePatternComponent } from './pattern-language-management/create-pattern/create-pattern.component';
import { PatternContainerComponent } from './pattern-language-management/pattern-container/pattern-container.component';
import { AuthGuardService as AuthGuard } from './core/service/auth-guard.service'
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
        redirectTo: 'login',
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
        // canActivate: [AuthGuard]  
    },
    {
        path: 'patternEvolution',
        // component: PatternEvolutionHomeComponent
        loadChildren: './pattern-evolution-management/pattern-evolution-management.module#PatternEvolutionManagementModule',
        // children: PATTERN_EVOLUTION_ROUTES
        canActivate: [AuthGuard],
        data: { role: 'MEMBER' }  
    },
    // {
    //     path: 'login',
    //     component: ProfileComponent,
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'admin',
    //     component: AdminComponent,
    //     canActivate: [RoleGuard],
    //     data: {
    //         expectedRole: 'admin'
    //     }
    // },
    // { path: '**', redirectTo: '' }
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

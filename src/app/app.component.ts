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

import { Component } from '@angular/core';
import { AuthenticationService } from './core/service/authentication.service';

@Component({
    selector: 'pp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    loginButton = "Login";
    private loggedIn: boolean;

    constructor(private auth: AuthenticationService) {
        this.auth.userLoggedIn$.subscribe(loggedIn => {
            console.log(loggedIn)
            this.loggedIn = loggedIn;
            loggedIn ? this.loginButton = 'Logout' : this.loginButton = 'Login'
        })
    }

    loginOAuth() {
        this.loggedIn ? this.auth.logout() : this.auth.login()
    }


}

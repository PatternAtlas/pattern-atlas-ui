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

import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication/_services/authentication.service';
import {PAUser} from './core/user-management';
import {globals} from './globals';
import {PatternAtlasUiRepositoryConfigurationService} from './core/directives/pattern-atlas-ui-repository-configuration.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToasterService} from 'angular2-toaster';


@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly featureToggles = globals.featureToggles;
  loginButton = 'Login';
  welcomeText = '';
  user: PAUser;
  readonly pathConstants = globals.pathConstants;
  loading = true;


  constructor(public auth: AuthenticationService,
              private toasterService: ToasterService,
              private configService: PatternAtlasUiRepositoryConfigurationService) {
    this.auth.userSubject.subscribe(_user => {
      if (_user) {
        console.log('User is Logged in: ', _user);
        this.user = _user;
        this.loginButton = 'Logout';
        this.welcomeText = `Welcome ${_user.name}`;
      } else {
        console.log('No user logged in: ', _user);
        this.user = null;
        this.loginButton = 'Login';
        this.welcomeText = '';
      }
    });
  }

  loginOAuth() {
    this.user ? this.auth.logout() : this.auth.login();
  }

  ngOnInit(): void {
    this.configService.getConfigurationFromBackend().subscribe(
      () => (this.loading = false),
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toasterService.pop(
          'Error while loading config from config server!' + error.message);
      }
    );
  }
}

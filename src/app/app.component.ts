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

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/_services/authentication.service';
import { PAUser } from './core/user-management';
import { FeatureToggleService } from './core/service/feature-toggle.service';


@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly featureToggleKeys = ['designModels', 'patternCandidate', 'issue'];

  featureToggles: { [ key: string ]: boolean };

  showFeatureToggles = false;

  loginButton = 'Login';
  welcomeText = '';
  user: PAUser;


  constructor(public auth: AuthenticationService,
              private featureToggleService: FeatureToggleService) {
  }


  ngOnInit() {
    this.subscribeToUserAuth();
    this.initFeatureToggles();
  }


  initFeatureToggles(): void {
    this.showFeatureToggles = document && document.location && !!document.location.host.match(/^localhost(:[0-9]+)?$/);

    this.featureToggleService.getFeatures().subscribe(featureToggles => {
      this.featureToggles = featureToggles;
    });
  }


  toggleFeature(event, key: string): void {
    const enable = event && event.checked;
    this.featureToggleService.set(key, enable);
  }


  loginOAuth(): void {
    this.user ? this.auth.logout() : this.auth.login();
  }


  private subscribeToUserAuth(): void {
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
}

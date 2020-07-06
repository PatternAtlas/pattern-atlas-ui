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

import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/_services/authentication.service';
import { PrivilegeService } from './authentication/_services/privilege.service';
import { globals } from './globals';

@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  readonly featureToggles = globals.featureToggles;
  readonly pathConstants = globals.pathConstants;
  userName: string;
  loggedIn = false;


  constructor(
    public auth: AuthenticationService,
    public p: PrivilegeService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.auth.user.subscribe(_user => {
      if (_user) {
        this.userName = _user.name;
        this.loggedIn = true;
      } else {
        this.userName = null;
        this.loggedIn = false;
      }
    })
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}

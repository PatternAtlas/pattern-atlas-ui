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
import { PrivilegeService } from './authentication/_services/privilege.service';
import { globals } from './globals';
import {
  PatternAtlasUiRepositoryConfigurationService, UiFeatures
} from './core/directives/pattern-atlas-ui-repository-configuration.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import { FeatureToggleDialogComponent } from './core/component/feature-toggle-dialog/feature-toggle-dialog.component';
import { UserRole } from './core/user-management';

@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  userName: string;
  loggedIn = false;

  readonly UiFeatures = UiFeatures;
  loginButton = 'Login';
  welcomeText = '';
  readonly pathConstants = globals.pathConstants;
  loading = true;
  planqkUi = false;
  showFeatureFlag = false;
  private isAdmin: boolean;

  constructor(public auth: AuthenticationService,
              public p: PrivilegeService,
              private toasterService: ToasterService,
              private configService: PatternAtlasUiRepositoryConfigurationService,
              private dialog: MatDialog) {
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.configService.getConfigurationFromBackend().subscribe(
      () => {
        this.loading = false;
        this.planqkUi = this.configService.configuration.features[UiFeatures.PLANQK_UI];
        this.updateShowFeatureDialogFlag();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.planqkUi = true;

        if (error.status === globals.statusCodeNotFound) {
          this.configService.getDefaultConfiguration();
        } else if (this.configService.configuration.features[UiFeatures.SHOW_SETTINGS]) {
          console.log('default values applied');
        }
        this.updateShowFeatureDialogFlag();
      }
    );
    this.auth.user.subscribe(_user => {
      if (_user) {
        this.isAdmin = _user.role == UserRole.ADMIN;
        this.userName = _user.name;
        this.loggedIn = true;
        this.updateShowFeatureDialogFlag();
      } else {
        this.userName = null;
        this.loggedIn = false;
        this.updateShowFeatureDialogFlag();
      }
    })
  }

  openFeatureToggleDialog() {
    this.dialog.open(FeatureToggleDialogComponent, { data: { isAdmin: this.isAdmin } }).afterClosed().subscribe(() => {
      // reload page to trigger ShowOnFeatureDirectives which use the ngOnInit lifecycle hook
      window.location.reload();
    });
  }

  private updateShowFeatureDialogFlag() {
    this.showFeatureFlag = !this.planqkUi || this.isAdmin;
  }
}

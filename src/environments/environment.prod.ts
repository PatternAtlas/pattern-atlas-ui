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

const urlScheme = `${window['env'] && window['env']['URL_SCHEME'] ? window['env']['URL_SCHEME'] : 'http'}`;
const authRealm = `${window['env'] && window['env']['AUTH_REALM_URL'] ? window['env']['AUTH_REALM_URL'] : ''}`;
const apiUrl = window['env'] && window['env']['PATTERN_ATLAS_API_HOST_NAME'] && window['env']['PATTERN_ATLAS_API_PORT']
  ? `${urlScheme}://${window['env']['PATTERN_ATLAS_API_HOST_NAME']}:${window['env']['PATTERN_ATLAS_API_PORT']}/patternatlas`
  : 'http://localhost:1977/patternatlas'
export const environment = {
  PRODUCTION: true,
  API_URL: window['env'] && window['env']['PATTERN_ATLAS_API_HOST_NAME'] && window['env']['PATTERN_ATLAS_API_PORT']
    ? `${urlScheme}://${window['env']['PATTERN_ATLAS_API_HOST_NAME']}:${window['env']['PATTERN_ATLAS_API_PORT']}/patternatlas`
    : 'http://localhost:1977/patternatlas',
  authorizeUrl: `${authRealm}/protocol/openid-connect/auth?`,
  tokenUrl: `${authRealm}/protocol/openid-connect/token`,
  tokenRevokeUrl: `${authRealm}/protocol/openid-connect/revoke`,
  signinUrl: `${authRealm}/clients-registrations/openid-connect`,
  userInfoUrl: `${apiUrl}/users/userinfo`,
  logoutUrl: `${authRealm}/protocol/openid-connect/logout?`,
  // Account management
  accountManagementUrl: `${authRealm}/account?referrer=patternatlas`,
  clientIdPrivate: 'pattern-pedia-private',
  clientIdPublic: 'patternatlas',
  clientIdPKCE: 'patternatlas',
  CONFIG_SERVER_URL:
    window['env'] && window['env']['CONFIG_SERVER_HOST_NAME'] && window['env']['CONFIG_SERVER_PORT']
      ? `${urlScheme}://${window['env']['CONFIG_SERVER_HOST_NAME']}:${window['env']['CONFIG_SERVER_PORT']}/v2/keys`
      : 'http://localhost:2379/v2/keys',
  defaultFeatures: 'assets/settings_features/default_features.json',
  LATEX_RENDERER_API_URL:
    window['env'] && window['env']['LATEX_RENDERER_HOST_NAME'] && window['env']['LATEX_RENDERER_PORT']
      ? `${urlScheme}://${window['env']['LATEX_RENDERER_HOST_NAME']}:${window['env']['LATEX_RENDERER_PORT']}`
      : 'http://localhost:5030'
};

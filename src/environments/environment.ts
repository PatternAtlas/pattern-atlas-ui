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

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  repositoryUrl: 'http://localhost:8080/patternpedia',
  authorizeUrl: 'http://localhost:8081/oauth/authorize?',
  tokenUrl: 'http://localhost:8081/oauth/token',
  tokenRevokeUrl: 'http://localhost:8081/oauth/revoke_token',
  signinUrl: 'http://localhost:8081/user/create',
  userInfoUrl: 'http://localhost:8081/user_info',
  clientIdPrivate: 'pattern-pedia-private',
  clientIdPublic: 'pattern-pedia-public',
  clientIdPKCE: 'pattern-pedia-pkce',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

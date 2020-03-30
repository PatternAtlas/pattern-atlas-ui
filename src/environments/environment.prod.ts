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

export const environment = {
  production: true,
  serverUrl: 'http://localhost:8080/api/',
  loginUrl: 'http://localhost:8081/oauth/token',
  signinUrl: 'http://localhost:8080/user/create',
  clientIdPrivate: 'pattern-pedia-private',
  clientIdPublic: 'pattern-pedia-public',
  clientSecret: 'pattern-pedia-secret'
};

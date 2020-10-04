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

class Pattern {
  id: string;
  uri: string;
  name: string;

  sectionsProperties: Map<string, string[]>;
  sectionPropertiesRendered: Map<string, string[]>;

  constructor(id: string, uri: string = null, name: string = null, sectionProperties: Map<string, string[]> = null) {
    this.name = name;
    this.uri = uri;
    this.id = id;
    this.sectionsProperties = sectionProperties;
    this.sectionPropertiesRendered = sectionProperties;
  }
}

export default Pattern;

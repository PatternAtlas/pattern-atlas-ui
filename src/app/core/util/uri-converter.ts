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

import { QueriedData } from '../service/data/QueriedData.interface';
import { globals } from '../../globals';

export class UriConverter {

  static doubleEncodeUri(uri: string): string {
    return encodeURIComponent(encodeURIComponent(uri));
  }

  static decodeUri(id: string): string {
    return decodeURIComponent(id);
  }

  static doubleDecodeUri(id: string): string {
    return decodeURIComponent(decodeURIComponent(id));
  }

  static getFileName(iri: string): string {
    return iri.split('#')[0];
  }

  static getURL(patternlanguageIri: string) {
    if (patternlanguageIri.indexOf(globals.pathConstants.patternLanguages) !== -1) {
      return patternlanguageIri;

    }
    return this.getFileName(patternlanguageIri);
  }

  static removeWhitespace(text: string): string {
    return text.replace(/\s/g, '');
  }

  static extractDataValue(pl: QueriedData[]): string[] {
    return pl.map((graph: QueriedData) => {
      return this.getURL(graph.value);
    });
  }

  // this function checks if a given urlParam is a UUID (otherwise the entity is specified via its URI)
  static isUUID(urlParam): boolean {
    const s = '' + urlParam;

    const match = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    return match !== null;

  }

}

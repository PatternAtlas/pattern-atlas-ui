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

export class IriConverter {
    static convertIriToId(iri: string): string {
        return encodeURIComponent(encodeURIComponent(iri));
    }

    static convertIdToIri(id: string): string {
        return decodeURIComponent(decodeURIComponent(id));
    }

  static getFileName(iri: string): string {
        return iri.split('#')[0];
    }

  static extractIndividualNameFromIri(iri: string): string {
    return iri.includes('#') ? iri.split('#')[1] :
      iri.split('/')[iri.split('/').length - 1];
  }

  static getURL(patternlanguageIri: string) {
    if (patternlanguageIri.indexOf('patternlanguages') !== -1) {
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

  static getSectionName(patternSection: string) {
    return patternSection.split('#has')[1];
  }

  static isIri(name: string): boolean {
    return (name.indexOf('#') >= 0) || (name.indexOf('://') >= 0) || (name.indexOf('purl.org/patternpedia') >= 0);
  }


  static getPatternListIriForPLIri(plIri: string): string {
    return this.getFileName(plIri) + '/' + this.extractIndividualNameFromIri(this.getFileName(plIri)) + '-Patterns';

  }

  static getRelationListIriForPLIri(plIri: string): string {
    return this.getFileName(plIri) + '/' + this.extractIndividualNameFromIri(this.getFileName(plIri)) + '-Relations';
  }

  static getGithubAPIURLForURI(iri: string): string {
    if (iri.indexOf('patternlanguages') !== -1 || iri.indexOf('patternviews') !== -1) {
      const foldername = iri.indexOf('patternlanguages') !== -1 ? 'patternlanguages' : 'patternviews';
      let relativePath = this.getFileName(iri.split(foldername + '/')[1]);
      // is this a request for the base file of a patternlanguage add the patternlanguage identifier again (convention)
      relativePath = relativePath.indexOf('/') !== -1 ? relativePath : `${relativePath}/${relativePath}`;
      return `${globals.urlGithubAPI}/${foldername}/${relativePath}.ttl`;
    }
    if (iri.indexOf('patternpedia') !== -1) {
      return `${globals.urlGithubAPI}/patternpedia.ttl`;
    }
    return iri;
  }
}

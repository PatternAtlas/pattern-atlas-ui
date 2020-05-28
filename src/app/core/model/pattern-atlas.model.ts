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

import { UriConverter } from '../util/uri-converter';
import { globals } from '../../globals';

export class PatternAtlas {
  private _id: string;
  iri: string;
  name: string;
  logo: string;


  defaultPrefixes = new Map();


  set id(iri: string) {
    this._id = UriConverter.doubleEncodeUri(iri);
  }

  get id(): string {
    return this._id;
  }

  getPrefixesToTurtle(iri: string, defaultPrefixBegin?: string): string[] {
    const ary: Array<string> = [];
    ary.push(
      `@prefix : <${UriConverter.getFileName(defaultPrefixBegin ? defaultPrefixBegin : iri)}#> .`,
      `@prefix pp: <${globals.urlPatternRepoOntology}#> .`,
      '@prefix owl: <http://www.w3.org/2002/07/owl#> .',
      '@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .',
      '@prefix xml: <http://www.w3.org/XML/1998/namespace> .',
      '@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .',
      '@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .',
      `@base <${UriConverter.getFileName(iri)}> .`
    );
    return ary;
  }


  public constructor(iri: string = null, name: string = null, logo: string = null) {
    this.name = name;
    this.logo = logo;
    this.iri = iri;
    this.id = iri;
    this.defaultPrefixes.set('owl', '<http://www.w3.org/2002/07/owl#>');
    this.defaultPrefixes.set('pp', `<${globals.urlPatternRepoOntology}#>`);
    this.defaultPrefixes.set('xml', '<http://www.w3.org/2001/XMLSchema#>');
    this.defaultPrefixes.set('rdf', '<http://www.w3.org/1999/02/22-rdf-syntax-ns#>');
    this.defaultPrefixes.set('rdfs', '<http://www.w3.org/2000/01/rdf-schema#>');
    this.defaultPrefixes.set('xsd', '<http://www.w3.org/2001/XMLSchema#>');


  }
}
export default PatternAtlas;

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

import { IriConverter } from '../util/iri-converter';

class Pattern {
  protected _id: string;
  iri: string;
  name: string;
  patternLanguageIri: string;

  sectionsProperties: Map<string, string[]>;

  set id(iri: string) {
    this._id = IriConverter.convertIriToId(iri);
  }

  get id(): string {
    return this._id;
  }

  constructor(iri: string = null, name: string = null, sectionProperties: Map<string, string[]> = null, patternLanguageIri: string = null) {
    this.name = name;
    this.iri = iri;
    this.id = iri;
    this.sectionsProperties = sectionProperties;
    this.patternLanguageIri = patternLanguageIri;
  }

  toTurtle(): string {
    const ary = [];
    ary.push(`###  ${this.iri}`);
    ary.push(`:${IriConverter.removeWhitespace(this.name)} rdf:type owl:NamedIndividual ,`);
    ary.push(`<${IriConverter.getFileName(this.patternLanguageIri)}/${IriConverter.extractIndividualNameFromIri(this.patternLanguageIri)}Individual> ;`);
    const sections = Array.from(this.sectionsProperties.keys()).filter(it => it !== 'http://www.w3.org/2002/07/owl#imports' &&
      it !== (IriConverter.getFileName(this.patternLanguageIri) + '#hasName')); // ignore owl:imports and the name, because we can use this.name instead
    ary.push(`<${IriConverter.getFileName(this.patternLanguageIri)}#hasName> "${this.name}" ${sections.length > 0 ? ';' : '.'}`);

    if (sections) {
      sections.forEach((key, sectionindex) => {
        const statements: string[] = this.sectionsProperties.get(key);
        if (statements) {
          statements.forEach((val, indexStatements) => {
            ary.push(`${this.getPropertyIri(key)} ${this.sectionsProperties.get(key)[indexStatements].startsWith('<') ? '' : '"'}${this.sectionsProperties.get(key)[indexStatements]}${this.sectionsProperties.get(key)[indexStatements].startsWith('<') ? '' : '"'} ${(sectionindex === sections.length - 1) && (indexStatements === statements.length - 1) ? '.' : ';'}`);
          });
        }

      });
    }
    ary.push('');
    return ary.join('\n');
  }

  private getPropertyIri(key: string) {

    return IriConverter.isIri(key) ? '<' + key + '>' : '<' + IriConverter.getFileName(this.patternLanguageIri) + '#has' + key + '>';

  }
}
export default Pattern;

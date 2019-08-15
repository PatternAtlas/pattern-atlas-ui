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
import { globals } from '../../globals';
import { PatternPedia } from './pattern-pedia.model';

class Pattern {
  protected _id: string;
  iri: string;
  name: string;
  patternLanguageIri: string;

  sectionsProperties: Map<string, string[]>;
  patternpediaBaseURI = globals.urlPatternRepoOntology;

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


  getSectionIdentifier(section: string): string {
    return ':has' + section.replace(/\s/g, '');
  }

  toTurtle(): string {
    const ary = new PatternPedia().getPrefixesToTurtle(this.iri);


    ary.push('\n\n');
    ary.push(`###  ${this.iri}`);
    ary.push(`:${IriConverter.removeWhitespace(this.name)} rdf:type owl:NamedIndividual ,`);
    ary.push(`<${IriConverter.getFileName(this.patternLanguageIri)}/${IriConverter.extractIndividualNameFromIri(this.patternLanguageIri)}Individual> ;`);
    ary.push(`<${IriConverter.getFileName(this.iri)}#hasName> "${this.name}" ;`);
    const sections = Array.from(Object.keys(this.sectionsProperties));

    sections.forEach((key, sectionindex) => {
      const statements: string[] = this.sectionsProperties[key];
      statements.forEach((val, indexStatements) => {
        ary.push(`${this.getPropertyIri(key)} ${this.sectionsProperties[key][indexStatements].startsWith('<') ? '' : '"'}${this.sectionsProperties[key][indexStatements]}${this.sectionsProperties[key][indexStatements].startsWith('<') ? '' : '"'} ${(sectionindex === sections.length - 1) && (indexStatements === statements.length - 1) ? '.' : ';'}`);
      });

    });
    return ary.join('\n');
  }

  private getPropertyIri(key: string) {

    return IriConverter.isIri(key) ? '<' + key + '>' : '<' + IriConverter.getFileName(this.patternLanguageIri) + '#has' + key + '>';

  }
}
export default Pattern;

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

class PatternLanguage {
  private patternpediaBaseURI = 'http://purl.org/patternpedia';
    private _id: string;
    name: string;
    logos: Array<string>;
    iri: string;
    patternIRIs: Array<string>;
  sections: string[];

    set id(iri: string) {
        this._id = IriConverter.convertIriToId(iri);
    }

    get id(): string {
        return this._id;
    }

  public constructor(iri: string = null, name: string = null, logos: Array<string> = null, patternIRIs: Array<string> = null, sections: string[] = null) {
        this.name = name;
        this.logos = logos || [];
        this.patternIRIs = patternIRIs || [];
        this.iri = iri;
        this.id = iri;
    this.sections = sections;
  }

  getPrefixes(): Array<string> {
    const ary: Array<string> = [];
    ary.push(
      `@prefix : <${this.patternpediaBaseURI + '/' + this.name}#> .`,
      `@prefix owl: <http://www.w3.org/2002/07/owl#> .`,
      `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .`,
      `@prefix xml: <http://www.w3.org/XML/1998/namespace> .`,
      `@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .`,
      `@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .`,
      `@prefix pp: <${this.patternpediaBaseURI}#> .`,
      `@base <${this.patternpediaBaseURI + '/' + this.name}> .`
    );
    return ary;
  }

  getSectionIdentifier(section: string): string {
    return ':has' + section.replace(/\s/g, '');
  }

  toTurtle(): string {
    const ary = this.getPrefixes();
    ary.push('\n');
    ary.push(`<${this.patternpediaBaseURI + '/' + this.name}> rdf:type owl:Ontology ;`);
    ary.push(`owl:imports <${this.patternpediaBaseURI}> .`);
    ary.push('\n');
    ary.push('# #################################################################');
    ary.push('# #');
    ary.push('# #    Sections / Data Properties');
    ary.push('# #');
    ary.push('# #################################################################');
    for (const section of this.sections) {
      ary.push('\n');
      ary.push(`### ${section}`);
      ary.push(`${this.getSectionIdentifier(section)} rdf:type rdf:type owl:DatatypeProperty .`);
    }
    ary.push('\n');
    ary.push('# #################################################################');
    ary.push('# #');
    ary.push('# #    Restrictions / Classes');
    ary.push('# #');
    ary.push('# #################################################################');

    ary.push(`### ${this.patternpediaBaseURI + '/' + this.name} + 'Pattern'`);
    ary.push(`:CloudComputingPattern rdf:type owl:Class ; `);
    ary.push(` rdfs:subClassOf pp:Pattern ,`);
    this.sections.forEach((section, index) => {
      ary.push(`${'\t'.repeat(3)}[ rdf:type owl:Restriction ;`);
      ary.push(`${'\t'.repeat(3)} owl:onProperty ${this.getSectionIdentifier(section)} ; `);
      ary.push(`${'\t'.repeat(3)}owl:allValuesFrom xsd:string`);
      ary.push(`${'\t'.repeat(4)}] ${index === this.sections.length - 1 ? '.' : ','}`);
      ary.push(`\n`);
    });
    // Todo solutionSketches and variations

    return ary.join('\n');
  }

}

export default PatternLanguage;

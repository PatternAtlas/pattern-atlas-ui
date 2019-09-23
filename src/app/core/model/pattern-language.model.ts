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
import { PatternLanguageSectionRestriction } from './PatternLanguageSectionRestriction.model';
import PatternPedia from './pattern-pedia.model';
import { CustomPrefix } from '../../pattern-language-management/data/CustomPrefix.interface';
import { TurtleFileModelInterface } from './TurtleFileModel.interface';

class PatternLanguage implements TurtleFileModelInterface {
  private patternpediaBaseURI = 'https://purl.org/patternpedia';
    private _id: string;
    name: string;
  logos: string[];
    iri: string;
  patternIRIs: string[];
  sections: string[];
  restrictions: Map<string, PatternLanguageSectionRestriction[]>;
  prefixes: CustomPrefix[];


  set id(iri: string) {
        this._id = IriConverter.convertIriToId(iri);
    }

    get id(): string {
        return this._id;
    }

  public constructor(iri: string = null, name: string = null, logos: string[] = null, patternIRIs: string[] = null, sections: string[] = null,
                     restrictions: Map<string, PatternLanguageSectionRestriction[]> = null, prefixes: CustomPrefix[] = null) {
        this.name = name;
        this.logos = logos || [];
        this.patternIRIs = patternIRIs || [];
        this.iri = iri;
        this.id = iri;
    this.sections = sections;
    this.restrictions = restrictions;
    this.prefixes = prefixes;
  }

  getPrefixes(): Array<string> {
    const ary: Array<string> = [];
    const standardPrefixes = new PatternPedia().defaultPrefixes;
    ary.push(
      `@prefix : <${this.patternpediaBaseURI + '/patternlanguages/' + this.name}#> .`,
      `@base <${this.patternpediaBaseURI + '/patternlanguages/' + this.name}> .`
    );
    standardPrefixes.forEach((value: boolean, key: string) => {
      ary.push(
        `@prefix ${key}: ${value} .`,
      );
    });
    if (!this.prefixes) {
      return ary;
    }

    this.prefixes.forEach((value: CustomPrefix) => {
      if (value.checked && (value.prefixname !== 'xsd')) { // xsd is already contained in standard prefixes
        ary.push(
          `@prefix ${value.prefixname}: ${this.addAngleBracketsIfNeeded(value.uri)} .`,
        );
      }
    });
    return ary;
  }

  getSectionIdentifier(section: string): string {
    return section.startsWith('https://purl.org') ? '<' + section + '>' : ':has' + section.replace(/\s/g, '');
  }

  toTurtle(): string {
    const ary = this.getPrefixes();
    ary.push('\n');
    ary.push(`<${IriConverter.getFileName(this.iri)}> rdf:type owl:Ontology ;`);
    ary.push(`owl:imports <${this.patternpediaBaseURI}> , <${IriConverter.getPatternListIriForPLIri(this.iri)}>, <${IriConverter.getRelationListIriForPLIri(this.iri)}>.`);
    ary.push('\n');
    ary.push('# #################################################################');
    ary.push('# #');
    ary.push('# #    Sections / Data Properties');
    ary.push('# #');
    ary.push('# #################################################################');
    this.sections.forEach((section, index) => {
      ary.push('\n');
      ary.push(`### ${section}`);
      ary.push(`${this.getSectionIdentifier(section)} rdf:type pp:DatatypePropertyListItem  ;`);
      ary.push(`pp:hasListIndex "${index}"^^xsd:integer .`);
    });

    const restrictionsArray = [];
    for (const key of this.sections) {
      if (!this.restrictions.get(key)) {
        continue;
      }
      restrictionsArray.push(...this.restrictions.get(key));
    }

    if (this.restrictions && this.restrictions.size > 0) {

      ary.push('\n');
      ary.push('# #################################################################');
      ary.push('# #');
      ary.push('# #    Restrictions / Classes');
      ary.push('# #');
      ary.push('# #################################################################');

      ary.push(`### ${this.iri}`);
      ary.push(`:${this.name}Individual rdf:type owl:Class ; `);
      ary.push(` rdfs:subClassOf pp:Pattern ,`);


      restrictionsArray.forEach((restriction, index) => {
        ary.push(`${'\t'.repeat(3)}[ rdf:type owl:Restriction ;`);
        ary.push(`${'\t'.repeat(3)} owl:onProperty ${this.addPrefixCharacterOrAngleBrackets(restriction.name)} ; `);
        if (restriction.restrictionType === 'min' || restriction.restrictionType === 'max') {
          ary.push(`${'\t'.repeat(3)} ${restriction.restrictionType === 'min' ? 'owl:minCardinality' : 'owl:maxCardinality'} "${restriction.cardinality}"^^xsd:nonNegativeInteger;`);
          ary.push(`${'\t'.repeat(3)} owl:onDataRange ${this.addAngleBracketsIfNeeded(restriction.type)}`);
        } else if (restriction.restrictionType === 'exactly') {
          ary.push(`${'\t'.repeat(3)} owl:qualifiedCardinality"${restriction.cardinality}"^^xsd:nonNegativeInteger;`);
          ary.push(`${'\t'.repeat(3)} owl:onDataRange ${this.addAngleBracketsIfNeeded(restriction.type)}`);
        } else if (restriction.restrictionType === 'some') {
          ary.push(`${'\t'.repeat(3)} owl:someValuesFrom ${this.addAngleBracketsIfNeeded(restriction.type)}`);
        } else if (restriction.restrictionType === 'only') {
          ary.push(`${'\t'.repeat(3)} owl:allValuesFrom ${this.addAngleBracketsIfNeeded(restriction.type)}`);
        }
        ary.push(`${'\t'.repeat(4)}] ${index === (restrictionsArray.length - 1) ? '.' : ','}`);
        ary.push(`\n`);
      });
    }

    ary.push(`###  ${this.iri}`);
    ary.push(`:${this.name} rdf:type owl:NamedIndividual ,`);
    ary.push('pp:PatternLanguage ;');
    if (this.logos.length > 0) {
      ary.push(`pp:hasLogo "${this.logos[0]}"^^xsd:anyURI ;`);
    }
    ary.push(`pp:hasName "${this.name}"^^xsd:string .`);

    ary.push('#################################################################');
    ary.push('# Individuals');
    ary.push('##############################################################');

    this.patternIRIs.forEach((patternIri, index) => {
      ary.push(`:${this.name} pp:containsPattern :${IriConverter.extractIndividualNameFromIri(patternIri)} .`);
    });

    return ary.join('\n');
  }

  getIsLinkedOpenPatternLanguageStatement(): string {
    return this.iri.indexOf('#') > -1 ? `<${this.patternpediaBaseURI}#LinkedOpenPatterns> <${this.patternpediaBaseURI}#containsPatternGraph> <${this.iri}> .`
      : `<${this.patternpediaBaseURI}#LinkedOpenPatterns> <${this.patternpediaBaseURI}#containsPatternGraph> <${this.iri}#${this.name}> .`;
  }

  private addAngleBracketsIfNeeded(type: string | undefined) {
    if (IriConverter.isIri(type)) { // if we have a uri
      return '<' + type + '>';
    }
    return type;
  }

  // if the object of the sentence is an URI this can be a prefix abbrevation or a complete URI that requires <>
  private addPrefixCharacterOrAngleBrackets(name: string) {

    if (IriConverter.isIri(name)) { // if we have a uri
      return '<' + name + '>';
    }
    if (name.indexOf(':') < 0) {
      return this.getSectionIdentifier(name);
    }
    return name;
  }

}

export default PatternLanguage;

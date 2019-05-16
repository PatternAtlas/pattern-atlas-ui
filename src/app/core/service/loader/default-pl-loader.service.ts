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

import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../pattern-ontology.service';
import Loader from '../../model/loader';
import { selectPatternLanguage } from './pl-selector.function';
import { Logo } from '../data/Logo.interface';
import { Import } from '../data/Import.interface';
import { IriConverter } from '../../util/iri-converter';
import { PatternInstance } from '../../model/PatternInstance.interface';
import { SectionResponse } from '../data/SectionResponse.interface';

@Injectable({
    providedIn: 'root'
})
export class DefaultPlLoaderService extends Loader<any> {

    constructor(private pos: PatternOntologyService) {
        super(null, pos);
    }

  async selectContentFromStore(): Promise<any> {
    const qryPatterns = `SELECT DISTINCT ?pattern
                                      WHERE {
                                          <${this.supportedIRI}> <http://purl.org/patternpedia#containsPattern> ?pattern
                                      }`;
    const patterns = await this.executor.exec(qryPatterns, [IriConverter.getFileName(this.supportedIRI)]);
    const qry = `SELECT DISTINCT ?type ?pattern ?predicate ?property
                 WHERE {
                    <${this.supportedIRI}> pp:containsPattern ?pattern .
                    ?pattern ?predicate ?property .
                    ?pattern rdf:type ?type .
                    FILTER (?type != owl:NamedIndividual && ?predicate != rdf:type)
                    }
                 ORDER BY ?pattern`;
    const graphs = [IriConverter.getFileName(this.supportedIRI)];
    for (const entry of patterns) {
      graphs.push(IriConverter.getFileName(entry.pattern.value));
    }
    return this.executor.exec(qry, graphs);
  }

  selectContentForGraph(supportedIri: string): Promise<any> {
    return selectPatternLanguage(supportedIri, this.executor);
  }

  getOWLImports(supportedIri: string): Promise<Import[]> {
    return this.pos.getOWLImports(supportedIri);
  }

  getPLProperties(supportedIri: string): Promise<SectionResponse[]> {
    return this.pos.getPropertiesOfPL(supportedIri);
  }


  getPLLogo(supportedIri: string): Promise<Logo[]> {
    return this.pos.getPLLogo(supportedIri);
  }

  mapTriples(triples: any): Promise<Map<string, PatternInstance>> {
    const patterns = new Map<string, PatternInstance>();
        for (const row of triples) {
          if (!patterns.get(row.pattern.value)) {
            patterns.set(row.pattern.value,
              new PatternInstance(row.pattern.value, new Map<string, string | string[]>().set(row.predicate.value, row.property.value), row.type.value));
          }
          else { // if we already saw this pattern, add the infomation of the triple to it
            const pattern = patterns.get(row.pattern.value).addProperty(row.predicate.value, row.property.value);
            patterns.set(row.pattern.value, pattern);
          }

        }
        return Promise.resolve(patterns);
    }
}

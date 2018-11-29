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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportModule } from '../material-import/material-import.module';
import { PatternOntologyService } from './service/pattern-ontology.service';
import { CloudComputingPatternsLoader } from '../extensions/pattern-language/cloud-computing-patterns/loader/cloud-computing-patterns-loader'; // tslint:disable-line:max-line-length
import { LoaderRegistryService } from './service/loader/pattern-language-loader/loader-registry.service';
import { PatternLanguageLoader } from '../extensions/repository/pattern-pedia/loader/pattern-language-loader';

@NgModule({
    imports: [
        CommonModule,
        MaterialImportModule
    ],
    exports: [
        MaterialImportModule
    ],
    providers: [
        PatternOntologyService
    ],
    declarations: [
    ]
})
export class CoreModule {
    constructor(private lr: LoaderRegistryService, pos: PatternOntologyService) {
        this.lr.registerContentLoader(new PatternLanguageLoader('http://purl.org/patternpedia#LinkedOpenPatterns', pos));
    }
}

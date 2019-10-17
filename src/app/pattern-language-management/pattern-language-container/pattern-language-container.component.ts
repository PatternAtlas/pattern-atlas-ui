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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentRegistryService } from 'src/app/core/service/component-registry.service';
import { UriConverter } from '../../core/util/uri-converter';

@Component({
    selector: 'pp-pattern-language-container',
    templateUrl: './pattern-language-container.component.html',
    styleUrls: ['./pattern-language-container.component.scss']
})
export class PatternLanguageContainerComponent implements OnInit {

    // the uri of the patterns language
    plEncodedUri: string;
    // the list of registered renderer components for the language
    renderer: Array<any>;

    constructor(private activatedRoute: ActivatedRoute,
                private compRegistry: ComponentRegistryService) {
    }

    ngOnInit() {
        this.plEncodedUri = this.activatedRoute.snapshot.params['plEncodedUri'];
        this.renderer = this.compRegistry.getRenderingComponents(UriConverter.doubleDecodeUri(this.plEncodedUri));
    }
}

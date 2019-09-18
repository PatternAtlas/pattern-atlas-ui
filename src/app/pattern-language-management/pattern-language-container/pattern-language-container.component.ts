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

@Component({
    selector: 'pp-pattern-language-container',
    templateUrl: './pattern-language-container.component.html',
    styleUrls: ['./pattern-language-container.component.scss']
})
export class PatternLanguageContainerComponent implements OnInit {

    // the iri of the pattern language
    plId: string;
    // the list of registered renderer components for the language
    renderer: Array<any>;

    constructor(private route: ActivatedRoute,
        private compRegistry: ComponentRegistryService) {
    }

    ngOnInit() {
        // this.plId = this.route.snapshot.params['plid'];
        // this.renderer = this.compRegistry.getRenderingComponents(this.plId);

        // language id changes if we navigate in component -> container needs to get informed
        this.route.params.subscribe(params => {
          this.setUpRenderer(params['plid']);
        });
    }

    private setUpRenderer(plid: string) {
      this.plId = plid;
      this.renderer = this.compRegistry.getRenderingComponents(this.plId);
    }

}

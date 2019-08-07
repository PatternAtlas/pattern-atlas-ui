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

import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import CloudComputingPattern from '../../model/cloud-computing-pattern';
import { CloudComputingPatternsLoaderService } from '../../loader/cloud-computing-patterns-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';

@Component({
    selector: 'pp-cloud-computing-patterns',
    templateUrl: './cloud-computing-patterns.component.html',
    styleUrls: ['./cloud-computing-patterns.component.scss']
})
export class CloudComputingPatternsComponent implements OnInit {

    patterns: Array<CloudComputingPattern>;
    patternMap: Map<string, CloudComputingPattern>;

    constructor(private loader: CloudComputingPatternsLoaderService,
                private pos: PatternOntologyService,
                private cdr: ChangeDetectorRef,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone) {
    }

    ngOnInit() {
        // we have to load the individual patterns first by getting all imports from the base file
        this.pos.getOWLImports('http://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns')
            .then(res => {
                const importedIris = res.map(i => i.import);
              this.pos.loadUrisToStore(importedIris)
                    .then(() => {
                        // we can now query the data, as all patterns have been loaded
                        this.loader.loadContentFromStore()
                            .then(patternMap => {
                                this.patternMap = patternMap;
                                this.patterns = Array.from(patternMap.values());
                                this.cdr.detectChanges();
                            });
                    });
            });

    }

    navigate(id: string): void {
        this.zone.run(() => {
            this.router.navigate([id], {relativeTo: this.activatedRoute});
        });
    }

    navigateBack(): void {
        this.zone.run(() => {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }

}

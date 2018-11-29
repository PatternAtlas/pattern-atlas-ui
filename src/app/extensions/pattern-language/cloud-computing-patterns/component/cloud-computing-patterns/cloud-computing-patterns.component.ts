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
import { CloudComputingPatternsLoader } from '../../loader/cloud-computing-patterns-loader';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'pp-cloud-computing-patterns',
    templateUrl: './cloud-computing-patterns.component.html',
    styleUrls: ['./cloud-computing-patterns.component.scss']
})
export class CloudComputingPatternsComponent implements OnInit {

    patterns: Array<CloudComputingPattern>;
    patternMap: Map<string, CloudComputingPattern>;

    constructor(private loader: CloudComputingPatternsLoader,
                private cdr: ChangeDetectorRef,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone) {
    }

    ngOnInit() {
        this.loader.loadContentFromStore()
            .subscribe(patternMap => {
                this.patternMap = patternMap;
                this.patterns = Array.from(patternMap.values());
                this.cdr.detectChanges();
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

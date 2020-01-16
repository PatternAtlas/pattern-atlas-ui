/*
 * Copyright (c) 2019 University of Stuttgart.
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
import InternetOfThingsPattern from '../../model/internet-of-things-pattern';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'pp-internet-of-things-patterns',
    templateUrl: './internet-of-things-patterns.component.html',
    styleUrls: ['./internet-of-things-patterns.component.scss']
})
export class InternetOfThingsPatternsComponent implements OnInit {

    patterns: Array<InternetOfThingsPattern>;
    patternMap: Map<string, InternetOfThingsPattern>;

    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private zone: NgZone) {
    }

    ngOnInit() {
        // this.loader.loadContentFromStore()
        //     .then(patternMap => {
        //         this.patternMap = patternMap;
        //         this.patterns = Array.from(patternMap.values());
        //         this.cdr.detectChanges();
        //     });
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

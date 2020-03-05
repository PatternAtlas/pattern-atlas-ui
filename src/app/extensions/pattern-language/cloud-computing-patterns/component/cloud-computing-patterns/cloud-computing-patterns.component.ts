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

import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import CloudComputingPattern from '../../model/cloud-computing-pattern';
import {ActivatedRoute, Router} from '@angular/router';
import {PatternLanguageService} from '../../../../../core/service/pattern-language.service';
import {UriConverter} from '../../../../../core/util/uri-converter';

@Component({
    selector: 'pp-cloud-computing-patterns',
    templateUrl: './cloud-computing-patterns.component.html',
    styleUrls: ['./cloud-computing-patterns.component.scss']
})
export class CloudComputingPatternsComponent implements OnInit {

    patterns: Array<CloudComputingPattern>;

    constructor(private cdr: ChangeDetectorRef,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone,
                private patternLanguageService: PatternLanguageService) {
    }

    async ngOnInit() {
      // const id = this.activatedRoute.snapshot.paramMap.get('id'));
      // console.log(encodedUri);
      // const pl = await this.patternLanguageService.getPatternLanguageById(id);
      // console.log(JSON.stringify(pl));
      // this.patterns = pl.patterns.map(CloudComputingPatternHelper.convertToCloudComputingPattern);
    }

    navigate(uri: string): void {
        const doubleEncodedUri = UriConverter.doubleEncodeUri(uri);
        this.zone.run(() => {
            this.router.navigate([doubleEncodedUri], {relativeTo: this.activatedRoute});
        });
    }

    navigateBack(): void {
        this.zone.run(() => {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }

}

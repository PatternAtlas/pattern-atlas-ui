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

import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { PatternRenderingComponentInterface } from '../../../../../core/model/pattern-rendering-component.interface';
import { ActivatedRoute, Router } from '@angular/router';
import InternetOfThingsPattern from '../../model/internet-of-things-pattern';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, MdEditorComponent } from '../../../../../core/component/md-editor/md-editor.component';

@Component({
    selector: 'pp-internet-of-things-pattern',
    templateUrl: './internet-of-things-pattern.component.html',
    styleUrls: ['./internet-of-things-pattern.component.scss']
})
export class InternetOfThingsPatternComponent implements PatternRenderingComponentInterface, OnInit {

    @ViewChild('mdEditor') private _textEditor: TdTextEditorComponent;

    pId: string;
    pattern: InternetOfThingsPattern;
    mdEditorOptions = {};
    editMode = {
        icon: {showActionButtons: false},
        intent: {showActionButtons: false},
        context: {showActionButtons: false},
        problem: {showActionButtons: false},
        solution: {showActionButtons: false},
        solutionSketches: {showActionButtons: false},
        forces: {showActionButtons: false},
        benefits: {showActionButtons: false},
        drawbacks: {showActionButtons: false},
        result: {showActionButtons: false},
        examples: {showActionButtons: false},
        aliases: {showActionButtons: false},
        variants: {showActionButtons: false},
    };

    constructor(
                private cdr: ChangeDetectorRef,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        // this.loader.loadContentFromStore()
        //     .then(patternMap => {
        //         this.pattern = patternMap.get(UriConverter.doubleDecodeUri(this.pEncodedUri));
        //         this.cdr.detectChanges();
        //     });
    }

    openEditor(field: string): void {
        const dialogRef = this.dialog.open(MdEditorComponent,
            {data: {field: field, label: this.pattern[field].label, content: this.pattern[field].value}});
        this.editMode[field].edit = true;
        dialogRef.afterClosed().subscribe((result: DialogData) => {
            this.pattern[field].value = result.content;
        });
    }

    navigateBack(): void {
        this.zone.run(() => {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }
}

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

import PatternModel from '../../../../core/model/pattern.model';

class CloudComputingPattern extends PatternModel {
    /*
        From Pattern:
            private _id: string;
            iri: string;
            name: string;
     */
    intent: { label: 'Intent', value: string } = {label: 'Intent', value: ''};
    context: { label: 'Context', value: string } = {label: 'Context', value: ''};
    drivingQuestion: { label: 'Driving Question', value: string } = {label: 'Driving Question', value: ''};
    solution: { label: 'Solution', value: string } = {label: 'Solution', value: ''};
    result: { label: 'Result', value: string } = {label: 'Result', value: ''};
    icon: { label: 'Icon', value: string } = {label: 'Icon', value: ''};
    solutionSketches: { label: 'Solution Sketches', value: Array<string> } = {label: 'Solution Sketches', value: []};
    variations: { label: 'Variation', value: Array<string> } = {label: 'Variation', value: []};

    constructor(iri: string,
                name: string,
                icon: string,
                intent: string,
                context: string,
                drivingQuestion: string,
                solution: string,
                solutionSketches: Array<string>,
                result: string,
                variations: Array<string>) {
        super(iri, name);
        this.intent.value = intent;
        this.drivingQuestion.value = drivingQuestion;
        this.context.value = context;
        this.solution.value = solution;
        this.result.value = result;
        this.icon.value = icon;
        this.solutionSketches.value = solutionSketches;
        this.variations.value = variations;
    }
}

export default CloudComputingPattern;

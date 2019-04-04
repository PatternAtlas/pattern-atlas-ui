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

import Pattern from '../../../../core/model/pattern.model';

class InternetOfThingsPattern extends Pattern {
    /*
        From Pattern:
            private _id: string;
            iri: string;
            name: string;
     */
    intent: { label: 'Intent', value: string } = {label: 'Intent', value: ''};
    context: { label: 'Context', value: string } = {label: 'Context', value: ''};
    problem: { label: 'Problem', value: string } = {label: 'Problem', value: ''};
    solution: { label: 'Solution', value: string } = {label: 'Solution', value: ''};
    result: { label: 'Result', value: string } = {label: 'Result', value: ''};
    icon: { label: 'Icon', value: string } = {label: 'Icon', value: ''};
    solutionSketches: { label: 'Solution Sketches', value: Array<string> } = {label: 'Solution Sketches', value: []};
    forces: { label: 'Forces', value: Array<string> } = {label: 'Forces', value: []};
    drawbacks: { label: 'Drawbacks', value: Array<string> } = {label: 'Drawbacks', value: []};
    benefits: { label: 'Benefits', value: Array<string> } = {label: 'Benefits', value: []};
    aliases: { label: 'Aliases', value: Array<string> } = {label: 'Aliases', value: []};
    variants: { label: 'Variants', value: Array<string> } = {label: 'Variants', value: []};
    examples: { label: 'Examples', value: string } = {label: 'Examples', value: ''};

    constructor(iri: string,
                name: string,
                icon: string,
                intent: string,
                context: string,
                problem: string,
                solution: string,
                solutionSketches: Array<string>,
                forces: Array<string>,
                benefits: Array<string>,
                drawbacks: Array<string>,
                result: string,
                examples: string,
                aliases: Array<string>,
                variants: Array<string>) {
        super(iri, name);
        this.icon.value = icon;
        this.intent.value = intent;
        this.context.value = context;
        this.problem.value = problem;
        this.solution.value = solution;
        this.solutionSketches.value = solutionSketches;
        this.forces.value = forces;
        this.benefits.value = benefits;
        this.drawbacks.value = drawbacks;
        this.result.value = result;
        this.examples.value = examples;
        this.aliases.value = aliases;
        this.variants.value = variants;
    }
}

export default InternetOfThingsPattern;

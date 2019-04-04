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

import Pattern from '../../../../core/model/pattern.model';
import { RdfModelTriple } from '../../../../core/model/rdf-model-triple';
import { RdfModelNode } from '../../../../core/model/rdf-model-node';
import { IriConverter } from '../../../../core/util/iri-converter';

class CloudComputingPattern extends Pattern {
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
                name?: string,
                icon?: string,
                intent?: string,
                context?: string,
                drivingQuestion?: string,
                solution?: string,
                solutionSketches: Array<string> = [],
                result?: string,
                variations: Array<string> = []) {
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

    toTurtle(): string {
        const ary = this.getPrefixes();
        ary.push('\n');
        ary.push(`<${IriConverter.getFileName(this.iri)}> rdf:type owl:Ontology .`);
        ary.push('\n');
        ary.push('# #################################################################');
        ary.push('# #');
        ary.push('# #    Individuals');
        ary.push('# #');
        ary.push('# #################################################################');
        ary.push('\n');
        ary.push(`### ${this.iri}`);
        ary.push(`<${this.iri}> rdf:type owl:NamedIndividual ,`);
        ary.push(`${' '.repeat(16)} ${this.getPatternType()} ;`);
        ary.push(`${' '.repeat(8)} <http://purl.org/patternpedia#hasName> "${this.name}"^^xsd:string ;`);
        ary.push(`${' '.repeat(8)} <http://purl.org/patternpedia/cloudcomputingpatterns#hasContext> "${this.context.value}"^^xsd:string ;`);
        ary.push(`${' '.repeat(8)} <http://purl.org/patternpedia/cloudcomputingpatterns#hasDrivingQuestion> "${this.drivingQuestion.value}"^^xsd:string ;`);
        ary.push(`${' '.repeat(8)} <http://purl.org/patternpedia/cloudcomputingpatterns#hasIcon> "${this.icon.value}"^^xsd:anyURI ;`);
        ary.push(`${' '.repeat(8)} <http://purl.org/patternpedia/cloudcomputingpatterns#hasIntent> "${this.intent.value}"^^xsd:string ;`);
        ary.push(`${' '.repeat(8)} <http://purl.org/patternpedia/cloudcomputingpatterns#hasSolution> "${this.solution.value}"^^xsd:string ;`);
        ary.push('\n');

        // Todo solutionSketches and variations

        return ary.join('\n');
    }

    getPatternType(): string {
        return '<http://purl.org/patternpedia/cloudcomputingpatterns#CloudComputingPattern>';
    }

    getPrefixes(): Array<string> {
        const ary: Array<string> = [];
        ary.push(
            `@prefix : <${IriConverter.getFileName(this.iri)}#> .`,
            `@prefix owl: <http://www.w3.org/2002/07/owl#> .`,
            `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .`,
            `@prefix xml: <http://www.w3.org/XML/1998/namespace> .`,
            `@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .`
        );
        return ary;
    }

    // createRdfModelNamedNode(value: string, datatype?: string): RdfModelNode {
    //     if (datatype) {
    //         return new RdfModelNode('NamedNode', ['interfaceName, nominalValue'], value, datatype);
    //     } else {
    //         return new RdfModelNode('NamedNode', ['interfaceName, nominalValue'], value);
    //     }
    // }
    //
    // createRdfModelLiteralNode(value: string, datatype: string): RdfModelNode {
    //     return new RdfModelNode('Literal', ['interfaceName, nominalValue'], value, datatype);
    // }
    //
    // createPatternNode(): RdfModelNode {
    //     return this.createRdfModelNamedNode(this.iri);
    // }
    //
    // // Todo: This does not work because RDFModel.RDFEnvironment.RDFModel.Profile.resolve throws error toResolve.indexOf is not a function
    // toRdfModelTriples(): Array<RdfModelTriple> {
    //     const triples: Array<RdfModelTriple> = [];
    //     // Statements about the file
    //     triples.push(new RdfModelTriple(
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns/elasticinfrastructure'),
    //         this.createRdfModelNamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //         this.createRdfModelNamedNode('http://www.w3.org/2002/07/owl#Ontology')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns/elasticinfrastructure'),
    //         this.createRdfModelNamedNode('http://www.w3.org/2002/07/owl#imports'),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns')
    //     ));
    //
    //     // Statements about the individual
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //         this.createRdfModelNamedNode('http://www.w3.org/2002/07/owl#NamedIndividual')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns#CloudComputingPattern')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia#hasName'),
    //         this.createRdfModelLiteralNode(this.name, 'http://www.w3.org/2001/XMLSchema#string')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns#hasIcon'),
    //         this.createRdfModelNamedNode(this.icon.value, 'http://www.w3.org/2001/XMLSchema#anyURI')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns#hasIntent'),
    //         this.createRdfModelNamedNode(this.intent.value, 'http://www.w3.org/2001/XMLSchema#string')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia#hasContext'),
    //         this.createRdfModelLiteralNode(this.context.value, 'http://www.w3.org/2001/XMLSchema#string')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns#hasDrivingQuestion'),
    //         this.createRdfModelNamedNode(this.drivingQuestion.value, 'http://www.w3.org/2001/XMLSchema#string')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns#hasSolution'),
    //         this.createRdfModelNamedNode(this.solution.value, 'http://www.w3.org/2001/XMLSchema#string')
    //     ));
    //     triples.push(new RdfModelTriple(
    //         this.createPatternNode(),
    //         this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns#hasResult'),
    //         this.createRdfModelNamedNode(this.result.value, 'http://www.w3.org/2001/XMLSchema#string')
    //     ));
    //     for (const sketch of this.solutionSketches.value) {
    //         triples.push(new RdfModelTriple(
    //             this.createPatternNode(),
    //             this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns#hasSolutionSketch'),
    //             this.createRdfModelNamedNode(sketch, 'http://www.w3.org/2001/XMLSchema#anyURI')
    //         ));
    //     }
    //     for (const variation of this.variations.value) {
    //         triples.push(new RdfModelTriple(
    //             this.createPatternNode(),
    //             this.createRdfModelNamedNode('http://purl.org/patternpedia/cloudcomputingpatterns#hasVariation'),
    //             this.createRdfModelNamedNode(variation, 'http://www.w3.org/2001/XMLSchema#string')
    //         ));
    //     }
    //     return triples;
    // }
}

export default CloudComputingPattern;

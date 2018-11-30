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

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { SparqlExecutorInterface } from '../../../model/sparql-executor.interface';

abstract class Loader<T> {
    // How does a loader work?
    //      The loader knows the IRI of the content
    //      The loader knows the proper SELECT statement
    //      The loader has corresponding logic to convert the selected triples to an array of the correct type

    supportedIRI: string;
    executor: SparqlExecutorInterface;

    protected constructor(supportedIRI: string, executor: SparqlExecutorInterface) {
        this.supportedIRI = supportedIRI;
        this.executor = executor;
    }

    /**
     * Orchestrates Loading and Conversion
     */
    loadContentFromStore(): Observable<Map<string, T>> {
        return this.selectContentFromStore()
            .pipe(
                flatMap(triples => this.mapTriplesToObjects(triples))
            );
    }

    abstract selectContentFromStore(): Observable<any>;

    abstract mapTriplesToObjects(triples: any): Observable<Map<string, T>>;
}

export default Loader;

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

import { SparqlExecutor } from './sparql.executor';

abstract class Writer<T> {
    _supportedIRI: string;
    executor: SparqlExecutor;

    protected constructor(supportedIRI: string, executor: SparqlExecutor) {
        this._supportedIRI = supportedIRI;
        this.executor = executor;
    }

    set supportedIRI(iri: string) {
        this._supportedIRI = iri;
    }

    get supportedIRI(): string {
        return this._supportedIRI;

    }

    abstract writePatternToStore(pattern: T): Promise<void>;
}

export default Writer;

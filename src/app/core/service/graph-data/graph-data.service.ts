/*
 * Copyright (c) 2020 University of Stuttgart.
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
import Pattern from '../../model/hal/pattern.model';
import { PatternContainer } from '../../model/hal/pattern-container.model';
import { GraphNode } from '../../component/graph-display/graph-display.component';
import { PatternContainerResponse } from '../../model/hal/pattern-container-response.interface';
import { Injectable } from '@angular/core';
import PatternLanguage from '../../model/hal/pattern-language.model';

@Injectable()
export abstract class GraphDataService {

  abstract addPatterns(url: string, patterns: Pattern[]): Observable<PatternContainerResponse>;

  abstract getPatternContainerByUri(uri: string): Observable<PatternContainer>;

  abstract getPatternContainer(url: string): Observable<PatternContainer> ;

  abstract saveGraph(patternContainer: PatternContainer | PatternLanguage, nodeList: any[]): Observable<any>;

  abstract getGraph(patternContainer: PatternContainer | PatternLanguage): Observable<{ graph: Array<GraphNode> }>;

  abstract getEdgeTypes(): Observable<string[]>;
}

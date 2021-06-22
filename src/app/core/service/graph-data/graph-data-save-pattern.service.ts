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
import { PatternContainer } from '../../model/hal/pattern-container.model';
import PatternLanguage from '../../model/hal/pattern-language.model';
import { GraphDataService } from './graph-data.service';

export abstract class GraphDataSavePatternService extends GraphDataService {

  abstract savePattern(patternContainer: PatternContainer | PatternLanguage, node: any): Observable<any>;
}

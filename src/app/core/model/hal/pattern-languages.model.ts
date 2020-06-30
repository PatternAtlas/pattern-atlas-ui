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

import { HalLink } from './hal-link.interface';
import PatternLanguageModel from './pattern-language-model.model';

class PatternLanguages {
  _embedded: { patternLanguageModels: Array<PatternLanguageModel> };
  _links: {
    findByUri: HalLink;
    self: HalLink;
    patternViews: HalLink;
  };
}

export default PatternLanguages;

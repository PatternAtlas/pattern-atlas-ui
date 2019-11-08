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

import Pattern from './pattern.model';
import UriEntity from './uri-entity.model';
import PatternSchema from './pattern-schema.model';
import {HalLink} from './HalLink.interface';

class PatternLanguage extends UriEntity {
  patterns?: Array<Pattern>;
    logo: string;
    patternSchema: PatternSchema;
    _links: {
      self: HalLink,
      patterns: HalLink,
      patternLanguages: HalLink
    };
}

export default PatternLanguage;

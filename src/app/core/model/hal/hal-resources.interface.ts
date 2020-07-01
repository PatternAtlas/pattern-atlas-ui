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

export interface PatternResource {
  self: HalLink;
  content: HalLink;
  renderedContent: HalLink;
  patternLanguage: HalLink;
}

export interface PatternLanguageResource {
  self: HalLink;
  patterns: HalLink;
  patternLanguages: HalLink;
  directedEdges: HalLink;
  undirectedEdges: HalLink;
  graph: HalLink;
}

export interface PatternLanguagesResource {
  self: HalLink;
  findByUri: HalLink;
}

export interface PatternSchemaResource {
  self: HalLink;
  patternLanguage: HalLink;
}

export interface DirectedEdgeResource {
  self: HalLink;
  sourcePattern: HalLink;
  targetPattern: HalLink;
  patternLanguage: HalLink;
}

export interface UndirectedEdgeResource {
  self: HalLink;
  patternLanguage: HalLink;
  pattern: Array<HalLink>;
}

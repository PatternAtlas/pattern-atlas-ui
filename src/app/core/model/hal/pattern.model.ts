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

import UriEntity from './uri-entity.model';
import { HalLink } from './hal-link.interface';

class Pattern extends UriEntity {
  iconUrl?: string;
  paperRef?: string;
  content: any;
  renderedContent: any;
  patternLanguageId: string;
  patternLanguageName: string;

  // extension for deployment modelling
  deploymentModelingBehaviorPattern: boolean;
  deploymentModelingStructurePattern: boolean;

  _links: {
    self: HalLink;
    content: HalLink;
    renderedContent: HalLink;
    patternLanguage: HalLink;
    undirectedEdges?: HalLink | HalLink[];
    undirectedEdgesFromPatternLanguage?: HalLink | HalLink[];
    outgoingDirectedEdges?: HalLink | HalLink[];
    outgoingDirectedEdgesFromPatternLanguage?: HalLink | HalLink[];
    ingoingDirectedEdges?: HalLink | HalLink[];
    ingoingDirectedEdgesFromPatternLanguage?: HalLink | HalLink[];

  };
}

export default Pattern;

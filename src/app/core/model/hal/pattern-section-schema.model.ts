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

class PatternSectionSchema {
    id: number;
    label: string;
    name: string;
    type: string;
    position: number;

    constructor() 
    constructor(_label: string, _name: string, _type: string, _position: number)
    constructor(_label?: string, _name?: string, _type?: string, _position?: number)
    {
      this.label = _label;
      this.name = _name;
      this.type = _type;
      this.position = _position;
    }
}

export default PatternSectionSchema;

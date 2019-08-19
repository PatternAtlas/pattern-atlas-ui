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

import { NgModule } from '@angular/core';
import { CloudComputingPatternsModule } from './pattern-language/cloud-computing-patterns/cloud-computing-patterns.module';
import { InternetOfThingsPatternsModule } from './pattern-language/internet-of-things-patterns/internet-of-things-patterns.module';
import { EnterpriseIntegrationPatternsModule } from './pattern-language/enterprise-integration-patterns/enterprise-integration-patterns.module';

import { FilterViewComponent } from './../filter/component/filter-view/filter-view.component';
import { GraphModule } from '../graph/graph.module';

@NgModule({
    // here we import all specific extensions and make them available for the app
    imports: [
      CloudComputingPatternsModule,
      InternetOfThingsPatternsModule,
      EnterpriseIntegrationPatternsModule,
      GraphModule
    ],
    declarations: [
      // FilterViewComponent
    ],
    entryComponents: [
      FilterViewComponent
    ],
    exports: []
})
export class ExtensionsModule {
}

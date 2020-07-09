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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globals } from '../../globals';
import { tap } from 'rxjs/operators';


@Injectable()
export class ConcreteSolutionService {

  private readonly repoEndpoint = globals.repoEndpoint + '/concrete-solutions';


  constructor(private httpClient: HttpClient) {
  }


  getTechnologies(uuid: string) {
    return this.httpClient.get(this.repoEndpoint + '/technologies/' + uuid);
  }


  aggregateDesignModel(uuid: string, technology: string) {
    this.httpClient.post(this.repoEndpoint + '/aggregate/' + uuid, null, {
      params: { technology: technology }
    }).subscribe((response: any) => {
      try {
        console.debug('Aggregation response is', response);
        const blob = new Blob([response.file], { type: response.mime });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = response.name;
        document.body.appendChild(link);

        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        document.body.removeChild(link);
      } catch (e) {
        console.error('Could not download aggregation result', e);
      }
    });
  }
}

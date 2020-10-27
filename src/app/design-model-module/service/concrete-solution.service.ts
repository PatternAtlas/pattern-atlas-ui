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
import { FileDTO } from '../model/file-dto';


@Injectable()
export class ConcreteSolutionService {

  private readonly repoEndpoint = globals.repoEndpoint + '/design-models';


  constructor(private httpClient: HttpClient) {
  }


  getConcreteSolutionSet(uuid: string) {
    return this.httpClient.get(this.repoEndpoint + '/' + uuid + '/concrete-solutions');
  }


  aggregateDesignModel(uuid: string, query: {}) {
    this.httpClient.post(this.repoEndpoint + '/' + uuid + '/aggregate', query).subscribe((files: FileDTO[]) => {
      try {
        console.debug('Aggregation response is', files);
        files.forEach(file => {
          const blob = new Blob([file.file], { type: file.mime });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = file.name;
          document.body.appendChild(link);

          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          document.body.removeChild(link);
        });
      } catch (e) {
        console.error('Could not download aggregation result', e);
      }
    });
  }
}

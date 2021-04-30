import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

export enum UiFeatures {
  DESIGN_MODEL = 'designModel',
  PATTERNCANDIDATE = 'patternCandidate',
  PATTERNVIEWS = 'patternViews',
  ISSUE = 'issue',
  SHOW_SETTINGS = 'showSettings',
  EDITING = 'editing'
}

export interface PatternAtlasUiConfiguration {
  features: {
    designModel: boolean,
    patternCandidate: boolean,
    patternViews: boolean,
    issue: boolean,
    showSettings: boolean,
    editing: boolean
  };
}

interface EtcdResponse {
  action: string;
  node: EtcdNode;
}

interface EtcdNode {
  dir?: boolean;
  key: string;
  value?: string;
  nodes?: EtcdNode[];
  modifiedIndex: number;
  createdIndex: number;
}

const initialValues: PatternAtlasUiConfiguration = {
  features: {
    designModel: false,
    patternCandidate: false,
    patternViews: false,
    issue: false,
    showSettings: false,
    editing: true
  },
};

@Injectable({ providedIn: 'root' })
export class PatternAtlasUiRepositoryConfigurationService {
  configuration: PatternAtlasUiConfiguration;

  constructor(private http: HttpClient) {
  }

  /**
   * Sets the configuration Attribute for the service => Access the configuration file from the resource
   * In case of error
   * Is the style below the method better/is it applicable?
   */
  getConfigurationFromBackend(): Observable<PatternAtlasUiConfiguration> {
    return this.http
      .get<EtcdResponse>(
        environment.CONFIG_SEVER_URL + '/features?recursive=true'
      )
      .pipe(
        map((response: EtcdResponse) => {
          this.configuration = initialValues;
          console.log(this.configuration);
          this.parseNode(response.node, this.configuration);
          return this.configuration;
        })
      );
  }

  applyConfig(feature: UiFeatures, checked: boolean): Observable<string> {
    const url = environment.CONFIG_SEVER_URL + '/features/' + feature;

    return this.http.put<string>(
      url,
      {},
      { params: { value: String(checked) } }
    );
  }

  /**
   * etcd stores and serves the configuration in a from like
   * <code>{ "key": "/features", "dir": true, "nodes": [
   * { "key": "/feature/hello", "value": "world" } ] }</code>.
   * Thus, we must parse it and represent it in the form of a TypeScript object.
   *
   * As a result, this method returns the following JS object for the presented example:
   * <code>{ features: { hello: 'world' } }</code>
   *
   * @param node the etcd node to parse.
   * @param obj the object to store the parsed values in.
   * @private
   */
  private parseNode(node: EtcdNode, obj: any): void {
    const slashIndex = node.key.lastIndexOf('/');
    const key = node.key.substr(slashIndex + 1);
    if (node.nodes) {
      node.nodes.forEach((child) => this.parseNode(child, obj[key]));
    } else {
      const value = node.value.toLowerCase();
      if (value === 'true' || value === 'on' || value === 'yes') {
        obj[key] = true;
      } else if (value === 'false' || value === 'off' || value === 'no') {
        obj[key] = false;
      } else {
        obj[key] = value;
      }
    }
  }
}

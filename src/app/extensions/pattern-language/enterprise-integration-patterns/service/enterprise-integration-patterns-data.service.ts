import { Injectable } from '@angular/core';
import { EnterpriseIntegrationPatternsLoaderService } from '../loader/enterprise-integration-patterns-loader.service';
import { EnterpriseIntegrationPatternsLinkLoaderService } from '../loader/enterprise-integration-patterns-link-loader.service';
import { EnterpriseIntegrationPatternsGroupLoaderService } from '../loader/enterprise-integration-patterns-group-loader.service';
import EnterpriseIntegrationPattern from '../model/enterprise-integration-pattern';
import { Link } from 'src/app/graph/model';

@Injectable({
  providedIn: 'root'
})
/**
 * this service holds all the enterprise integration pattern data for usage across components without requesting them with the individual loader.
 */
export class EnterpriseIntegrationPatternsDataService {

  private nodeData: Map<string, EnterpriseIntegrationPattern>;
  private linkData: Map<string, Link>;
  private groupData: Map<string, any>;

  constructor(private nodeLoader: EnterpriseIntegrationPatternsLoaderService,
    private linkLoader: EnterpriseIntegrationPatternsLinkLoaderService,
    private groupLoader: EnterpriseIntegrationPatternsGroupLoaderService) { }

  getAllData() {
    return Promise.all([this.getNodeData(), this.getLinkData(), this.getGroupData()]);
  }

  getNodeData(): Promise<Map<string, EnterpriseIntegrationPattern>> {
    return this.nodeLoader.loadContentFromStore();
  }

  getLinkData(): Promise<Map<string, Link>> {
    return this.linkLoader.loadContentFromStore();
  }

  getGroupData(): Promise<Map<string, any>> {
    return this.groupLoader.loadContentFromStore();
  }

  private lazyLoad(data, loader) {
    if (!data) {
      return new Promise((resolve, reject) => {
        loader.loadContentFromStore()
          .then(map => {
            data = map; // this won't work!
            resolve(map);
          });
      });
    }
    return Promise.resolve(data);
  }
}

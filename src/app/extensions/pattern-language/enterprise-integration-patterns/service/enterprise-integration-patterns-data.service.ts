import { Injectable } from '@angular/core';
import EnterpriseIntegrationPattern from '../model/enterprise-integration-pattern';
import { Link } from 'src/app/graph/model';

@Injectable({
    providedIn: 'root'
})
/**
 * this service holds all the enterprise integration patterns data for usage across components without requesting them with the individual loader.
 */
export class EnterpriseIntegrationPatternsDataService {

    private nodeData: Map<string, EnterpriseIntegrationPattern>;
    private linkData: Map<string, Link>;
    private groupData: Map<string, any>;

    constructor() {
    }

    getAllData() {
        return Promise.all([this.getNodeData(), this.getLinkData(), this.getGroupData()]);
    }

    getNodeData(): Promise<Map<string, EnterpriseIntegrationPattern>> {
        return null;
    }

    getLinkData(): Promise<Map<string, Link>> {
        return null;
    }

    getGroupData(): Promise<Map<string, any>> {
        return null;
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

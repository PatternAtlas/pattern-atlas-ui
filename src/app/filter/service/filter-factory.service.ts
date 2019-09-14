import { Injectable } from '@angular/core';
import Filter from '../model/filter';
import { FilterLoaderService } from '../loader/filter-loader.service';

@Injectable({
  providedIn: 'root'
})
export class FilterFactoryService {

  private configs: Map<string, any>;

  constructor(private loader: FilterLoaderService) {
    this.configs = new Map<string, any>();
  }

  async createFilter(uri: string): Promise<Filter> {
    const config = await this.getConfig(uri);
    return Promise.resolve(new Filter(config));
  }

  async getConfig(uri: string): Promise<any> {
    let config = this.configs.get(uri);
    if (!config) {
      // create new default config via loader
      const result = await this.loader.loadContentFromStore(uri);
      config = this.createConfig(result.get(uri));
      config.filterByClrs = false;
      this.configs.set(uri, config);
    }

    return Promise.resolve(config);
  }

  setConfig(uri: string, config: any) {
    this.configs.set(uri, config);
  }

  /**
   * Creates a config object containing the given list of properties as keys and initializes them with an empty string
   * @param properties list of string properties
   */
  private createConfig(properties: Array<string>) {
    const config = {};
    for (const p of properties) {
      config[p] = '';
    }

    return config;
  }
}

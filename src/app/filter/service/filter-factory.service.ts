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
    let config = await this.getConfig(uri);
    return Promise.resolve(new Filter(config));
  }

  async getConfig(uri: string): Promise<any> {
    let config = this.configs.get(uri);
    if (!config) {
      // create new default config via loader
      config = await this.loader.loadContentFromStore(uri);
      this.configs.set(uri, config);
    }

    return Promise.resolve(config);
  }
}

import { HalLink } from '../../../core/model/hal/hal-link.interface';
import { DesignModel } from './design-model';


export interface DesignModelResponse {
  _embedded: {
    designModels: DesignModel[]
  };
  _links: {
    findByUri: HalLink;
    patternViews: HalLink;
    self: HalLink;
  };
}

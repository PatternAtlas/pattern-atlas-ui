import { HalLink } from '../../../core/model/hal/hal-link.interface';

export interface HalCollectionResponse {
  _embedded: {
    [content: string]: any
  };
  _links: {
    self: HalLink;
    [link: string]: HalLink;
  };
}

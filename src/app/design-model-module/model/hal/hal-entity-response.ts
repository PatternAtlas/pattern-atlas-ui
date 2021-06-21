import { HalLink } from '../../../core/model/hal/hal-link.interface';

export interface HalEntityResponse {
  content: {
    [content: string]: any
  };
  _links: {
    self: HalLink;
    [link: string]: HalLink;
  };
}

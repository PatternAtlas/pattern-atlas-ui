import {PatternView} from './pattern-view.model';
import {HalLink} from './hal-link.interface';

export interface PatternViewResponse {
    _embedded: {
      patternViews: PatternView[]
    };
    _links: {
      findByUri: HalLink;
      patternViews: HalLink;
      self: HalLink;
    };
}

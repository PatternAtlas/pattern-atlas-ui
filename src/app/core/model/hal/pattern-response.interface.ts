import Pattern from './pattern.model';
import { HalLink } from './hal-link.interface';

export interface PatternResponse {
  _embedded: {
    patternModels: Pattern[];
  };
  _links: {
    self: HalLink;
    patternLanguage: HalLink;
  };
}

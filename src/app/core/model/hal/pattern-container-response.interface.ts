import { PatternContainer } from './pattern-container.model';
import { HalLink } from './hal-link.interface';

export interface PatternContainerResponse {
  _embedded: {
    patternContainer: PatternContainer[]
  };
  _links: {
    findByUri: HalLink;
    patternContainer: HalLink;
    self: HalLink;
  };
}

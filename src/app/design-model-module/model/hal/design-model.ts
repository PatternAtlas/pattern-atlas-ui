import Pattern from '../../../core/model/hal/pattern.model';
import UriEntity from '../../../core/model/hal/uri-entity.model';
import { HalLink } from '../../../core/model/hal/hal-link.interface';
import { PatternContainer } from '../../../core/model/hal/pattern-container.model';


export class DesignModel extends UriEntity {
  _embedded: {
    patterns: Pattern[];
  }
  _links: {
    self: HalLink;
    patternViews: HalLink;
    patterns: HalLink;
    directedEdges: HalLink;
    undirectedEdges: HalLink;
    graph: HalLink;
  };
}

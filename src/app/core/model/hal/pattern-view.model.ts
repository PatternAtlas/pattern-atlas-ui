import Pattern from './pattern.model';
import {DirectedEdge} from './directed-edge.model';
import {UndirectedEdge} from './undirected-edge.model';
import UriEntity from './uri-entity.model';
import {HalLink} from './hal-link.interface';

export class PatternView extends UriEntity{
  patterns: Pattern[];
  directedEdges: DirectedEdge[];
  undirectedEdges: UndirectedEdge[];
  _links: {
    self: HalLink;
    patternViews: HalLink;
    patterns: HalLink;
  }
}

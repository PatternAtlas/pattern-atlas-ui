import Pattern from './pattern.model';
import {DirectedEdge} from './directed-edge.model';
import {UndirectedEdge} from './undirected-edge.model';
import UriEntity from './uri-entity.model';

export class PatternView extends UriEntity{
  patterns: Pattern[];
  directedEdges: DirectedEdge[];
  undirectedEdges: UndirectedEdge[];
}

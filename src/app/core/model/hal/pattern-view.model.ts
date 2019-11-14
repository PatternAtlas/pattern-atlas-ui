import Pattern from './pattern.model';
import {DirectedEdge} from './directed-edge.model';
import {UndirectedEdge} from './undirected-edge.model';

export class PatternView {
  patterns: Pattern[];
  directedEdges: DirectedEdge[];
  undirectedEdges: UndirectedEdge[];
}

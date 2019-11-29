import Pattern from './pattern.model';
import {DirectedEdgeModel} from './directed-edge.model';
import {UndirectedEdgeModel} from './undirected-edge.model';
import UriEntity from './uri-entity.model';
import {HalLink} from './hal-link.interface';

export class PatternView extends UriEntity {
    patterns: Pattern[];
    directedEdges: DirectedEdgeModel[];
    undirectedEdges: UndirectedEdgeModel[];
    _links: {
        self: HalLink;
        patternViews: HalLink;
        patterns: HalLink;
        directedEdges: HalLink;
        undirectedEdges: HalLink;
    };
}

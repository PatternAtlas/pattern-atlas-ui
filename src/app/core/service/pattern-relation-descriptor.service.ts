import {Injectable} from '@angular/core';
import {globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';
import Pattern from '../model/hal/pattern.model';
import {HalLink} from '../model/hal/hal-link.interface';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PatternRelationDescriptorService {

    private repoEndpoint = globals.repoEndpoint;

    constructor(private http: HttpClient) {
    }

    savePatternRelation(url: string, relation: DirectedEdgeModel | UndirectedEdgeModel): Observable<any> {
        return this.http.post(url, relation, {observe: 'response'});
    }

    getDirectedEdgeByUrl(url: string): Observable<DirectedEdgeModel> {
        return this.http.get<DirectedEdgeModel>(url);
    }

    getUndirectedEdgeByUrl(url: string): Observable<UndirectedEdgeModel> {
        return this.http.get<UndirectedEdgeModel>(url);
    }

    getEdgesForPattern(pattern: Pattern): Observable<EdgeWithType[]> {
        if (!pattern || (!pattern._links.undirectedEdges && pattern._links.ingoingDirectedEdges && pattern._links.outgoingDirectedEdges)) {
            return of(null);
        }
        const observables = [];
        const edgeLinks = ['undirectedEdges', 'outgoingDirectedEdges', 'ingoingDirectedEdges'];
        edgeLinks.forEach((edgeType: string) => {
            const edgeLink = pattern._links[edgeType];
            if (edgeLink) {
                const halLinks = Array.isArray(edgeLink) ? <HalLink[]>edgeLink : [edgeLink];
                observables.push(...halLinks.map(link =>
                    this.getUndirectedEdgeByUrl(link.href).pipe(map(res => {
                        return <EdgeWithType>{type: edgeType, edge: res};
                    }))
                ));
            }
        });

        return observables.length > 0 ? forkJoin(observables) : of(null);
    }
}

export class EdgeWithType {
    type: string;
    edge: (DirectedEdgeModel | UndirectedEdgeModel);
}

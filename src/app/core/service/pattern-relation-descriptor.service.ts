import {Injectable} from '@angular/core';
import {globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';
import Pattern from '../model/hal/pattern.model';
import {HalLink} from '../model/hal/hal-link.interface';

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

    getEdgeByUrl(url: string): Observable<any> {
        return this.http.get(url);
    }

    getEdgesForPattern(pattern: Pattern): Observable<(DirectedEdgeModel | UndirectedEdgeModel)[]> {
        if (!pattern || (!pattern._links.undirectedEdges && pattern._links.ingoingDirectedEdges && pattern._links.outgoingDirectedEdges)) {
            return of(null);
        }
        const observables = [];
        const edgeLinks = [pattern._links.undirectedEdges, pattern._links.outgoingDirectedEdges, pattern._links.ingoingDirectedEdges];
        edgeLinks.forEach((edgeLink: HalLink | HalLink[]) => {
            if (edgeLink) {
                const halLinks = Array.isArray(edgeLink) ? <HalLink[]>edgeLink : [edgeLink];
                observables.push(...halLinks.map(link => this.getEdgeByUrl(link.href)));
            }
        });

        return observables.length > 0 ? forkJoin(observables) : of([]);
    }
}

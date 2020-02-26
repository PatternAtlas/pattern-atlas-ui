import {Injectable} from '@angular/core';
import {globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';
import Pattern from '../model/hal/pattern.model';
import {HalLink} from '../model/hal/hal-link.interface';
import {map} from 'rxjs/operators';
import PatternLanguage from '../model/hal/pattern-language.model';
import {CreateUndirectedEdgeRequest} from '../model/hal/create-undirected-edge-request';
import {CreateDirectedEdgeRequest} from '../model/hal/create-directed-edge-request';

@Injectable({
    providedIn: 'root'
})
export class PatternRelationDescriptorService {

    private repoEndpoint = globals.repoEndpoint;

    constructor(private http: HttpClient) {
    }

    addRelationToPL(patternLanguage: PatternLanguage, relation: DirectedEdgeModel | UndirectedEdgeModel): Observable<any> {
        return relation instanceof DirectedEdgeModel ?
            this.http.post(patternLanguage._links.directedEdges.href, new CreateDirectedEdgeRequest(relation), {observe: 'response'}) :
            this.http.post(patternLanguage._links.undirectedEdges.href, new CreateUndirectedEdgeRequest(relation), {observe: 'response'});
    }

    getDirectedEdgeByUrl(url: string): Observable<DirectedEdgeModel> {
        return this.http.get<DirectedEdgeModel>(url);
    }

    getUndirectedEdgeByUrl(url: string): Observable<UndirectedEdgeModel> {
        return this.http.get<UndirectedEdgeModel>(url);
    }

    getEdgesForPattern(pattern: Pattern): Observable<EdgeWithType[]> {
        if (!pattern) {
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

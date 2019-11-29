import {Injectable} from '@angular/core';
import {globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';

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
}

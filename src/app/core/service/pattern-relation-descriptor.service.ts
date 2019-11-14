import {Injectable} from '@angular/core';
import {globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DirectedEdge} from '../model/hal/directed-edge.model';
import {UndirectedEdge} from '../model/hal/undirected-edge.model';

@Injectable({
  providedIn: 'root'
})
export class PatternRelationDescriptorService {

  private repoEndpoint = globals.repoEndpoint;

  constructor(private http: HttpClient) {
  }

  savePatternRelation(url: string, relation: DirectedEdge | UndirectedEdge): Observable<any> {
    return this.http.post(url, relation, {observe: 'response'});
  }
}

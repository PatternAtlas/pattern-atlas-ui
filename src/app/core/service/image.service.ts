import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {globals} from '../../globals';
import {Image} from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private repoEndpoint = globals.repoEndpoint;

  constructor(private http: HttpClient) {
  }

  getImageById(id: String): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = this.repoEndpoint + '/getImageById/' + id;
    return this.http.get<string>(url, {headers, responseType: 'text' as 'json'});
  }

  updateImage(image: Image): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = this.repoEndpoint + '/updateImage/' + image.id;
    return this.http.post<string>(url, image.data, {headers, observe: 'response', responseType: 'text' as 'json'});
  }
}

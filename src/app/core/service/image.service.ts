import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../model/image';
import { ImageModel } from '../model/image-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private repoEndpoint = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  // getImageById(id: String): Observable<string> {
  //   const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  //   const url = this.repoEndpoint + '/getImageById/' + id;
  //   return this.http.get<string>(url, {headers, responseType: 'text' as 'json'});
  // }

  getImageById(id: string): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = this.repoEndpoint + '/get-image-and-comments-by-id/' + id;
    return this.http.get<ImageModel>(url, { observe: 'response' });
  }

  updateImage(image: Image): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = this.repoEndpoint + '/update-image/' + image.id;
    return this.http.post<string>(url, image.data, { headers, observe: 'response', responseType: 'text' as 'json' });
  }
}

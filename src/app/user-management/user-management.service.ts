import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../authentication/config.service';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id: string,
  roles: any[],
  email: string,
  name: string,
}

@Injectable()
export class UserManagementService {

  private userInfoEndpoint: string;
  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private toasterService: ToasterService
  ) {
    this.repoEndpoint = this.config.repositoryUrl;
    this.userInfoEndpoint = this.config.userInfoUrl;
    this.serviceEndpoint = '/user/';
  }

  public getUser(): Observable<any> {
    return this.http.get<any>(this.userInfoEndpoint).pipe(
      map(result => {
        return result
      }),
      catchError(error => {
        console.error(error);
        this.toasterService.pop('error', 'Getting user info did not work: ', error)
        return [];
      }),
    )
  }
 
}

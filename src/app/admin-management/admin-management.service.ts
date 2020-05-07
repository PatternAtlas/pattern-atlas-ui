import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../authentication/config.service';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../user-management/user-management.service';

export interface PAUser extends User {
  password: string,
  issueRatings: any[],
  comments: any,
}

@Injectable()
export class AdminManagementService {

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

   /** 
   * Pattern Pedia API 
   * */

  public getAllUsers(): Observable<PAUser[]> {
    return this.http.get<PAUser>(this.repoEndpoint + this.serviceEndpoint + 'getAll').pipe(
      map(result => {
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting user list', error)
        return [];
      }),
    )
  }

  public createUser(user: PAUser): Observable<PAUser> {
    
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint + 'create', user).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new user')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not create new user: ', error)
        return null;
      }),
    )
  }

  public updateUser(user: PAUser): Observable<PAUser> {
    
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + 'update', user).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated user')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update user: ', error)
        return null;
      }),
    )
  }

  public deleteUser(user: PAUser): Observable<PAUser> {
    
    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + 'delete/' + user.id).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted user')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not delete user: ', error)
        return null;
      }),
    )
  }
}

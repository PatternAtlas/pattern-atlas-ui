import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from 'src/app/authentication/config.service';
import { PAUser } from '../_models/user.model';

@Injectable()
export class UserService {

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
    this.serviceEndpoint = '/users';
  }

  /**
  * GET
  */
  public getAllUsers(): Observable<PAUser[]> {
    return this.http.get<PAUser>(this.repoEndpoint + this.serviceEndpoint).pipe(
      map(result => {
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting user list', error)
        return [];
      }),
    )
  }

  public getUserWithToken(): Observable<any> {
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

   /**
  * CREATE
  */
  public createUser(user: PAUser): Observable<PAUser> {
    
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint, user).pipe(
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
    
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${user.id}`, user).pipe(
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
    
    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + `/${user.id}`).pipe(
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

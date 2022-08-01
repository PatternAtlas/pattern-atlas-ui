import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { PAUser } from '../_models/user.model';
import { environment } from 'src/environments/environment';
import { RoleModel } from '../_models/role.model';
import { PrivilegeModel } from '../_models/privilege.model';
import { RoleModelRequest } from '../_models/role.model.request';
import { ListResponse } from '../../util/list-response';
import { UserInfoModel } from '../_models/user-info.model';

@Injectable()
export class UserService {

  private userInfoEndpoint: string;
  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private toasterService: ToasterService
  ) {
    this.repoEndpoint = environment.API_URL;
    this.userInfoEndpoint = environment.userInfoUrl;
    this.serviceEndpoint = '/users';
  }

  /**
   * GET
   */
  public getAllUsers(): Observable<PAUser[]> {
    return this.http.get<ListResponse<PAUser>>(this.repoEndpoint + this.serviceEndpoint).pipe(
      map(result => {
        return result._embedded.userModels.map(userRet => Object.assign(new PAUser(), userRet))
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting user list', error)
        return [];
      }),
    )
  }

  public getUser(userId: string): Observable<PAUser> {
    return this.http.get<PAUser>(this.repoEndpoint + this.serviceEndpoint + `/${userId}`).pipe(
      map(result => {
        return Object.assign(new PAUser(), result)
      }),
      catchError(error => {
        console.error(error);
        this.toasterService.pop('error', 'Getting user info did not work: ', error)
        return [];
      }),
    )
  }

  public getUserWithToken(): Observable<UserInfoModel> {
    return this.http.get<UserInfoModel>(this.userInfoEndpoint).pipe(
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

  public getAllRoles(): Observable<RoleModel[]> {
    return this.http.get<ListResponse<RoleModel>>(this.repoEndpoint + this.serviceEndpoint + '/roles').pipe(
      map(result => {
        return result._embedded.roleModels
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting roles list', error)
        return [];
      }),
    )
  }

  public getAllPlatformRoles(): Observable<RoleModel[]> {
    return this.http.get<ListResponse<RoleModel>>(this.repoEndpoint + this.serviceEndpoint + '/roles/platform').pipe(
      map(result => {
        return result._embedded.roleModels
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting platform roles list', error)
        return [];
      }),
    )
  }

  public getAllAuthorRoles(): Observable<RoleModel[]> {
    return this.http.get<ListResponse<RoleModel>>(this.repoEndpoint + this.serviceEndpoint + '/roles/authors').pipe(
      map(result => {
        return result._embedded.roleModels
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting author roles list', error)
        return [];
      }),
    )
  }

  public getAllRolesFromEntity(entityId: string): Observable<RoleModel[]> {
    return this.http.get<ListResponse<RoleModel>>(this.repoEndpoint + this.serviceEndpoint + '/roles/' + entityId).pipe(
      map(result => {
        return result._embedded.roleModels
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting roles list from entity ' + entityId, error)
        return [];
      }),
    )
  }

  public getAllPrivileges(): Observable<PrivilegeModel[]> {
    return this.http.get<ListResponse<PrivilegeModel>>(this.repoEndpoint + this.serviceEndpoint + '/roles/privileges').pipe(
      map(result => {
        return result._embedded.privilegeModels
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting privilege list', error)
        return [];
      }),
    )
  }

  public getAllPlatformPrivileges(): Observable<PrivilegeModel[]> {
    return this.http.get<ListResponse<PrivilegeModel>>(this.repoEndpoint + this.serviceEndpoint + '/roles/privileges').pipe(
      map(result => {
        return result._embedded.privilegeModels
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting platform privilege list', error)
        return [];
      }),
    )
  }

  public getAllDefaultAuthorPrivileges(): Observable<PrivilegeModel[]> {
    return this.http.get<ListResponse<PrivilegeModel>>(this.repoEndpoint + this.serviceEndpoint + '/roles/default_author_privileges').pipe(
      map(result => {
        return result._embedded.privilegeModels
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting default privilege list', error)
        return [];
      }),
    )
  }

  public getAllPrivilegesFromEntity(entityId: string): Observable<PrivilegeModel[]> {
    return this.http.get<ListResponse<PrivilegeModel>>(this.repoEndpoint + this.serviceEndpoint + '/roles/privileges/' + entityId).pipe(
      map(result => {
        return result._embedded.privilegeModels
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting privilege list from entity ' + entityId, error)
        return [];
      }),
    )
  }

  /**
   * CREATE
   */
  public createUser(user: PAUser): Observable<PAUser> {

    return this.http.post<PAUser>(this.repoEndpoint + this.serviceEndpoint, user).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new user')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not create new user: ', error)
        return of(null);
      }),
    )
  }

  /**
  * UDPATE
  */
  public updateUser(user: PAUser): Observable<PAUser> {

    const req1 : Observable<PAUser> = this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${user.id}`, user)
    const req2 : Observable<PAUser> = this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${user.id}/role`, user)

    return req1
      .pipe(
        concatMap(resUser => req2
          .pipe(
            map(result => {
              this.toasterService.pop('success', 'Updated user')
              return result;
            })
          )),
        catchError(e => {
          this.toasterService.pop('error', 'Could not update user: ', e.error.message);
          return of(null);
        }));
  }

  public updateUserRole(role: RoleModel, privilege: PrivilegeModel, roleModelRequest: RoleModelRequest): Observable<RoleModel> {

    return this.http.put<RoleModel>(
      this.repoEndpoint + this.serviceEndpoint + `/roles/${role.id}/privileges/${privilege.id}`, roleModelRequest);
  }

  public updateAllResourceSpecificUserRoles(role: RoleModel, privilege: PrivilegeModel, roleModelRequest: RoleModelRequest): Observable<unknown> {
    return this.http.put<unknown>(
      this.repoEndpoint + this.serviceEndpoint + `/roles/${role.id}/privileges/${privilege.id}/all_resource_specific`, roleModelRequest);
  }

  /**
  * DELETE
  */
  public deleteUser(user: PAUser): Observable<PAUser> {

    return this.http.delete<PAUser>(this.repoEndpoint + this.serviceEndpoint + `/${user.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted user')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not delete user: ', error)
        return of(null);
      }),
    )
  }
}

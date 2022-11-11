import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { environment } from 'src/environments/environment';
import { Issue } from '../../issue-management';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Candidate } from '../../candidate-management';
import { AuthorModelRequest } from '../_models/author.model.request';
import { AuthorModel } from '../_models/author.model';
import { ListResponse } from '../../util/list-response';

@Injectable()
export class AuthorManagementService {

  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
  ) {
    this.repoEndpoint = environment.API_URL;
    this.serviceEndpoint = '/authors';
  }

  public getAllAuthors(): Observable<AuthorModel[]> {
    return this.http.get<ListResponse<AuthorModel>>(this.repoEndpoint + this.serviceEndpoint).pipe(
      map(result => {
        return result._embedded ? result._embedded.authorModels : []
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting author list', error)
        return [];
      }),
    )
  }

  public getAllAuthorRoles(): Observable<string[]> {
    return this.http.get<ListResponse<string>>(this.repoEndpoint + this.serviceEndpoint + '/roles').pipe(
      map(result => {
        return result ? result : []
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting author list', error)
        return [];
      }),
    )
  }

  /**
   * CREATE
   */
  public createAuthorsIssue(authorModel: AuthorModel, issue: Issue, authorModelRequest: AuthorModelRequest): Observable<AuthorModel> {
    return this.http.post<AuthorModel>(this.repoEndpoint + this.serviceEndpoint + `/${authorModel.userId}/issues/${issue.id}`, authorModelRequest).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created issue author')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not create issue author: ', error)
        return of(null);
      }),
    )
  }

  public createAuthorsCandidate(authorModel: AuthorModel, candidate: Candidate, authorModelRequest: AuthorModelRequest): Observable<AuthorModel> {
    return this.http.post<AuthorModel>(this.repoEndpoint + this.serviceEndpoint + `/${authorModel.userId}/candidates/${candidate.id}`, authorModelRequest).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created candidate author')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not candidate issue author: ', error)
        return of(null);
      }),
    )
  }

  /**
   * UPDATE
   */
  public updateAuthorsIssue(authorModel: AuthorModel, string, issue: Issue, authorModelRequest: AuthorModelRequest): Observable<AuthorModel> {
    return this.http.put<AuthorModel>(this.repoEndpoint + this.serviceEndpoint + `/${authorModel.userId}/issues/${issue.id}`, authorModelRequest).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue author')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue author: ', error)
        return of(null);
      }),
    )
  }

  public updateAuthorsCandidate(authorModel: AuthorModel, candidate: Candidate, authorModelRequest: AuthorModelRequest): Observable<AuthorModel> {
    return this.http.put<AuthorModel>(this.repoEndpoint + this.serviceEndpoint + `/${authorModel.userId}/candidates/${candidate.id}`, authorModelRequest).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate author')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not candidate issue author: ', error)
        return of(null);
      }),
    )
  }

  /**
   * DELETE
   */
  public deleteAuthorIssue(authorModel: AuthorModel, issue: Issue): Observable<AuthorModel> {

    return this.http.delete<AuthorModel>(this.repoEndpoint + this.serviceEndpoint + `/${authorModel.userId}/issues/${issue.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted issue author')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not delete issue author: ', error)
        return of(null);
      }),
    )
  }

  public deleteAuthorCandidate(authorModel: AuthorModel, candidate: Candidate): Observable<AuthorModel> {

    return this.http.delete<AuthorModel>(this.repoEndpoint + this.serviceEndpoint + `/${authorModel.userId}/candidates/${candidate.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted candidate author')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not delete candidate author: ', error)
        return of(null);
      }),
    )
  }
}

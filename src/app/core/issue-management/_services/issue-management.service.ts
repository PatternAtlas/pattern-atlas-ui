import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { Issue } from '../_models/issue.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PAComment } from '../../shared/_models/comment.model';

@Injectable()
export class IssueManagementService {

  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
  ) {
    this.repoEndpoint = environment.repositoryUrl;
    this.serviceEndpoint = '/issues';
  }

  /**
   * GET
   */
  public getAllIssues(): Observable<Issue[]> {
    return this.http.get<any>(this.repoEndpoint + this.serviceEndpoint).pipe(
      map(result => {
        return result._embedded ? result._embedded.issueModels : []
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Getting issue list', e.error.message)
        return [];
      }),
    )
  }

  /**
   * CREATE
   */
  public createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint, issue).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new issue')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not create new issue: ', e.error.message )
        return null;
      }),
    )
  }

  public createComment(issue: Issue, comment: PAComment): Observable<PAComment> {
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint + `/${issue.id}/comments`, comment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new comment')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not create new comment: ', e.error.message)
        return null;
      }),
    )
  }

  /**
   * UPDATE
   */
  public updateIssue(issue: Issue): Observable<Issue> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${issue.id}`, issue).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not update issue: ', e.error.message)
        return null;
      }),
    )
  }

  public updateComment(issue: Issue, comment: PAComment): Observable<PAComment> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${issue.id}/comments/${comment.id}`, comment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue comment')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not update issue comment: ', e.error.message)
        return of(null);
      }),
    )
  }

  /**
   * DELETE
   */
  public deleteIssue(issue: Issue): Observable<Issue> {
    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + `/${issue.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted issue')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not delete issue: ', e.error.message)
        return null;
      }),
    )
  }

  public deleteComment(issue: Issue, comment: PAComment): Observable<PAComment> {
    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + `/${issue.id}/comments/${comment.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted issue comment')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not delete issue comment: ', e.error.message)
        return of(null);
      }),
    )
  }
}

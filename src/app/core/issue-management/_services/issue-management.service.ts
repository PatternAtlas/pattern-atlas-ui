import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { Issue } from '../_models/issue.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IssueComment } from '../_models/issue-comment.model';
import { Rating } from '../../model/rating.enum';
import { environment } from 'src/environments/environment';

@Injectable()
export class IssueManagementService {

  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
    private auth: AuthenticationService,
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
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting issue list', error)
        return [];
      }),
    )
  }

  /**
   * CREATE
   */
  public createIssue(issue: Issue): Observable<Issue> {
    issue.rating = 0;
    issue.uri = issue.name;
    issue.version = '1.0'
    
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint, issue).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new issue')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not create new issue: ', error)
        return null;
      }),
    )
  }

  public createComment(issue: Issue, issueComment: IssueComment): Observable<Issue> {
    const userId = this.auth.userSubject.value.id;

    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint + `/${issue.id}/comments/${userId}`, issueComment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new issue')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not create new issue: ', error)
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
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue: ', error)
        return null;
      }),
    )
  }

  public updateRating(issue: Issue, rating: Rating): Observable<Issue> {
    const userId = this.auth.userSubject.value.id;

    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${issue.id}/users/${userId}/rating/${rating}`, issue).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue: ', error)
        return null;
      }),
    )
  }

  public updateCommentRating(issueComment: IssueComment, rating: Rating): Observable<Issue> {
    const userId = this.auth.userSubject.value.id;

    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/comments/${issueComment.id}/users/${userId}/rating/${rating}`, issueComment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue comment')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue comment: ', error)
        return null;
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
      catchError(error => {
        this.toasterService.pop('error', 'Could not delete issue: ', error)
        return null;
      }),
    )
  }
}

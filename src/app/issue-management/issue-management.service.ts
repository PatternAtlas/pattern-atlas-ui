import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../authentication/config.service';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/_services/authentication.service';
import { PAComment } from '../core/model/comment';
import { Candidate } from '../candidate-management/candidate-management.service';

export interface Issue {
  id: string,
  uri: string,
  name: string
  description: string,
  rating: number,
  version: string,
  comments: IssueComment[],
}

export interface IssueComment extends PAComment {
  // id: string,
  // text: string,
  // rating: number;
  // user: any,
}

export enum Rating {
  UP = 'up',
  DOWN = 'down',
}

@Injectable()
export class IssueManagementService {

  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private toasterService: ToasterService,
    private auth: AuthenticationService,
  ) {
    this.repoEndpoint = this.config.repositoryUrl;
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
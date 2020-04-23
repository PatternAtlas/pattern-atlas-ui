import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../authentication/config.service';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

export interface Issue {
  id: string,
  uri: string,
  name: string
  description: string,
  rating: number,
  version: string,
  comments: IssueComment[],
}

export interface IssueComment {
  id: string,
  text: string,
  user: any,
}

export enum Rating {
  UP = 'up',
  DOWN = 'down',
}

@Injectable({
  providedIn: 'root'
})
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
    this.serviceEndpoint = '/issue/';
  }

  public getAllIssues(): Observable<Issue[]> {
    return this.http.get<any>(this.repoEndpoint + this.serviceEndpoint + 'getAll').pipe(
      map(result => {
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting issue list', error)
        return [];
      }),
    )
  }

  public createIssue(issue: Issue): Observable<Issue> {
    issue.rating = 0;
    issue.uri = issue.name;
    issue.version = '1.0'
    
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint + 'create', issue).pipe(
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
    const userId = this.auth.userSubject.value;

    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint + 'createComment/' + `${issue.id}&${userId}`, issueComment).pipe(
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

  public updateIssue(issue: Issue): Observable<Issue> {

    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + 'update/' + issue.id, issue).pipe(
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
    const userId = this.auth.userSubject.value;

    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + 'updateRating/' + `${issue.id}&${userId}&${rating}`, null).pipe(
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

  public deleteIssue(issue: Issue): Observable<Issue> {

    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + 'delete/' + issue.id).pipe(
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
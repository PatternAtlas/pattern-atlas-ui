import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../authentication/config.service';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Issue {
  id: string,
  uri: string,
  name: string
  description: string,
  rating: number,
  version: string,
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
    private toasterService: ToasterService
  ) {
    this.repoEndpoint = this.config.repositoryUrl;
    this.serviceEndpoint = '/patternEvolution/';
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
    
    return this.http.post<any>(this.repoEndpoint + '/patternEvolution/create', issue).pipe(
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

  public deleteIssue(issue: Issue): Observable<Issue> {

    return this.http.delete<any>(this.repoEndpoint + '/patternEvolution/delete/' + issue.id).pipe(
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
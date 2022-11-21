import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { Issue } from '../_models/issue.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PAComment } from '../../shared/_models/comment.model';
import { PAEvidence, RatingModelRequest } from '../../shared';
import { AuthorModel } from '../../author-management';
import { ListResponse } from '../../util/list-response';

@Injectable()
export class IssueManagementService {

  private issueEndpoint: string;

  constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
  ) {
    this.issueEndpoint = environment.API_URL + '/issues';
  }

  /**
   * GET
   */
  public getAllIssues(): Observable<Issue[]> {
    return this.http.get<ListResponse<Issue>>(this.issueEndpoint).pipe(
      map(result => {
        return result._embedded ? result._embedded.issueModels : []
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Getting issue list', e.error.message)
        return [];
      })
    )
  }

  public getIssueById(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.issueEndpoint}/${id}`).pipe(
      catchError(e => {
        this.toasterService.pop('error', 'Could not retrieve issue: ', e.error.message )
        throw e
      })
    )
  }

  public getIssueByUri(issueUri: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.issueEndpoint}/findByUri?uri=${issueUri}`).pipe(
      catchError(e => {
        this.toasterService.pop('error', 'Could not retrieve issue: ', e.error.message )
        throw e
      })
    )
  }

  /**
   * CREATE
   */
  public createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.issueEndpoint, issue).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new issue')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not create new issue: ', e.error.message )
        throw e
      }),
    )
  }

  public createComment(issue: Issue, comment: PAComment): Observable<Issue> {
    return this.http.post<Issue>(`${this.issueEndpoint}/${issue.id}/comments`, comment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new comment')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not create new comment: ', e.error.message)
        return of(null);
      }),
    )
  }

  public createEvidence(issue: Issue, evidence: PAEvidence): Observable<Issue> {
    return this.http.post<Issue>(`${this.issueEndpoint}/${issue.id}/evidences`, evidence).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new evidence')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not create new evidence: ', e.error.message)
        return of(null);
      }),
    )
  }

  /**
   * UPDATE
   */
  public updateIssue(issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.issueEndpoint}/${issue.id}`, issue).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not update issue: ', e.error.message)
        return of(null);
      }),
    )
  }

  public updateRatingIssue(issue: Issue, rating: RatingModelRequest): Observable<Issue> {
    return this.http.put<Issue>(`${this.issueEndpoint}/${issue.id}/ratings`, rating).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue rating')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue rating: ', error)
        return of(null);
      }),
    )
  }

  public updateAuthorsIssue(issue: Issue, authorModel: AuthorModel): Observable<Issue> {
    return this.http.put<Issue>(`${this.issueEndpoint}/${issue.id}/authors`, authorModel).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue authors')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue authors: ', error)
        return of(null);
      }),
    )
  }

  public updateComment(issue: Issue, comment: PAComment): Observable<Issue> {
    return this.http.put<Issue>(`${this.issueEndpoint}/${issue.id}/comments/${comment.id}`, comment).pipe(
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

  public updateRatingIssueComment(issue: Issue, comment: PAComment, rating: RatingModelRequest): Observable<Issue> {
    return this.http.put<Issue>(`${this.issueEndpoint}/${issue.id}/comments/${comment.id}/ratings`, rating).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue comment rating')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue comment rating: ', error)
        return of(null);
      }),
    )
  }

  public updateEvidence(issue: Issue, evidence: PAEvidence): Observable<Issue> {
    return this.http.put<Issue>(`${this.issueEndpoint}/${issue.id}/evidences/${evidence.id}`, evidence).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue evidence')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not update issue evidence: ', e.error.message)
        return of(null);
      }),
    )
  }

  public updateRatingIssueEvidence(issue: Issue, evidence: PAEvidence, rating: RatingModelRequest): Observable<Issue> {
    return this.http.put<Issue>(`${this.issueEndpoint}/${issue.id}/evidences/${evidence.id}/ratings`, rating).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue evidence rating')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue evidence rating: ', error)
        return of(null);
      }),
    )
  }


  /**
   * DELETE
   */
  public deleteIssue(issue: Issue): Observable<Issue> {
    return this.http.delete<Issue>(`${this.issueEndpoint}/${issue.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted issue')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not delete issue: ', e.error.message)
        return of(null);
      }),
    )
  }

  public deleteAuthorIssue(authorModel: AuthorModel, issue: Issue): Observable<Issue> {
    return this.http.delete<Issue>(`${this.issueEndpoint}/${issue.id}/authors/${authorModel.userId}`).pipe(
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

  public deleteComment(issue: Issue, comment: PAComment): Observable<Issue> {
    return this.http.delete<Issue>(`${this.issueEndpoint}/${issue.id}/comments/${comment.id}`).pipe(
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

  public deleteEvidence(issue: Issue, evidenceId: string): Observable<Issue> {
    return this.http.delete<Issue>(`${this.issueEndpoint}/${issue.id}/evidences/${evidenceId}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted issue evidence')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not delete issue evidence: ', e.error.message)
        return of(null);
      }),
    )
  }
}

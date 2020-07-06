import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { environment } from 'src/environments/environment';
import { Issue } from '../../issue-management';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Candidate } from '../../candidate-management';
import { RatingModelRequest } from '../_models/rating.model.request';
import { PAComment } from '../../shared';
import { RatingModel } from '../_models/rating.model';

@Injectable()
export class RatingManagementService {

  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
  ) {
    this.repoEndpoint = environment.repositoryUrl;
    this.serviceEndpoint = '/ratings';
  }

  /**
   * UPDATE
   */
  public updateRatingIssue(issue: Issue, rating: RatingModelRequest): Observable<RatingModel> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/issues/${issue.id}`, rating).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue rating')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue rating: ', error)
        return null;
      }),
    )
  }

  public updateRatingIssueComment(issue: Issue, comment: PAComment, rating: RatingModelRequest): Observable<RatingModel> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/issues/${issue.id}/comments/${comment.id}`, rating).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated issue comment rating')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update issue comment rating: ', error)
        return null;
      }),
    )
  }

  public updateRatingCandidate(candidate: Candidate, rating: RatingModelRequest): Observable<RatingModel> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/candidates/${candidate.id}`, rating).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate rating')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update candidate rating: ', error)
        return null;
      }),
    )
  }

  public updateRatingCandidateComment(candidate: Candidate, comment: PAComment, rating: RatingModelRequest): Observable<RatingModel> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/candidates/${candidate.id}/comments/${comment.id}`, rating).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate comment rating')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update candidate comment rating: ', error)
        return null;
      }),
    )
  }
}

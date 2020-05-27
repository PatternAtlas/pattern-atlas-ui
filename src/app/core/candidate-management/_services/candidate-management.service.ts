import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Rating } from '../../model/rating.enum';
import { Candidate } from '../_models/candidate.model';
import { CandidateComment } from '../_models/candidate-comment.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CandidateManagementService {

  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
    private auth: AuthenticationService,
  ) {
    this.repoEndpoint = environment.repositoryUrl;
    this.serviceEndpoint = '/candidates';
  }

  /**
  * GET
  */
  public getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<any>(this.repoEndpoint + this.serviceEndpoint).pipe(
      map(result => {
        return result._embedded ? result._embedded.candidateModels : []
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting candidate list', error)
        return [];
      }),
    )
  }

  /**
  * CREATE
  */
  public createCandidate(candidate: Candidate, patternLanguageId: string): Observable<Candidate> {
    candidate.uri = candidate.name;

    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint, candidate).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new candidate')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not create new candidate: ', error)
        return null;
      }),
    )
  }

  public createComment(candidate: Candidate, candidateComment: CandidateComment): Observable<Candidate> {
    const userId = this.auth.userSubject.value.id;

    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/comments/${userId}`, candidateComment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new candidate')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not create new candidate: ', error)
        return null;
      }),
    )
  }

  /**
   * UPDATE
   */
  public updateCandidate(candidate: Candidate): Observable<Candidate> {

    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}`, candidate).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update candidate: ', error)
        return null;
      }),
    )
  }

  public updateRating(candidate: Candidate, rating: Rating): Observable<Candidate> {
    const userId = this.auth.userSubject.value.id;

    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/users/${userId}/rating/${rating}`, candidate).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update candidate: ', error)
        return null;
      }),
    )
  }

  public updateCommentRating(candidateComment: CandidateComment, rating: Rating): Observable<Candidate> {
    const userId = this.auth.userSubject.value.id;

    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/comments/${candidateComment.id}/users/${userId}/rating/${rating}`, candidateComment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate comment')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update candidate comment: ', error)
        return null;
      }),
    )
  }

  public deleteCandidate(candidate: Candidate): Observable<Candidate> {

    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted candidate')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not delete candidate: ', error)
        return null;
      }),
    )
  }
}

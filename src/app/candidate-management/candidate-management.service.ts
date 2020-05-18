import { Injectable } from '@angular/core';
import { PAComment } from '../core/model/comment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../authentication/config.service';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from '../authentication/_services/authentication.service';
import { map, catchError } from 'rxjs/operators';
import { Rating } from '../issue-management/issue-management.service';
import PatternLanguageModel from '../core/model/hal/pattern-language-model.model';

export class Candidate {
  comments: PAComment[];
  content: string;
  iconUrl: any;
  id: string;
  name: string;
  patternLanguageId: string;
  patternLanguageName: string;
  rating: number = 0;
  uri: string;
  version: string = '0.1.0';

  constructor()
  constructor(_content: string, _name: string, _patternLanguageId: string)
  constructor(_content?: string, _name?: string, _patternLanguageId?: string) {
    this.content = _content;
    this.name = _name;
    this.patternLanguageId = _patternLanguageId;
  }
}

export interface CandidateComment extends PAComment {

}

@Injectable()
export class CandidateManagementService {

  private repoEndpoint: string;
  private serviceEndpoint: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private toasterService: ToasterService,
    private auth: AuthenticationService,
  ) {
    this.repoEndpoint = this.config.repositoryUrl;
    this.serviceEndpoint = '/candidates';
  }

  /**
  * GET
  */
  public getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<any>(this.repoEndpoint + this.serviceEndpoint).pipe(
      map(result => {
        return result._embedded.candidateModels
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

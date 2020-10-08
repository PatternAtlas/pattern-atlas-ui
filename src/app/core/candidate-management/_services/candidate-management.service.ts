import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Candidate } from '../_models/candidate.model';
import { environment } from 'src/environments/environment';
import { PAComment, PAEvidence, RatingModelRequest } from '../../shared';
import { AuthorModel } from '../../author-management';

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

  public getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<any>(this.repoEndpoint + this.serviceEndpoint).pipe(
      map(result => {
        return result._embedded ? result._embedded.candidateModels : [];
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Getting candidate list', e.error.message)
        return [];
      }),
    );
  }

  /**
   * CREATE
   */
  public createCandidate(candidate: Candidate): Observable<Candidate> {
    candidate.uri = candidate.name;    
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint, candidate).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new candidate');
        return result;
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not create new candidate: ', e.error.message)
        return null;
      }),
    );
  }

  public createComment(candidate: Candidate, comment: PAComment): Observable<Candidate> {
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/comments`, comment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new comment')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not create new comment: ', e.error.message)
        return null;
      }),
    );
  }

  public createEvidence(candidate: Candidate, evidence: PAEvidence): Observable<Candidate> {
    return this.http.post<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/evidences`, evidence).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new evidence')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not create new evidence: ', e.error.message)
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
        this.toasterService.pop('success', 'Updated candidate');
        return result;
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not update candidate: ', e.error.message)
        return null;
      }),
    );
  }

  public updateRatingCandidate(candidate: Candidate, rating: RatingModelRequest): Observable<Candidate> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/ratings`, rating).pipe(
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

  public updateAuthorsCandidate(candidate: Candidate, authorModel: AuthorModel): Observable<Candidate> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/authors`, authorModel).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate author')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not candidate issue author: ', error)
        return null;
      }),
    )
  }

  public updateComment(candidate: Candidate, comment: PAComment): Observable<Candidate> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/comments/${comment.id}`, comment).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate comment')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not update candidate comment: ', e.error.message)
        return null;
      }),
    );
  }

  public updateRatingCandidateComment(candidate: Candidate, comment: PAComment, rating: RatingModelRequest): Observable<Candidate> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/comments/${comment.id}/ratings`, rating).pipe(
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

  public updateEvidence(candidate: Candidate, evidence: PAEvidence): Observable<Candidate> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/evidences/${evidence.id}`, evidence).pipe(
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

  public updateRatingCandidateEvidence(candidate: Candidate, evidence: PAEvidence, rating: RatingModelRequest): Observable<Candidate> {
    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/evidences/${evidence.id}/ratings`, rating).pipe(
      map(result => {
        this.toasterService.pop('success', 'Updated candidate evidence rating')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update candidate evidence rating: ', error)
        return null;
      }),
    )
  }

  /**
   * DELETE
   */
  public deleteCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted candidate')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not delete candidate: ', e.error.message)
        return null;
      }),
    );
  }

  public deleteAuthorCandidate(authorModel: AuthorModel, candidate: Candidate): Observable<Candidate> {
    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/authors/${authorModel.userId}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted candidate author')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not delete candidate author: ', error)
        return null;
      }),
    )
  }

  public deleteComment(candidate: Candidate, comment: PAComment): Observable<Candidate> {
    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/comments/${comment.id}`).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted candidate comment')
        return result
      }),
      catchError(e => {
        this.toasterService.pop('error', 'Could not delete candidate comment: ', e.error.message)
        return null;
      }),
    );
  }

  public deleteEvidence(candidate: Candidate, evidenceId: string): Observable<Candidate> {
    return this.http.delete<any>(this.repoEndpoint + this.serviceEndpoint + `/${candidate.id}/evidences/${evidenceId}`).pipe(
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

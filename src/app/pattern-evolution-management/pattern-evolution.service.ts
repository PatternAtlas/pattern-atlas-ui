import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../core/service/config.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { ToasterService } from 'angular2-toaster';

export interface PatternEvolution {
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
export class PatternEvolutionService {

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

  public getAllPatternEvolutions(): Observable<PatternEvolution[]> {
    return this.http.get<any>(this.repoEndpoint + this.serviceEndpoint + 'getAll').pipe(
      map(result => {
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Getting pattern evolution list', error)
        return null;
      }),
    )
  }

  public createPatternEvolution(patternEvolution: PatternEvolution): Observable<PatternEvolution> {
    patternEvolution.rating = 0;
    patternEvolution.uri = patternEvolution.name;
    patternEvolution.version = '1.0'
    
    return this.http.post<any>(this.repoEndpoint + '/patternEvolution/create', patternEvolution).pipe(
      map(result => {
        this.toasterService.pop('success', 'Created new PatternEvolution')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not create new pattern evolution: ', error)
        return null;
      }),
    )
  }

  public updatePatternEvolution(patternEvolution: PatternEvolution): Observable<PatternEvolution> {

    return this.http.put<any>(this.repoEndpoint + this.serviceEndpoint + 'update/' + patternEvolution.id, patternEvolution).pipe(
      map(result => {
        this.toasterService.pop('success', 'Update Pattern Evolution')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not update pattern evolution: ', error)
        return null;
      }),
    )
  }

  public deletePatternEvolution(patternEvolution: PatternEvolution): Observable<PatternEvolution> {

    return this.http.delete<any>(this.repoEndpoint + '/patternEvolution/delete/' + patternEvolution.id).pipe(
      map(result => {
        this.toasterService.pop('success', 'Deleted Pattern Evolution')
        return result
      }),
      catchError(error => {
        this.toasterService.pop('error', 'Could not delete pattern evolution: ', error)
        return null;
      }),
    )
  }
}

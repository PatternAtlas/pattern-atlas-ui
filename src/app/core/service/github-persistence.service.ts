import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import PatternLanguage from '../model/pattern-language.model';
import { switchMap } from 'rxjs/internal/operators';
import { GithubUploadRequestInfo } from './data/GithubUploadRequestInfo.interface';
import { CookieService } from 'ngx-cookie-service';
import { GithubFileResponse } from './data/GithubFileResponse.interface';
import { IriConverter } from '../util/iri-converter';
import { PatternLanguagePatterns } from '../model/pattern-language-patterns.model';
import { PatternLanguageRelations } from '../model/pattern-language-relations.model';
import { globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class GithubPersistenceService {

  githubBaseUrl = globals.urlGithubAPI;
  githubPatternPediaUrl = this.githubBaseUrl + '/patternpedia.ttl';

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }


  uploadPatternLanguage(patternlanguage: PatternLanguage): Observable<any> {
        return this.httpClient.put(this.getGithubPathForPatternLanguage(patternlanguage), {
            message: `upload the new patternlanguage ${patternlanguage.name} that was created with the UI`,
            'content': btoa(patternlanguage.toTurtle())
          }
          , {
            headers: {
              'Content-Type': 'application/x-turtle',
              'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
            }
          });
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-turtle');
    headers.append('Authorization', this.cookieService.get('patternpedia_github_token'));
    return headers;
  }

  getGithubPathForPatternLanguage(patternLanguage: PatternLanguage): string {
    return `${this.githubBaseUrl}/patternlanguages/${patternLanguage.name}/${patternLanguage.name}.ttl`;
  }

  addPatternLanguageToPatternPedia(patternlanguage: PatternLanguage, existingPatternlanguages: PatternLanguage[]): Observable<any> {
    existingPatternlanguages.push(patternlanguage);
    const containsPatternGraphStatements = existingPatternlanguages.map((pl: PatternLanguage) => {
      return pl.getIsLinkedOpenPatternLanguageStatement();
    });

    return this.getRequestInfosToAddToPatternPedia().pipe(
      switchMap((res: GithubUploadRequestInfo) => {
        return this.httpClient.put(this.githubPatternPediaUrl, {
            message: `upload the new patternlanguage ${patternlanguage.name} that was created with the UI to patternpedia`,

            content: btoa(res.content + containsPatternGraphStatements.join('\n')),
            sha: res.fileInfo.sha
          }
          , {
            headers: {
              'Content-Type': 'application/x-turtle',
              'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
            }
          });
      }));
  }

  getRequestInfosToAddToPatternPedia(): Observable<GithubUploadRequestInfo> {
    return forkJoin(this.httpClient.get('assets/patternpedia-without-containsPatternGraph.ttl',
      {responseType: 'text'}), this.getFile(this.githubPatternPediaUrl)).pipe(
      map(res => <GithubUploadRequestInfo> {content: res[0], fileInfo: res[1]}));
  }


  getFile(iri: string): Observable<GithubFileResponse> {
    return this.httpClient.get(iri, {
      headers: {
        'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
      }
    }).pipe(map(res => <GithubFileResponse> res));
  }


  updatePL(patternLanguage: PatternLanguage): Observable<any> {
    const githubUrlPL = this.getGithubPathForPatternLanguage(patternLanguage);
    return this.getFile(githubUrlPL).pipe(
      switchMap((res: GithubFileResponse) => {
        return this.httpClient.put(githubUrlPL, {
            message: 'update patternlanguage ' + patternLanguage.name,
            content: btoa(patternLanguage.toTurtle()),
            sha: res.sha
          }
          , {
            headers: {
              'Content-Type': 'application/x-turtle',
              'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
            }
          });
      }));
  }

  updatePLPatterns(patternLanguagePatterns: PatternLanguagePatterns): Observable<any> {
    const githubUrlPLPatterns = this.getGithubPathForPatternLanguagePatternsOrRelations(patternLanguagePatterns);
    return this.getFile(githubUrlPLPatterns).pipe(
      switchMap((res: GithubFileResponse) => {
          return this.httpClient.put(githubUrlPLPatterns, {
              message: 'update patterns of' + IriConverter.extractIndividualNameFromIri(patternLanguagePatterns.plIri),
              content: btoa(patternLanguagePatterns.toTurtle()),
              sha: res.sha
            }
            , {
              headers: {
                'Content-Type': 'application/x-turtle',
                'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
              }
            });
        }
      ));
  }

  updatePLRelations(patternLanguageRelations: PatternLanguageRelations): Observable<any> {
    const githubUrlPLPatterns = this.getGithubPathForPatternLanguagePatternsOrRelations(patternLanguageRelations);
    return this.getFile(githubUrlPLPatterns).pipe(
      switchMap((res: GithubFileResponse) => {
          return this.httpClient.put(githubUrlPLPatterns, {
              message: 'update patterns of' + IriConverter.extractIndividualNameFromIri(patternLanguageRelations.plIri),
              content: btoa(patternLanguageRelations.toTurtle()),
              sha: res.sha
            }
            , {
              headers: {
                'Content-Type': 'application/x-turtle',
                'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
              }
            });
        }
      ));
  }

  uploadPLPatternsAndRelations(patternLanguagePatterns: PatternLanguagePatterns, patternLanguageRelations: PatternLanguageRelations): Observable<any> {
    const headers = {
      'Content-Type': 'application/x-turtle',
      'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
    };
    return this.httpClient.put(this.getGithubPathForPatternLanguagePatternsOrRelations(patternLanguagePatterns), {
        message: 'initialize patternslist (currently empty)  of ' + IriConverter.extractIndividualNameFromIri(patternLanguagePatterns.plIri),
        content: btoa(patternLanguagePatterns.toTurtle())
      }
      , {
        headers: headers
      }).pipe(
      switchMap(() =>
        this.httpClient.put(this.getGithubPathForPatternLanguagePatternsOrRelations(patternLanguageRelations), {
            message: 'initialize patternrelationslist (currently empty)  of ' + IriConverter.extractIndividualNameFromIri(patternLanguageRelations.plIri),
            content: btoa(patternLanguageRelations.toTurtle())
          }
          , {
            headers: headers
          })));
  }


  private getGithubPathForPatternLanguagePatternsOrRelations(patternLanguagePatternsOrRelations: PatternLanguagePatterns | PatternLanguageRelations): string {
    return `${this.githubBaseUrl}/patternlanguages/${IriConverter.extractIndividualNameFromIri(patternLanguagePatternsOrRelations.plIri)}/${IriConverter.extractIndividualNameFromIri(patternLanguagePatternsOrRelations.iri)}.ttl`;
  }
}

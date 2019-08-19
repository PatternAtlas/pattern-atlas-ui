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

@Injectable({
  providedIn: 'root'
})
export class GithubPersistenceService {

  githubBaseUrl = 'https://api.github.com/repos/PatternPedia/patternpediacontent/contents';
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
    const githubUrlPLPatterns = this.getGithubPathForPatternLanguagePatterns(patternLanguagePatterns);
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

  uploadPLPatterns(patternLanguagePatterns: PatternLanguagePatterns): Observable<any> {
    const githubUrlPLPatterns = this.getGithubPathForPatternLanguagePatterns(patternLanguagePatterns);
    return this.httpClient.put(githubUrlPLPatterns, {
        message: 'initialize patternslist (currently empty)  of' + IriConverter.extractIndividualNameFromIri(patternLanguagePatterns.plIri),
        content: btoa(patternLanguagePatterns.toTurtle())
      }
      , {
        headers: {
          'Content-Type': 'application/x-turtle',
          'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
        }
      });
  }


  private getGithubPathForPatternLanguagePatterns(patternLanguagePatterns: PatternLanguagePatterns): string {
    return `${this.githubBaseUrl}/patternlanguages/${IriConverter.extractIndividualNameFromIri(patternLanguagePatterns.plIri)}/${IriConverter.extractIndividualNameFromIri(patternLanguagePatterns.iri)}.ttl`;
  }
}

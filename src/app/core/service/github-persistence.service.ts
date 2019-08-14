import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import PatternLanguage from '../model/pattern-language.model';
import { switchMap } from 'rxjs/internal/operators';
import { GithubUploadRequestInfo } from './data/GithubUploadRequestInfo.interface';
import { CookieService } from 'ngx-cookie-service';
import { GithubFileResponse } from './data/GithubFileResponse.interface';
import Pattern from '../model/pattern.model';
import { IriConverter } from '../util/iri-converter';

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

  getGithubPathForPatternLanguage(patternLanguage: PatternLanguage): string {
    return patternLanguage.iri.indexOf('patternlanguage') === -1 ?
      `${this.githubBaseUrl}/${patternLanguage.name}/${patternLanguage.name}.ttl` :
      `${this.githubBaseUrl}/patternlanguages/${patternLanguage.name}/${patternLanguage.name}.ttl`;
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
    return forkJoin(this.httpClient.get('assets/patternpedia-without-containsPatternGraph.ttl', {responseType: 'text'}), this.getFile(this.githubPatternPediaUrl)).pipe(
      map(res => <GithubUploadRequestInfo> {content: res[0], fileInfo: res[1]}));
  }


  getFile(fileGitApiUrl: string): Observable<GithubFileResponse> {
    return this.httpClient.get(fileGitApiUrl, {
      headers: {
        'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
      }
    }).pipe(map(res => <GithubFileResponse> res));
  }

  getTTLFile(url: string): Observable<any> {
    return this.httpClient.get(url, {responseType: 'text'});
  }


  updatePL(patternLanguage: PatternLanguage): Observable<any> {
    return this.getFile(this.getGithubPathForPatternLanguage(patternLanguage)).pipe(
      switchMap((res: GithubFileResponse) => {
        return this.httpClient.put(this.getGithubPathForPatternLanguage(patternLanguage), {
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

  uploadPattern(pattern: Pattern, patternLanguage: PatternLanguage): Observable<any> {
    const url =
      `${this.githubBaseUrl}/patternlanguages/${patternLanguage.name}/${IriConverter.removeWhitespace(pattern.name)}.ttl`;
    return this.httpClient.put(url, {
            message: 'update patternlanguage ' + patternLanguage.name,
            content: btoa(pattern.toTurtle()),
          }
          , {
            headers: {
              'Content-Type': 'application/x-turtle',
              'Authorization': `token ${this.cookieService.get('patternpedia_github_token')}`
            }
          });
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GithubConfigFile } from './data/GithubConfigFile.interface';
import PatternLanguage from '../model/pattern-language.model';
import { switchMap, tap } from 'rxjs/internal/operators';
import { GithubUploadRequestInfo } from './data/GithubUploadRequestInfo.interface';
import { GithubAppConfig } from './data/GithubAppConfig.interface';
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
    console.log(this.cookieService.get('patternpedia_github_token'));
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

  getGithubUserConfig(): Observable<GithubConfigFile> {
    return this.httpClient.get('assets/github-user-config.json').pipe(map(res => <GithubConfigFile> res));
  }

  getGithubAppConfig(): Observable<GithubAppConfig> {
    return this.httpClient.get('assets/github-app-config.json').pipe(map(res => <GithubAppConfig> res));
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
    return forkJoin(this.httpClient.get('assets/patternpedia-without-containsPatternGraph.ttl', {responseType: 'text'}),
      this.getGithubAppConfig(), this.getFile(this.githubPatternPediaUrl)).pipe(
      map(res => <GithubUploadRequestInfo> {content: res[0], config: res[1], fileInfo: res[2]}));
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


  getPatternLanguage(patternLanguageName: string): Observable<any> {

    return this.getTTLFile('https://purl.org/patternpedia' + patternLanguageName);

  }

  getUpdateFileInfos(uploadUrl: string): Observable<GithubUploadRequestInfo> {
    return forkJoin(this.getGithubAppConfig(), this.getFile(uploadUrl)).pipe(
      map(res => <GithubUploadRequestInfo> {content: '', config: res[0], fileInfo: res[1]})
    );
  }

  updatePL(patternLanguage: PatternLanguage): Observable<any> {
    return this.getUpdateFileInfos(this.getGithubPathForPatternLanguage(patternLanguage)).pipe(
      tap(() => {
        console.log(patternLanguage.toTurtle());
      }),
      switchMap((res: GithubUploadRequestInfo) => {
        return this.httpClient.put(this.getGithubPathForPatternLanguage(patternLanguage), {
            message: 'update patternlanguage ' + patternLanguage.name,
            content: btoa(patternLanguage.toTurtle()),
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

  uploadPattern(pattern: Pattern, patternLanguage: PatternLanguage): Observable<any> {
    const url =
      `${this.githubBaseUrl}/patternlanguages/${patternLanguage.name}/${IriConverter.removeWhitespace(pattern.name)}.ttl`;
    return this.getGithubAppConfig().pipe(
      switchMap((res: GithubAppConfig) => {
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
      })
    );
  }

  requestOAuthToken(): Observable<any> {
    const params = new HttpParams()
      .set('scope', `repo`);
    return this.getGithubAppConfig().pipe(
      tap((config: GithubAppConfig) => {
        params.set('client_id', config.client_id);
      }),
      switchMap(() => {
        return this.httpClient.get('https://github.com/login/oauth/authorize', {
          params: params,
          responseType: 'text'
        });
      }));
  }
}

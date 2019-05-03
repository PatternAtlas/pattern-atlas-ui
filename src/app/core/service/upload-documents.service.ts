import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { GithubConfigFile } from './data/GithubConfigFile.interface';
import PatternLanguage from '../model/pattern-language.model';
import { GithubFileResponse } from './data/GithubFileResponse.interface';
import { switchMap, tap } from 'rxjs/internal/operators';
import { GithubUploadRequestInfo } from './data/GithubUploadRequestInfo.interface';
import { IriConverter } from '../util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentsService {

  githubBaseUrl = 'https://api.github.com/repos/PatternPedia/patternpediacontent/contents';
  githubPatternPediaUrl = this.githubBaseUrl + '/patternpedia.ttl';

  constructor(private httpClient: HttpClient) {
  }


  uploadPatternLanguage(patternlanguage: PatternLanguage): Observable<any> {
    return this.getGithubUserConfig().pipe(
      flatMap(res =>  {
        return this.httpClient.put(this.getGithubPathForPatternLanguage(patternlanguage), {
            message: `upload the new patternlanguage ${patternlanguage.name} that was created with the UI`,
        committer: {
          name: res.committer.name,
          email: res.committer.email
        },
            'content': btoa(patternlanguage.toTurtle())
          }
        , {headers: res.headers}); }));
  }

  getGithubPathForPatternLanguage(patternLanguage: PatternLanguage): string {
    return patternLanguage.iri.indexOf('patternlanguage') === -1 ?
      `${this.githubBaseUrl}/${patternLanguage.name}/${patternLanguage.name}.ttl` :
      `${this.githubBaseUrl}/patternlanguages/${patternLanguage.name}/${patternLanguage.name}.ttl`;
  }

  getGithubUserConfig(): Observable<GithubConfigFile> {
    return this.httpClient.get('assets/github-user-config.json').pipe(map(res => <GithubConfigFile> res));
  }

  addPatternLanguageToPatternPedia(patternlanguage: PatternLanguage, existingPatternlanguages: PatternLanguage[]): Observable<any> {
    existingPatternlanguages.push(patternlanguage);
    console.log(existingPatternlanguages);
    const containsPatternGraphStatements = existingPatternlanguages.map((pl: PatternLanguage) => {
      return pl.getIsLinkedOpenPatternLanguageStatement();
    });

    return this.getRequestInfosToAddToPatternPedia().pipe(
      switchMap((res: GithubUploadRequestInfo) => {
        return this.httpClient.put(this.githubPatternPediaUrl, {
            message: `upload the new patternlanguage ${patternlanguage.name} that was created with the UI to patternpedia`,
            committer: {
              name: res.config.committer.name,
              email: res.config.committer.email
            },
            content: btoa(res.content + containsPatternGraphStatements.join('\n')),
            sha: res.fileInfo.sha
          }
          , {headers: res.config.headers});
      }));
  }

  getRequestInfosToAddToPatternPedia(): Observable<GithubUploadRequestInfo> {
    return forkJoin(this.httpClient.get('assets/patternpedia-without-containsPatternGraph.ttl', {responseType: 'text'}),
      this.getGithubUserConfig(), this.getFile(this.githubPatternPediaUrl)).pipe(
      map(res => <GithubUploadRequestInfo> {content: res[0], config: res[1], fileInfo: res[2]}));
  }


  getFile(fileGitApiUrl: string): Observable<GithubFileResponse> {
    return this.httpClient.get(fileGitApiUrl).pipe(map(res => <GithubFileResponse> res));
  };

  getTTLFile(url: string): Observable<any> {
    return this.httpClient.get(url, {responseType: 'text'});
  };


  getPatternLanguage(patternLanguageName: string): Observable<any> {

    return this.getTTLFile('https://purl.org/patternpedia' + patternLanguageName);

  }

  getUpdateFileInfos(uploadUrl: string): Observable<GithubUploadRequestInfo> {
    return forkJoin(this.getGithubUserConfig(), this.getFile(uploadUrl)).pipe(
      map(res => <GithubUploadRequestInfo> {content: '', config: res[0], fileInfo: res[1]})
    );
  }

  updatePL(patternLanguage: PatternLanguage): Observable<any> {
    const fileUrl = IriConverter.getURL(patternLanguage.iri);
    return this.getUpdateFileInfos(this.getGithubPathForPatternLanguage(patternLanguage)).pipe(
      tap(() => {
        console.log(patternLanguage.toTurtle());
      }),
      switchMap((res: GithubUploadRequestInfo) => {
        return this.httpClient.put(this.getGithubPathForPatternLanguage(patternLanguage), {
            message: 'update patternlanguage ' + patternLanguage.name,
            committer: {
              name: res.config.committer.name,
              email: res.config.committer.email
            },
            content: btoa(patternLanguage.toTurtle()),
            sha: res.fileInfo.sha
          }
          , {headers: res.config.headers});
      }));
  }
}

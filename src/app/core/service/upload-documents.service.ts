import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { GithubConfigFile } from './data/GithubConfigFile.interface';
import PatternLanguage from '../model/pattern-language.model';
import { GithubFileResponse } from './data/GithubFileResponse.interface';
import { switchMap, tap } from 'rxjs/internal/operators';
import { GithubUploadRequestInfo } from './data/GithubUploadRequestInfo.interface';
import { PatternOntologyService } from './pattern-ontology.service';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentsService {

  constructor(private httpClient: HttpClient, private pos: PatternOntologyService) {
  }


  uploadPatternLanguage(patternlanguageName: string, patternlanguageTtlContent: string): Observable<any> {
    return this.getGithubUserConfig().pipe(
      flatMap(res =>  {
        return this.httpClient.put(`https://api.github.com/repos/PatternPedia/patternpediacontent/contents/patternlanguages/${patternlanguageName}/${patternlanguageName}.ttl`, {
            message: `upload the new patternlanguage ${patternlanguageName} that was created with the UI`,
        committer: {
          name: res.committer.name,
          email: res.committer.email
        },
            'content': btoa(patternlanguageTtlContent)
          }
        , {headers: res.headers}); }));
  }

  getGithubUserConfig(): Observable<GithubConfigFile> {
    return this.httpClient.get('assets/github-user-config.json').pipe(map(res => <GithubConfigFile> res));
  }

  addPatternLanguageToPatternPedia(patternlanguage: PatternLanguage, existingPatternlanguages: PatternLanguage[]): void {
    const patternpediaUrl = 'https://api.github.com/repos/PatternPedia/patternpediacontent/contents/patternpedia.ttl';
    existingPatternlanguages.push(patternlanguage);
    const containsPatternGraphStatements = existingPatternlanguages.map((pl: PatternLanguage) => {
      return pl.getIsLinkedOpenPatternLanguageStatement();
    });

    this.getRequestInfosToAddToPatternPedia().pipe(
      switchMap((res: GithubUploadRequestInfo) => {
        return this.httpClient.put(patternpediaUrl, {
            message: `upload the new patternlanguage ${patternlanguage.name} that was created with the UI to patternpedia`,
            committer: {
              name: res.config.committer.name,
              email: res.config.committer.email
            },
            content: btoa(res.content + containsPatternGraphStatements.join('\n')),
            sha: res.fileInfo.sha
          }
          , {headers: res.config.headers});
      })).subscribe((res) => console.log(res));
    // TODO
    console.log('add to pattern pedia triggered');
  }

  getRequestInfosToAddToPatternPedia(): Observable<GithubUploadRequestInfo> {
    const patternpediaUrl = 'https://api.github.com/repos/PatternPedia/patternpediacontent/contents/patternpedia.ttl';
    return forkJoin(this.httpClient.get('assets/patternpedia-without-containsPatternGraph.ttl', {responseType: 'text'}),
      this.getGithubUserConfig(), this.getFile(patternpediaUrl)).pipe(
      tap(res => console.log(res)),
      map(res => <GithubUploadRequestInfo> {content: res[0], config: res[1], fileInfo: res[2]}));
  }


  getFile(fileGitApiUrl: string): Observable<GithubFileResponse> {
    return this.httpClient.get(fileGitApiUrl).pipe(map(res => <GithubFileResponse> res));
  };


  getPatternLanguage(patternLanguageName: string): Observable<any> {

    const url = 'https://purl.org/patternpedia' + patternLanguageName;
    return this.httpClient.get(url);

  }

}

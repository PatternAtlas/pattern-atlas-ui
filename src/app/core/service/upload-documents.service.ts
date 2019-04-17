import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { GithubConfigFile } from './data/GithubConfigFile.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentsService {

  constructor(private httpClient: HttpClient) { }


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

  public getGithubUserConfig(): Observable<GithubConfigFile> {
    return this.httpClient.get('assets/github-user-config.json').pipe(map(res => <GithubConfigFile> res));
  }


  getPatternLanguage(patternLanguageName: string): Observable<any> {

    const url = 'https://purl.org/patternpedia' + patternLanguageName;
    return this.httpClient.get(url);

  }

}

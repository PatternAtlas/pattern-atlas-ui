import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import PatternLanguage from '../model/pattern-language.model';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { GithubConfigFile } from './data/GithubConfigFile.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentsService {

  constructor(private httpClient: HttpClient) { }


  uploadPatternLanguage(patternlanguage: PatternLanguage): Observable<any>{
    return this.getGithubUserConfig().pipe(
      flatMap(res =>  {
        return this.httpClient.put('https://api.github.com/repos/PatternPedia/patternpediacontent/contents/test2' + '/test123456.json', {
        message: 'test github api',
        committer: {
          name: res.committer.name,
          email: res.committer.email
        },
        'content': btoa('{"testcontent":' + 'Hello world' + '}')}
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

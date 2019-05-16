import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { switchMap, tap } from 'rxjs/internal/operators';
import { GithubPersistenceService } from '../../service/github-persistence.service';
import { GithubAppConfig } from '../../service/data/GithubAppConfig.interface';

@Component({
  selector: 'pp-process-oauth-callback',
  templateUrl: './process-oauth-callback.component.html',
  styleUrls: ['./process-oauth-callback.component.scss']
})
export class ProcessOauthCallbackComponent implements OnInit {

  constructor(private _httpClient: HttpClient, private _route: ActivatedRoute, private _cookieService: CookieService, private _router: Router,
              private _githubPersistenceService: GithubPersistenceService) {
    this._route.params.subscribe( params => console.log(params) );

  }

  ngOnInit() {
    const data = new FormData();

    data.append('accept', 'json');

    this._githubPersistenceService.getGithubAppConfig().pipe(
      tap((githubAppConfig: GithubAppConfig) => { data.append('client_id', githubAppConfig.client_id);
        data.append('client_secret', githubAppConfig.client_secret); }),
    switchMap(() =>  this._route.queryParams),
      tap(params => console.log(params['code'])),
      switchMap((params)  => {
        data.append('code', params['code']);
        return this._httpClient.post('https://github.com/login/oauth/access_token', data, {responseType: 'text'});
      })).subscribe( (res) => {
        // github sends the access_token in url param style (access_token=...&...), so let's use this info to decode the token:
      const urlResponse = new URLSearchParams(res);
      this._cookieService.set('patternpedia_github_token', urlResponse.get('access_token'));
      this._router.navigate(['..'], {relativeTo: this._route});
      });
  }

}

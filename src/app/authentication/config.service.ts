import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

interface Config {

}

export function configServiceInitializerFactory(config: ConfigService): Function {
  return () => config.load();
}

@Injectable()
export class ConfigService {

  repositoryUrl: string;
  authorizeUrl: string;
  tokenUrl: string;
  tokenRevokeUrl: string;
  signinUrl: string;
  userInfoUrl: string;
  clientIdPrivate: string;
  clientSecret: string;
  clientIdPublic: string;
  clientIdPKCE: string;
  

  constructor() { }

  load(): Promise<any> {
    console.log('Load Config');
    this.repositoryUrl = environment.repositoryUrl;
    this.authorizeUrl = environment.authorizeUrl;
    this.tokenUrl = environment.tokenUrl;
    this.tokenRevokeUrl = environment.tokenRevokeUrl;
    this.signinUrl = environment.signinUrl;
    this.userInfoUrl = environment.userInfoUrl;
    this.clientIdPrivate = environment.clientIdPrivate;
    this.clientSecret = environment.clientSecret;
    this.clientIdPublic = environment.clientIdPublic;
    this.clientIdPKCE = environment.clientIdPKCE;

    return of().toPromise();
  }

}

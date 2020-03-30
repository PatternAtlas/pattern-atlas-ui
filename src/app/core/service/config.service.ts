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
  clientIdPrivate: string;
  clientIdPublic: string;
  clientSecret: string;

  constructor() { }

  load(): Promise<any> {
    console.log('Load Config');
    this.repositoryUrl = environment.repositoryUrl;
    this.authorizeUrl = environment.authorizeUrl;
    this.tokenUrl = environment.tokenUrl;
    this.tokenRevokeUrl = environment.tokenRevokeUrl;
    this.signinUrl = environment.signinUrl;
    this.clientIdPrivate = environment.clientIdPrivate;
    this.clientIdPublic = environment.clientIdPublic;
    this.clientSecret = environment.clientSecret;

    return of().toPromise();
  }

}

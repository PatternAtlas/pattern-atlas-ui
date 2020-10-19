import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, EMPTY, observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, skipWhile, tap, map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptor } from '../_interceptor/token.interceptor';
import { PAUser, UserRole, UserInfoModel } from 'src/app/core/user-management';
import { environment } from 'src/environments/environment';


const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';

const stateKey = 'state';
const verifierKey = 'code_verifier';

@Injectable()
export class AuthenticationService {

  private regexCode: RegExp;
  private regexState: RegExp;

  private accessTokenSubject: BehaviorSubject<string>;
  private userSubject: BehaviorSubject<UserInfoModel>;
  private rolePASubject: BehaviorSubject<UserRole[]>;

  private jwtHelper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    console.log('Init Authentication Service');
    this.jwtHelper = new JwtHelperService();
    TokenInterceptor.init(this);

    this.regexCode = /code=(\w*)/;
    this.regexState = /state=(\w*)/;

    this.initSubjectsPipe();
  }

  private initSubjectsPipe() {
    this.userSubject = new BehaviorSubject<UserInfoModel>(null);
    this.rolePASubject = new BehaviorSubject<UserRole[]>(null);
    this.accessTokenSubject = new BehaviorSubject<string>(this.getAccesToken());

    this.accessTokenSubject.subscribe(token => {
      if (token === 'logout') {
        console.log('User logout');
        this.userSubject.next(null);
        // this.roleSubject.next(null);
        this.router.navigate(['/']);

      } else if (token && !this.jwtHelper.isTokenExpired(token)) {
        console.log('Token exists && token not expired')
        this.getUserInfo();
        this.getRoles();
        this.router.navigate(['/']);

      } else if (token && this.getRefreshToken() && this.jwtHelper.isTokenExpired(this.getAccesToken())) {
        console.log('Token exists && token expired');
        this.refreshToken();

      } else {
        console.log('Token does not exist');
        this.getToken();
      }
    })
  }

  base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

  public async login() {
    localStorage.clear();
    // GENERATE STATE
    const state = this.generateRandomString(32);
    localStorage.setItem(stateKey, state);
    // GENERATE CODE VERIFIER
    const code_verifier = this.generateRandomString(128)
    const code_challenge = await this.pkceChallengeFromVerifier(code_verifier);
    localStorage.setItem(verifierKey, code_verifier);
    
    this.getAccesCode(state, code_challenge);
  }

  private getAccesCode(state: string, code_challenge: string) {
    const params = new HttpParams()
      .set('response_type', 'code')
      // .set('client_id', environment.clientIdPublic)
      .set('redirect_uri', `${window.location.origin}`)
      .set('scope', 'read+write+delete')
      .set('state', state)
      // outcomment IF PKCE Authentaction flow is used
      .set('client_id', environment.clientIdPKCE)
      .set('code_challenge', code_challenge)
      .set('code_challenge_method', 'S256')
    window.open(environment.authorizeUrl + params, '_self');
  }

  private checkState(state: string) {
    const stateLocal = localStorage.getItem(stateKey);
    return state !== stateLocal
  }

  private getToken() {
    const url = window.location.search;

    if (url.includes('code=') && url.includes('state=')) {
      // Checks if sended state is equal to received state, CSRF attacks
      if (this.checkState(this.regexState.exec(url)[1])) {
        console.error('Wrong State')
        localStorage.clear();
      } else {
        const code = this.regexCode.exec(url)[1];
        const code_verifier = localStorage.getItem(verifierKey);
        const params = new HttpParams()
          // .set('client_id', `${environment.clientIdPublic}`)

          .set('code', code)
          .set('redirect_uri', `${window.location.origin}`)
          .set('grant_type', 'authorization_code')
          // outcomment IF PKCE Authentaction flow is used
          .set('client_id', `${environment.clientIdPKCE}`)
          .set('code_verifier', code_verifier)

        this.http.post<any>(environment.tokenUrl, params).subscribe(token => {

          const accessToken = token[accessTokenKey];
          const refreshToken = token[refreshTokenKey];

          localStorage.setItem(accessTokenKey, accessToken);
          localStorage.setItem(refreshTokenKey, refreshToken);

          this.accessTokenSubject.next(accessToken);
        },
          error => console.error('Error getToken(): ', error)
        );
      }
    }
  }

  refreshToken() {
    console.log('Refresh Token');
    const params = new HttpParams()
      .set('client_id', `${environment.clientIdPublic}`)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', `${this.getRefreshToken()}`)
    this.http.post<any>('http://localhost:8081/oauth/token', params).subscribe(token => {

      const accessToken = token[accessTokenKey];
      const refreshToken = token[refreshTokenKey];

      localStorage.setItem(accessTokenKey, accessToken);
      localStorage.setItem(refreshTokenKey, refreshToken);

      this.accessTokenSubject.next(accessToken);
    },
      error => {
        console.error('Error getToken via refreshToken: ', error)

      }
    );
  }

  private getUserInfo() {
    this.http.get<UserInfoModel>('http://localhost:8081/user_info').subscribe(user => {
      console.log(user);
      this.userSubject.next(user);
    }, error => {
      console.error('Error getToken via refreshToken: ', error)
    });
  }

  private getRoles() {
    this.http.get<any>(`${environment.repositoryUrl}/users/roles`).subscribe(roles => {
      this.rolePASubject.next(roles._embedded.roleModels);
    }, error => {
      console.error('Error getToken via refreshToken: ', error)
    });
  }

  logout() {
    console.log('Logout');
    localStorage.clear();
    this.accessTokenSubject.next('logout');
  }

  public getAccesToken(): string {
    return localStorage.getItem(accessTokenKey);
  }

  private getRefreshToken(): string {
    return localStorage.getItem(refreshTokenKey);
  }

  public isAuthenticated(): boolean {
    if (!this.jwtHelper.isTokenExpired(this.getAccesToken())) {
      return true;
    } else if (!this.jwtHelper.isTokenExpired(this.getRefreshToken())) {
      this.refreshToken();
      return true
    } else {
      this.logout();
      return false;
    }
  }

  get user(): Observable<UserInfoModel> {
    return this.userSubject.asObservable();
  }

  get roles(): Observable<UserRole[]> {
    return this.rolePASubject.asObservable();
  }

  /** Authentication Flow Helper */
  // Generate a secure random string using the browser crypto functions
  generateRandomString(length: number) {
    var array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  }

  // Calculate the SHA256 hash of the input text. 
  // Returns a promise that resolves to an ArrayBuffer
  sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  // Base64-urlencodes the input string
  base64urlencode(str) {
    // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
    // btoa accepts chars only within ascii 0-255 and base64 encodes them.
    // Then convert the base64 encoded to base64url encoded
    //   (replace + with -, replace / with _, trim trailing =)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // Return the base64-urlencoded sha256 hash for the PKCE challenge
  async pkceChallengeFromVerifier(verifier) {
    const hashed = await this.sha256(verifier);
    return this.base64urlencode(hashed);
  }

}

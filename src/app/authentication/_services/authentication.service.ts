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
const idTokenKey = 'id_token';

// Local storage keys
const localAccessTokenKey = environment.clientIdPublic + '_' + accessTokenKey;
const localRefreshTokenKey = environment.clientIdPublic + '_' + refreshTokenKey;
const localIdTokenKey = environment.clientIdPublic + '_' + idTokenKey;
const localStateKey = environment.clientIdPublic + 'state';
const localVerifierKey = environment.clientIdPublic + 'code_verifier';

@Injectable()
export class AuthenticationService {

  private accessTokenSubject: BehaviorSubject<string>;
  private userSubject: BehaviorSubject<UserInfoModel>;
  private rolePASubject: BehaviorSubject<UserRole[]>;

  private jwtHelper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.jwtHelper = new JwtHelperService();
    TokenInterceptor.init(this);

    this.initSubjectsPipe();
  }

  private initSubjectsPipe() {
    this.userSubject = new BehaviorSubject<UserInfoModel>(null);
    this.rolePASubject = new BehaviorSubject<UserRole[]>(null);
    this.accessTokenSubject = new BehaviorSubject<string>(this.getAccessToken());

    this.accessTokenSubject.subscribe(token => {
      if (token === 'logout') {
        this.userSubject.next(null);
        this.router.navigate(['/']);

      } else if (token && !this.jwtHelper.isTokenExpired(token)) {
        this.getUserInfo();
        this.getRoles();

      } else if (token && this.getRefreshToken() && this.jwtHelper.isTokenExpired(this.getAccessToken())) {
        this.refreshToken();

      } else {
        this.getToken();
      }
    })
  }

  public async login() {
    localStorage.clear();
    // GENERATE STATE
    const state = this.generateRandomString(32);
    localStorage.setItem(localStateKey, state);
    // GENERATE CODE VERIFIER
    const code_verifier = this.generateRandomString(128)
    const code_challenge = await this.pkceChallengeFromVerifier(code_verifier);
    localStorage.setItem(localVerifierKey, code_verifier);

    this.getAccesCode(state, code_challenge);
  }

  private getAccesCode(state: string, code_challenge: string) {
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('redirect_uri', `${window.location.origin}`)
      .set('state', state)
      // outcomment IF PKCE Authentaction flow is used
      .set('client_id', environment.clientIdPKCE)
      .set('code_challenge', code_challenge)
      .set('code_challenge_method', 'S256')
      .set('scope', 'openid')
    window.open(environment.authorizeUrl + params, '_self');
  }

  private checkState(state: string) {
    const stateLocal = localStorage.getItem(localStateKey);
    return state !== stateLocal
  }

  private getToken() {
    const url = window.location.search;

    const urlParams = new URLSearchParams(url);


    if (urlParams.has('code') && urlParams.has('state')) {
      // Checks if sended state is equal to received state, CSRF attacks
      if (this.checkState(urlParams.get('state'))) {
        localStorage.clear();
      } else {
        const code = urlParams.get('code');
        const code_verifier = localStorage.getItem(localVerifierKey);
        const params = new HttpParams()

          .set('code', code)
          .set('redirect_uri', `${window.location.origin}`)
          .set('grant_type', 'authorization_code')
          // outcomment IF PKCE Authentaction flow is used
          .set('client_id', `${environment.clientIdPKCE}`)
          .set('code_verifier', code_verifier)

        this.http.post<any>(environment.tokenUrl, params).subscribe(token => {

          const accessToken = token[accessTokenKey];
          const refreshToken = token[refreshTokenKey];
          const idToken = token[idTokenKey]; // used later for logout reference

          localStorage.setItem(localAccessTokenKey, accessToken);
          localStorage.setItem(localRefreshTokenKey, refreshToken);
          localStorage.setItem(localIdTokenKey, idToken);

          this.accessTokenSubject.next(accessToken);
        },
        error => console.error('Error getToken(): ', error)
        );
      }
    }
  }

  refreshToken() {
    const params = new HttpParams()
      .set('client_id', `${environment.clientIdPublic}`)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', `${this.getRefreshToken()}`)
    this.http.post<any>(environment.tokenUrl, params).subscribe(token => {

      const accessToken = token[accessTokenKey];
      const refreshToken = token[refreshTokenKey];
      const idToken = token[idTokenKey];

      localStorage.setItem(localAccessTokenKey, accessToken);
      localStorage.setItem(localRefreshTokenKey, refreshToken);
      localStorage.setItem(localIdTokenKey, idToken);

      this.accessTokenSubject.next(accessToken);
    },
    error => {
      console.error('Error getToken via refreshToken: ', error)

    }
    );
  }

  private getUserInfo() {
    this.http.get<UserInfoModel>(environment.userInfoUrl).subscribe(user => {
      this.userSubject.next(user);
    }, error => {
      console.error('Error in user info: ', error)
    });
  }

  private getRoles() {
    this.http.get<any>(`${environment.API_URL}/users/roles`).subscribe(roles => {
      this.rolePASubject.next(roles._embedded.roleModels);
    }, error => {
      console.error('Failed to query roles: ', error)
    });
  }

  logout() {
    const idToken = localStorage.getItem(localIdTokenKey)
    localStorage.clear();
    this.accessTokenSubject.next('logout');
    const params = new HttpParams()
      .set('post_logout_redirect_uri', `${window.location.origin}`)
      .set('id_token_hint', idToken)
    window.open(environment.logoutUrl + params, '_self');
  }

  public getAccessToken(): string {
    return localStorage.getItem(localAccessTokenKey);
  }

  private getRefreshToken(): string {
    return localStorage.getItem(localRefreshTokenKey);
  }

  public isAuthenticated(): boolean {
    if(this.getAccessToken() || this.getRefreshToken()) {
      if (!this.jwtHelper.isTokenExpired(this.getAccessToken())) {
        return true;
      } else if (!this.jwtHelper.isTokenExpired(this.getRefreshToken())) {
        this.refreshToken();
        return true;
      } else {
        this.logout();
        return false;
      }
    } else {
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
    // using 4byte blocks now -> translated into 8 chars with padding
    var array = new Uint32Array(Math.ceil(length/8));
    window.crypto.getRandomValues(array);
    return (Array.from(array, dec => dec.toString(16).padStart(8, '0'))).join('').substr(0, length);
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

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of, EMPTY, observable } from "rxjs";
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Router } from "@angular/router";
import { switchMap, skipWhile, tap, map, catchError } from "rxjs/operators";
import { TokenInterceptor } from "./token.interceptor";
import { User, Role } from "./data/User";
// import { UserService } from "./user.service";
import { JwtHelperService } from "@auth0/angular-jwt";


const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';
const tokenKey = 'token';
const stateKey = 'state';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private regexCode: RegExp;
    private regexState: RegExp;


    private accessTokenSubject: BehaviorSubject<string>;
    accessToken$: Observable<string>;
    private loggedUserSubject: BehaviorSubject<User>;
    loggedUser$: Observable<User>;
    private logoutSubject: Subject<string>;
    logout$: Observable<string>;
    private userLoading = false;

    // private userLoggedIn = null;
    public userLoggedIn$: BehaviorSubject<boolean>;

    constructor(
        private http: HttpClient,
        private config: ConfigService,
        private router: Router,
        // private userService: UserService,
    ) {
        console.log('Init Authentication Service');
        // this.jwtHelper = new JwtHelperService();
        TokenInterceptor.init(this);

        this.regexCode = /code=(\w*)/;
        this.regexState = /state=(\w*)/;
        this.authSetup();

        this.getAccesToken();
        // this.initAccessTokenPipe();
        // this.initLoggedUserPipe();
        // this.logoutSubject = new Subject<string>();
        // this.logout$ = this.logoutSubject.asObservable();
    }

    private authSetup() {
        this.userLoggedIn$ = new BehaviorSubject<boolean>(false);
    }

    login() {
        const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem(stateKey, state);
        this.getAccesCode(state);
    }

    getAccesCode(state: string, clientPrivate?: boolean) {
        const params = new HttpParams()
            .set('response_type', 'code')
            .set('client_id', this.config.clientIdPrivate)
            .set('redirect_uri', `${window.location.origin}`)
            // .set('code_challenge', '4cc9b165-1230-4607-873b-3a78afcf60c5');
            .set('scope', 'read+write')
            .set('state', state)

        window.open(this.config.authorizeUrl + params, '_self');
    }

    checkState(state: string) {
        const stateLocal = localStorage.getItem(stateKey);
        console.log(state === stateLocal);
        return state !== stateLocal
    }

    private getAccesToken() {
        const url = window.location.search;

        if (url.includes('code=') && url.includes('state=')) {
            if (this.checkState(this.regexState.exec(url)[1])) {
                console.error('Wrong State')
                localStorage.clear();
            } else {
                const code = this.regexCode.exec(url)[1];
                const params = new HttpParams()
                    .set('code', code)
                    .set('redirect_uri', `${window.location.origin}`)
                    .set('grant_type', 'authorization_code')
                // .set('code_verifier', '4cc9b165-1230-4607-873b-3a78afcf60c5')
                this.http.post<any>(this.config.tokenUrl, params, { headers: { authorization: 'Basic ' + btoa('pattern-pedia-private:pattern-pedia-secret') } }).subscribe(token => {
                    // console.log(token);
                    localStorage.setItem(accessTokenKey, token[accessTokenKey]);
                    localStorage.setItem(refreshTokenKey, token[refreshTokenKey]);
                    this.userLoggedIn$.next(true);
                });
            }
        }
    }

    logout() {
        console.log("Logout");
        const token = localStorage.getItem(accessTokenKey);
        this.http.get<any>(this.config.tokenRevokeUrl, { headers: { authorization: 'Bearer ' + token } }).subscribe(val => {
            localStorage.clear();
            this.userLoggedIn$.next(false);
        });
    }

    // private initAccessTokenPipe() {
    //     this.accessTokenSubject = new BehaviorSubject(this.accessToken);
    //     this.accessToken$ = this.accessTokenSubject.asObservable().pipe(
    //         // filter(token => !!token),
    //         switchMap(token => {
    //             if (token && this.jwtHelper.isTokenExpired(token)) {
    //                 console.log('access token expired');
    //                 // blocks loggedUser to emit until currrent user is loaded
    //                 this.userLoading = true;
    //                 return this.loadAccessTokenUsingRefreshToken();
    //             }
    //             console.log(`access token available ${!!token}`);
    //             return token ? of(token) : EMPTY;
    //         }),
    //     );
    // }

    // private initLoggedUserPipe() {
    //     this.userLoading = true;
    //     this.loggedUserSubject = new BehaviorSubject<User>(null);
    //     this.loggedUser$ = this.loggedUserSubject.asObservable().pipe(
    //         skipWhile(() => {
    //             // this stops loggedUser subject to emit when the current user is being loaded
    //             // it's mainly used inside auth guard, in order to make it waits for current user to be loaded before checking next url
    //             // console.log(`skip loggedUser ${this.userLoading}`);
    //             return this.userLoading;
    //         }),
    //     );
    //     this.accessTokenSubject.asObservable().pipe(
    //         // blocks loggedUser to emit until currrent user is loaded
    //         tap(() => this.userLoading = true),
    //         switchMap(token => this.extractLoggedUser(token)))
    //         .subscribe(user => {
    //             console.log(`logged user change ${user ? user.email : null}`);
    //             // permits loggedUser to emit new values
    //             this.userLoading = false;
    //             this.loggedUserSubject.next(user);
    //         });
    // }

    // get loggedUser(): User {
    //     return this.loggedUserSubject.value;
    // }

    // interceptUrl(req: HttpRequest<any>): boolean {
    //     return req.url.startsWith(this.config.config.serverUrl)
    //         && !req.url.startsWith(this.config.config.signinUrl)
    //         && !req.headers.get('Authorization');
    // }



    // logout(msg: string): Promise<boolean> {
    //     console.log('logout');
    //     this.clearToken();
    //     this.logoutSubject.next(msg);
    //     return this.router.navigate(['/login']);
    // }

    // currentUserUpdateForceLogout(user: User): boolean {
    //     console.log(`force update of logged user ${user.email}`);
    //     if (user.email !== this.loggedUserSubject.value.email || user.role !== this.loggedUserSubject.value.role) {
    //         this.logout('Changed email or role of the current user: forced logout');
    //         return true;
    //     }
    //     this.accessTokenSubject.next(this.accessTokenSubject.value);
    //     return false;
    // }

    // hasRole(role: string): Observable<boolean> {
    //     return this.loggedUser$.pipe(map(loggedUser => loggedUser && loggedUser.role === Role[role]));
    // }

    // private extractLoggedUser(accessToken): Observable<User> {
    //     if (accessToken) {
    //         const data = this.jwtHelper.decodeToken(accessToken);
    //         // console.log(data);
    //         if (data) {
    //             return this.userService.findByEmail(data.user_name);
    //         }
    //     }
    //     return of(null);
    // }

    // private get accessToken(): string {
    //     const token = this.getToken(accessTokenKey);
    //     return token && !this.jwtHelper.isTokenExpired(token) ? token : null;
    // }

    // private loadAccessTokenUsingRefreshToken(): Observable<string> {
    //     const token = this.getToken(refreshTokenKey);
    //     if (!token || this.jwtHelper.isTokenExpired(token)) {
    //         console.log('refresh token expired: must logout');
    //         this.logout('Refresh token expired');
    //         return EMPTY;
    //     }
    //     return this.loadAccessToken(false, token);
    // }

    // private loadAccessToken(retrieveAccessToken: boolean, refreshToken?: string, username?: string, password?: string):
    //     Observable<string> {
    //     console.log(retrieveAccessToken ? 'login' : 'refresh_token');
    //     const params = retrieveAccessToken ?
    //         new HttpParams()
    //             .set('username', username)
    //             .set('password', password)
    //             .set('grant_type', 'password') :
    //         new HttpParams()
    //             .set(refreshTokenKey, refreshToken)
    //             .set('grant_type', refreshTokenKey);
    //     return this.http.post<any>(this.config.config.loginUrl, params,
    //         {
    //             headers: new HttpHeaders().append('Authorization',
    //                 'Basic ' + btoa(`${this.config.config.clientId}:${this.config.config.clientSecret}`)),
    //         }
    //     ).pipe(
    //         // delay(2000),
    //         map(jwt => {
    //             console.log('load token response');
    //             // console.log(jwt);
    //             return this.storeToken(jwt);
    //         }),
    //         catchError(error => {
    //             console.error(error);
    //             if (refreshToken) {
    //                 this.logout('Error loading access token, force logout.');
    //             }
    //             throw error;
    //         })
    //     );
    // }

    // private getToken(key: string): string {
    //     return localStorage.getItem(key);
    // }

    // private setToken(key: string, token: string) {
    //     localStorage.setItem(key, token);
    // }

    // private clearToken() {
    //     localStorage.removeItem(accessTokenKey);
    //     localStorage.removeItem(refreshTokenKey);
    //     this.accessTokenSubject.next(null);
    // }

    // private storeToken(jwt: any): string {
    //     console.log(`store token`);
    //     if (jwt && jwt[accessTokenKey]) {
    //         const accessToken = jwt[accessTokenKey];
    //         if (jwt[refreshTokenKey]) {
    //             this.setToken(refreshTokenKey, jwt[refreshTokenKey]);
    //         }
    //         this.setToken(accessTokenKey, accessToken);
    //         this.accessTokenSubject.next(accessToken);
    //         return accessToken;
    //     }
    //     console.log('token invalid');
    //     return null;
    // }

}
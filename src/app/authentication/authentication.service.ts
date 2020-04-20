import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of, EMPTY, observable } from "rxjs";
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Router } from "@angular/router";
import { switchMap, skipWhile, tap, map, catchError } from "rxjs/operators";
// import { TokenInterceptor } from "./token.interceptor";
import { User, Role } from "../core/service/data/User";
// import { UserService } from "./user.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInterceptor } from "./token.interceptor";


const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';
const tokenKey = 'token';
const stateKey = 'state';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private regexCode: RegExp;
    private regexState: RegExp;


    // private accessTokenSubject: BehaviorSubject<string>;
    // accessToken$: Observable<string>;
    // private loggedUserSubject: BehaviorSubject<User>;
    // loggedUser$: Observable<User>;
    // private logoutSubject: Subject<string>;
    // logout$: Observable<string>;
    // private userLoading = false;

    // private userLoggedIn = null;
    public userLoggedInSubject$: BehaviorSubject<boolean>;
    public accessTokenSubject$: BehaviorSubject<string>;
    private jwtHelper: JwtHelperService;
    // private jwtHelper: JwtHelperService;

    constructor(
        private http: HttpClient,
        private config: ConfigService,
        private router: Router,
        // public jwtHelper: JwtHelperService
        // private userService: UserService,
    ) {
        console.log('Init Authentication Service');
        this.jwtHelper = new JwtHelperService();
        TokenInterceptor.init(this);

        this.regexCode = /code=(\w*)/;
        this.regexState = /state=(\w*)/;
        this.authSetup();

        this.getToken();
        // this.initAccessTokenPipe();
        // this.initLoggedUserPipe();
        // this.logoutSubject = new Subject<string>();
        // this.logout$ = this.logoutSubject.asObservable();
    }

    private authSetup() {
        console.log('Check for token: ', localStorage.getItem(accessTokenKey));
        localStorage.getItem(accessTokenKey) == null ? 
        this.userLoggedInSubject$ = new BehaviorSubject<boolean>(false) : this.userLoggedInSubject$ = new BehaviorSubject<boolean>(true);
        
        // this.accessTokenSubject$ = new BehaviorSubject<string>(localStorage.getItem(accessTokenKey));
        // this.accessTokenSubject$.subscribe(token => {
        //     token !=
        // })
    }

    public login() {
        const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem(stateKey, state);
        this.getAccesCode(state);
    }

    private getAccesCode(state: string, clientPrivate?: boolean) {
        const params = new HttpParams()
            .set('response_type', 'code')
            .set('client_id', this.config.clientIdPrivate)
            .set('redirect_uri', `${window.location.origin}`)
            // .set('code_challenge', '4cc9b165-1230-4607-873b-3a78afcf60c5');
            .set('scope', 'read+write')
            .set('state', state)

        window.open(this.config.authorizeUrl + params, '_self');
    }

    private checkState(state: string) {
        const stateLocal = localStorage.getItem(stateKey);
        // console.log(state === stateLocal);
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
                const params = new HttpParams()
                    .set('code', code)
                    .set('redirect_uri', `${window.location.origin}`)
                    .set('grant_type', 'authorization_code')
                // .set('code_verifier', '4cc9b165-1230-4607-873b-3a78afcf60c5')
                this.http.post<any>(this.config.tokenUrl, params, { headers: { authorization: 'Basic ' + btoa(`${this.config.clientIdPrivate}:${this.config.clientSecret}`) } }).subscribe(token => {
                    console.log(token);
                    // this.jwtHelper.
                    localStorage.setItem(accessTokenKey, token[accessTokenKey]);
                    localStorage.setItem(refreshTokenKey, token[refreshTokenKey]);
                    // this.accessTokenSubject$.next(token[accessTokenKey]);
                    this.userLoggedInSubject$.next(true);

                },
                    error => console.error('Error getToken(): ', error)
                );
            }
        }
    }

    refreshToken() {
        console.log("Refresh Token");
        const refreshToken = localStorage.getItem(refreshTokenKey);
        const params = new HttpParams()
            .set('client_id', this.config.clientIdPrivate)
            .set('grant_type', 'refresh_token')
            .set('refresh_token', refreshToken)
        console.log(params);
        this.http.post<any>('http://localhost:8081/oauth/token', params, { headers: { authorization: 'Bearer ' + this.getAccesToken } }).subscribe(val => {
            console.log(val);
            // this.token == null ? this.token = val['access_token'] : null ;
            // this.token = (val['access_token']);
        });
    }

    logout() {
        console.log("Logout");
        const token = localStorage.getItem(accessTokenKey);
        this.http.get<any>(this.config.tokenRevokeUrl, { headers: { authorization: 'Bearer ' + token } }).subscribe(val => {
            localStorage.clear();
            this.userLoggedInSubject$.next(false);
        },
            error => {
                console.error('Error revokeToken(): ', error)
                localStorage.clear();
                this.userLoggedInSubject$.next(false);
            });
    }

    public getAccesToken(): string {
        return localStorage.getItem(accessTokenKey);
    }

    public isAuthenticated(): boolean {
        // const jwtHelper = new JwtHelperService();
        return !this.jwtHelper.isTokenExpired(this.getAccesToken());
    }

    public getUserRole(): string[] {
        // const jwtHelper = new JwtHelperService();
        const authorities = this.jwtHelper.decodeToken(this.getAccesToken())['authorities'];
        // console.log(authorities);
        return authorities;
    }

    hasRole(role: string): Observable<boolean> {
        const token = localStorage.getItem(accessTokenKey);
        if (token == null) {
            of(false);
        } else {
            const authorities = this.getUserRole();
            return of(authorities.includes(role));
        }

       
        // return authorities
      }

}
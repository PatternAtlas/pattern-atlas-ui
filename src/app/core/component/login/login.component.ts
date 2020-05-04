import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../../../authentication/_services/authentication.service';
// import { UserService } from '../../service/user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from '../../../authentication/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  authenticated = false;
  token: string;
  tokenRefresh: string;
  private windowHandle: Window;
  public href: string = "";

  private regexCode: RegExp;
  private regexState: RegExp;


  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService, private config: ConfigService) {
    // http.get('resource').subscribe(data => console.log(data));
    this.regexCode = /code=(\w*)/;
    this.regexState = /state=(\w*)/;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),

    });
    this.href = this.router.url;
    console.log(this.router.url);
  }

  // http://localhost:8081/oauth/authorize?response_type=code&client_id=public&redirect_uri=http://localhost:4200/login
  // code_challenge=4cc9b165-1230-4607-873b-3a78afcf60c5


  reroute() {
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', 'pattern-pedia-private')
      .set('redirect_uri', 'http://localhost:4200/login')
      // .set('code_challenge', '4cc9b165-1230-4607-873b-3a78afcf60c5');
      .set('scope', 'read+write')
      .set('state', '1234')

    this.windowHandle = window.open('http://localhost:8081/oauth/authorize?' + params, '_self');


    // this.windowHandle = window.open('http://localhost:8081/oauth/authorize' + params.toString(), '_self');
    // this.windowHandle = window.open('http://localhost:8081/oauth/authorize?response_type=code&client_id=pattern-pedia-public&redirect_uri=http://localhost:4200/login&code_challenge=4cc9b165-1230-4607-873b-3a78afcf60c5', '_self');
  }

  //curl localhost:8081/oauth/token -d client_id=public -d grant_type=authorization_code -d redirect_uri=http://localhost:4200/login  -d code=1ALnC8 -d code_verifier=4cc9b165-1230-4607-873b-3a78afcf60c5

  getTokenCode() {
    const code = this.regexCode.exec(this.href)[1];
    console.log("get Token via Code", this.href);
    const params = new HttpParams()
      .set('code', code)
      // .set('client_id', 'pattern-pedia-private')
      // .set('client_secret', 'pattern-pedia-secret')
      .set('redirect_uri', 'http://localhost:4200/login')
      .set('grant_type', 'authorization_code')
    // .set('code_verifier', '4cc9b165-1230-4607-873b-3a78afcf60c5')
    // console.log(params);
    this.http.post<any>('http://localhost:8081/oauth/token', params, { headers: { authorization: 'Basic ' + btoa('pattern-pedia-private:pattern-pedia-secret') } }).subscribe(val => {
      // this.http.post<any>('http://localhost:8081/oauth/token', params ).subscribe(val => {
      console.log(val);
      // this.token == null ? this.token = val['access_token'] : null ;
      this.token = (val['access_token']);
      this.tokenRefresh = (val['refresh_token']);
    });
  }

  getTokenRefresh() {
    this.auth.login();
    // console.log("get Token");
    // const params = new HttpParams()
    // .set('client_id', 'pattern-pedia-public')
    // .set('grant_type', 'refresh_token')
    // .set('refresh_token', this.tokenRefresh)
    // console.log(params);
    // this.http.post<any>('http://localhost:8081/oauth/token', params, { headers: { authorization: 'Bearer ' + this.token } }).subscribe(val => {
    //   console.log(val);
    //   // this.token == null ? this.token = val['access_token'] : null ;
    //   this.token = (val['access_token']);
    // });
  }

  getAll() {
    // this.http.get<any>('http://localhost:8081/alive', { headers: { authorization: 'Bearer ' + this.token } }).subscribe(val => {
    //   console.log(val);
    // });

    // const params = new HttpParams()
    //   .set('client_id', 'pattern-pedia-private')
    //   .set('client_secret', 'pattern-pedia-secret')
    //   // .set('grant_type', 'refresh_token')
    //   .set('token', localStorage.getItem('access_token'))
    // this.http.post<any>('http://localhost:8081/oauth/check_token', params, { headers: { authorization: 'Basic ' + btoa(`${this.config.clientIdPrivate}:${this.config.clientSecret}`) } }).subscribe(val => {
    //   console.log(val);
    // });


    // const params1 = new HttpParams()
    //   // .set('code', code)
    //   // .set('redirect_uri', `${window.location.origin}`)
    //   .set('token', localStorage.getItem('access_token'))
    // // .set('code_verifier', '4cc9b165-1230-4607-873b-3a78afcf60c5')
    // this.http.delete<any>('http://localhost:8081/oauth/check_token',{ headers: { authorization: 'Bearer ' + localStorage.getItem('access_token') } }).subscribe(token => {
    //   console.log(token);
    // });

    // this.http.get<any>('http://localhost:8081/user_info', { headers: { authorization: 'Bearer ' + localStorage.getItem('access_token') } }).subscribe(token => {
    //   console.log(token);
    // });


    // this.http.get<any>('http://localhost:8080/user/getAll').subscribe(val => {
    //   console.log(val);
    // });

    this.http.get<any>('http://localhost:8080/user/getAll', { headers: { authorization: 'Bearer ' + localStorage.getItem('access_token') } }).subscribe(val => {
      console.log(val);
    });

    this.http.get<any>('http://localhost:8080/home', { headers: { authorization: 'Bearer ' + localStorage.getItem('access_token') } }).subscribe(val => {
      console.log(val);
    });

    this.http.get<any>('http://localhost:8080/test', { headers: { authorization: 'Bearer ' + localStorage.getItem('access_token') } }).subscribe(val => {
      console.log(val);
    });

    // this.http.get<any>('http://localhost:8080/user/getuser', { headers: { authorization: 'Bearer ' + localStorage.getItem('access_token') } }).subscribe(val => {
    //   console.log(val);
    // });
  }

  logout() {
    console.log("lLog Out");
    const params = new HttpParams()
      .set('client_id', 'pattern-pedia-public')
      .set('grant_type', 'refresh_token')
      .set('refresh_token', this.tokenRefresh)
    console.log(params);
    this.http.get<any>('http://localhost:8081/oauth/revoke_token', { headers: { authorization: 'Bearer ' + localStorage.getItem('access_token') } }).subscribe(val => {
      console.log(val);
      this.token = null;
      this.tokenRefresh = null;
    });
  }



  // this.http.get('http://localhost:8081' + '/user', { headers: { authorization: 'Basic ' + btoa('user' + ':' + 'pass') } }).subscribe(response => {
  //   console.log(response);
  //   if (response['name']) {
  //     this.authenticated = true;
  //   } else {
  //     this.authenticated = false;
  //   }
  //   return callback && callback();
  // });

  // this.http.get('http://localhost:8081/resource', { headers: { authorization: 'Basic ' + btoa('user' + ':' + 'pass') } }).subscribe(response => {
  //   console.log(response);
  // });

  // this.http.get('http://localhost:8080/user/getAll', { headers: { authorization: 'Basic ' + btoa('user' + ':' + 'pass') } }).subscribe(response => {
  //   console.log(response);
  // });


  // loginForm: FormGroup;
  // private loadingSubject: BehaviorSubject<boolean>;
  // loading$: Observable<boolean>;

  // constructor(private authentication: AuthenticationService, private router: Router, private userService: UserService, private http: HttpClient) {
  //   // this.loadingSubject = new BehaviorSubject<boolean>(false);
  //   // this.loading$ = this.loadingSubject.asObservable();
  // }

  // ngOnInit() {
  //   this.loginForm = new FormGroup({
  //     username: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', Validators.required),
  //   });
  // }

  // login() {
  //   this.loadingSubject.next(true);
  //   this.authentication.login(this.loginForm.value.username, this.loginForm.value.password)
  //     .then(
  //       () => {
  //         this.loadingSubject.next(false);
  //         this.router.navigate(['/**']);
  //       },
  //       error => {
  //         console.log('Authentication failed');
  //         this.loadingSubject.next(false);
  //       });
  // }

  // getToken() {
  //   console.log("get Token");
  //   this.authentication.test()
  // }

  // create() {
  //   this.userService.signin(this.loginForm.value.username, this.loginForm.value.password)
  //     .subscribe(newUser => {
  //       console.log(`after signin ${newUser}`);
  //       this.loadingSubject.next(false);
  //       if (newUser) {
  //         console.log(`User ${newUser.email} successfully created.`);
  //         this.router.navigate(['/login']);
  //       }
  //     },
  //       err => {
  //         console.error('User creation failed due to ${err}.');
  //         this.loadingSubject.next(false);
  //       }
  //     );
  // }
}
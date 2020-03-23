import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
// import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  authenticated = false;
  token: string;
  private windowHandle: Window;
  public href: string = "";


  constructor(private http: HttpClient, private router: Router) {
    // http.get('resource').subscribe(data => console.log(data));
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),

    });
    this.href = this.router.url;
    console.log(this.router.url);
  }

  reroute() {
    this.windowHandle = window.open('http://localhost:8081/oauth/authorize?grant_type=authorization_code&response_type=code&client_id=redirect&state=1234', "_self");
  }

  getTokenCode() {
    this.href = this.href.slice(12, 18);
    console.log("get Token via Code", this.href);
    const params = new HttpParams()
      .set('code', this.href)
      // .set('password', 'pass')
      .set('grant_type', 'authorization_code');
    console.log(params);
    this.http.post<any>('http://localhost:8081/oauth/token', params, { headers: { authorization: 'Basic ' + btoa('redirect:iamaghost') } }).subscribe(val => {
      console.log(val);
      // this.token == null ? this.token = val['access_token'] : null ;
      this.token = (val['access_token']);
    });
  }

  getToken() {
    console.log("get Token");
    const params = new HttpParams()
      .set('username', 'a@a')
      .set('password', 'pass')
      .set('grant_type', 'password');
    console.log(params);
    this.http.post<any>('http://localhost:8081/oauth/token', params, { headers: { authorization: 'Basic ' + btoa('pattern-pedia-client:iamaghost') } }).subscribe(val => {
      console.log(val);
      // this.token == null ? this.token = val['access_token'] : null ;
      this.token = (val['access_token']);
    });
  }

  getAll() {
    this.http.get<any>('http://localhost:8081/alive', { headers: { authorization: 'Bearer ' + this.token } }).subscribe(val => {
      console.log(val);
    });

    this.http.get<any>('http://localhost:8081/userinfo', { headers: { authorization: 'Bearer ' + this.token } }).subscribe(val => {
      console.log(val);
    });

    this.http.post<any>('http://localhost:8081/oauth/check_token', new HttpParams().set("token", this.token)).subscribe(val => {
      console.log(val);
    });

    this.http.get<any>('http://localhost:8080/user/getAll', { headers: { authorization: 'Bearer ' + this.token } }).subscribe(val => {
      console.log(val);
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
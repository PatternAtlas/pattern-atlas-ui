import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe, throwError } from 'rxjs';
import { filter, retryWhen, switchMap, take, delay } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { ConfigService } from '../config.service';
// import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private static authService: AuthenticationService = null;

    static init(authService: AuthenticationService) {
        console.log(`interceptor initialized`);
        this.authService = authService;
    }

    constructor( private config: ConfigService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.url.includes(this.config.repositoryUrl) || request.url.includes(this.config.userInfoUrl) ) {
            return next.handle(this.addToken(request));
        } else {
            return next.handle(request);
        }
    }

    private addToken(request: HttpRequest<any>): HttpRequest<any> {
        const token = TokenInterceptor.authService.getAccesToken()
        if (token == null) {
            return request;
        } else {
            return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }        
    }
}

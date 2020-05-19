import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private static authService: AuthenticationService = null;

    static init(authService: AuthenticationService) {
        console.log(`interceptor initialized`);
        this.authService = authService;
    }

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.url.includes(environment.repositoryUrl) || request.url.includes(environment.userInfoUrl) ) {
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

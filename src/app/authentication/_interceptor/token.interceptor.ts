import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private static authService: AuthenticationService = null;

  static init(authService: AuthenticationService) {
    this.authService = authService;
  }

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url.includes(environment.API_URL) || request.url.includes(environment.userInfoUrl)) {
      return next.handle(this.addToken(request));
    } else {
      return next.handle(request);
    }
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    if (TokenInterceptor.authService.isAuthenticated()) {
      const token = TokenInterceptor.authService.getAccessToken();
      return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    } else {
      return request;
    }
  }
}

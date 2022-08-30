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

  private getUrlPort(url : URL) {
    if (url.port != '') {
      return url.port;
    } else {
      if (url.protocol == 'https:') {
        return 443;
      }
      if (url.protocol == 'http:') {
        return 80;
      }
      return 0;
    }
  }

  private isApiRequest(request: HttpRequest<unknown>) {
    if(request.url.includes(environment.userInfoUrl)) {
      return true;
    } else {
      let reqUrl = new URL(request.url);
      let apiUrl = new URL(environment.API_URL);

      if (apiUrl.hostname == reqUrl.hostname && apiUrl.protocol == reqUrl.protocol) {
        let reqPort = this.getUrlPort(reqUrl);
        let apiPort = this.getUrlPort(apiUrl);

        return reqPort == apiPort;
      }
    }

    return false;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if (this.isApiRequest(request)) {
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

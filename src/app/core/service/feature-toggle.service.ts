import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {

  private readonly cookieName = 'feature-toggles';

  private features = new BehaviorSubject<{ [ key: string ]: boolean }>({});


  constructor(private cookieService: CookieService) {
    this.readCookie();
  }


  private readCookie(): void {
    try {
      const featureToggles = JSON.parse(this.cookieService.get(this.cookieName));
      this.features.next(featureToggles);
    } catch (e) {
    }
  }


  getFeatures(): Observable<{ [ key: string ]: boolean }> {
    return this.features.asObservable();
  }


  get(feature: string): boolean {
    try {
      return !!this.features.getValue()[ feature ];
    } catch (e) {
    }

    return false;
  }


  set(feature: string, activated: boolean): void {
    let featureToggles = {};
    try {
      featureToggles = JSON.parse(this.cookieService.get(this.cookieName));
    } catch (e) {
    }

    featureToggles[ feature ] = activated;

    this.features.next(featureToggles);

    this.cookieService.set(this.cookieName, JSON.stringify(featureToggles));
  }


  enable(feature: string): void {
    this.set(feature, true);
  }


  disable(feature: string): void {
    this.set(feature, false);
  }
}

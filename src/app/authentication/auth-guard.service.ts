import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToasterService } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthenticationService, 
    public router: Router,
    private toaserService: ToasterService
    ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const role = route.data.role;

    if (!this.auth.isAuthenticated() || !this.auth.getUserRole().includes(role)) {
      // this.router.navigate(['login']);
      console.log('Not allowed')
      this.toaserService.pop('error', 'You do not have the rights for Route', route.routeConfig.path);
      return false;
    }
    return true;
  }
}

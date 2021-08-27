import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToasterService } from 'angular2-toaster';
import { PrivilegeService } from './privilege.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    public privilegeService: PrivilegeService,
    private toaserService: ToasterService

  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const privilege = route.data.privilege;

    return this.privilegeService.hasPrivilege(privilege).pipe(
      map(result => {
        return result;
      }));
  }
}

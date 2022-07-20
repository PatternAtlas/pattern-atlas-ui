import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { PAUser } from 'src/app/core/user-management';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
import { AuthorModel, AuthorManagementService, Author } from 'src/app/core/author-management';

@Injectable()
export class PrivilegeService {

  constructor(
    private auth: AuthenticationService,
    private toasterService: ToasterService,
  ) { }

  isCurrentUser(userId: string): Observable<boolean> {
    return this.auth.user.pipe(
      map(_user => {
        if (_user)
          return _user.id === userId;
        return false;
      })
    )
  }

  isNotCurrentUser(userId: string): Observable<boolean> {
    return this.isCurrentUser(userId).pipe(
      map(result => !result )
    );
  }

  userHasPrivilege(privilege: string): Observable<boolean> {
    return this.auth.user.pipe(
      map(_user => {
        if (_user) return _user.privileges.includes(privilege)
        return false;
      })
    )
  }

  isGroubMember(authors: AuthorModel[], privilege?: string): Observable<boolean> {
    return this.auth.user.pipe(
      map(_user => {
        if (_user) {
          if (privilege && _user.privileges.includes(privilege)) return true;
          for (var a of authors) {
            if (a.userId === _user.id) {
              return true;
            }
          }
        }
        return false;
      }
      ));
  }

  isMaintainerOrOwner(authors: AuthorModel[], privilege?: string): Observable<boolean> {
    return this.auth.user.pipe(
      map(_user => {
        if (_user) {
          if (privilege && _user.privileges.includes(privilege)) return true;
          for (var a of authors) {
            if (a.userId === _user.id) {
              if (a.authorRole === Author.OWNER || a.authorRole === Author.MAINTAINER) {
                return true;
              }
            }
          }
        }
        return false;
      }
      ));
  }

  hasPrivilege(privilege: string): Observable<boolean> {
    return this.auth.user.pipe(
      map(_user => {
        if (_user) {
          if (_user.privileges.includes(privilege)) return true;
          return false;
        }
        return false;
      })
    )
  }
}

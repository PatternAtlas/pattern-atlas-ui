import { BehaviorSubject } from 'rxjs';
import { PAUser } from '../_models/user.model';

export class UserStore {
  private _user: BehaviorSubject<PAUser> = new BehaviorSubject(null);

  get user() {
    return this._user.asObservable();
  }

  addUser(user: PAUser) {
    this._user.next(user);
  }

  resetUser() {
    this._user.next(null);
  }
}

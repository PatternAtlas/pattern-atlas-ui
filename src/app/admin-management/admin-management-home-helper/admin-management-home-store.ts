import { PAUser } from "../admin-management.service";
import { BehaviorSubject } from "rxjs";

export class AdminManagementHomeStore {
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

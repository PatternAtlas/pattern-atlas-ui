import { BehaviorSubject } from 'rxjs';
import { Issue } from '../_models/issue.model';
import { Injectable } from '@angular/core';

@Injectable()
export class IssueManagementStore {

    private _issue: BehaviorSubject<any> = new BehaviorSubject(null);
    
    get issue() {
      return this._issue.asObservable();
    }

    addIssue(issue: Issue) {
      this._issue.next(issue);
    }

    resetIssue() {
      this._issue.next(null);
    }
}

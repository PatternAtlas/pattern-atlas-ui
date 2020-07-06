import { BehaviorSubject } from 'rxjs';
import { Issue } from '../_models/issue.model';
import { Injectable } from '@angular/core';

@Injectable()
export class IssueManagementStore {

    private _issue: BehaviorSubject<any> = new BehaviorSubject(null);
    // private _issue2Candidate: BehaviorSubject<any> = new BehaviorSubject(null);
    // public _issue2Candidate: Issue;
    
    get issue() {
      return this._issue.asObservable();
    }
    // get issue2Candidate() {
    //     return this._issue2Candidate.asObservable();
    // }

    addIssue(issue: Issue) {
      this._issue.next(issue);
    }

    resetIssue() {
      this._issue.next(null);
    }

  // addIssue2Candidate(issue2Candidate: Issue) {
  //     console.log(issue2Candidate)
  //     this._issue2Candidate.next(issue2Candidate);
  // }

  // resetIssue2Candidate() {
  //     this._issue2Candidate.next(null);
  // }
}

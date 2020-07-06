import { BehaviorSubject } from 'rxjs';
import { Candidate } from '../_models/candidate.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CandidateManagementStore {
    private _candidate: BehaviorSubject<any> = new BehaviorSubject(null);

    get candidate() {
      return this._candidate.asObservable();
    }

    addCandidate(candidate: Candidate) {
      this._candidate.next(candidate);
    }

    resetCandidate() {
      this._candidate.next(null);
    }
}

import { BehaviorSubject } from 'rxjs';
import { Candidate } from '../_models/candidate.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CandidateManagementStore {
    private static _candidate: BehaviorSubject<any> = new BehaviorSubject(null);

    get candidate() {
      return CandidateManagementStore._candidate.asObservable();
    }

    addCandidate(candidate: Candidate) {
      CandidateManagementStore._candidate.next(candidate);
    }

    resetCandidate() {
      CandidateManagementStore._candidate.next(null);
    }
}

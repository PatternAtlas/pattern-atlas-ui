import { BehaviorSubject } from "rxjs";
import { Candidate } from "src/app/candidate-management/candidate-management.service";

export class IssueManagementStore {
    private _issue2Candidate: BehaviorSubject<any> = new BehaviorSubject(null);

    get candidateFromIssue() {
        return this._issue2Candidate.asObservable();
    }

    addCandidateFromIssue(issue2Candidate: any) {
        console.log(issue2Candidate)
        this._issue2Candidate.next(issue2Candidate);
    }

    resetCandidateFromIssue() {
        this._issue2Candidate.next(null);
    }
}

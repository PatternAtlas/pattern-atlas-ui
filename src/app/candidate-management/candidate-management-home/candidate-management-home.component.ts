import { Component, OnInit } from '@angular/core';
import { Candidate, CandidateManagementService } from '../candidate-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pp-candidate-management-home',
  templateUrl: './candidate-management-home.component.html',
  styleUrls: ['./candidate-management-home.component.scss']
})
export class CandidateManagementHomeComponent implements OnInit {

  candidates: Candidate[];

  constructor(
    private candidateService: CandidateManagementService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.candidateService.getAllCandidates().subscribe(result => {
      console.log(result);
      this.candidates = result;
    })
  }

  candidateDetail(candidate) {
    console.log(candidate);
    this.router.navigate(['candidate/edit',  candidate.name], {state: {data: candidate }});
  }

  createCandidate() {
    this.router.navigate(['candidate/create']);
  }

}

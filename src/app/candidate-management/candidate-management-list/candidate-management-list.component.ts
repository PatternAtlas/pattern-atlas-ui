import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatternLanguageService } from 'src/app/core/service/pattern-language.service';
import PatternLanguageModel from 'src/app/core/model/hal/pattern-language-model.model';
import { CandidateManagementService, Candidate, CandidateManagementStore } from 'src/app/core/candidate-management';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';

@Component({
  selector: 'pp-candidate-management-list',
  templateUrl: './candidate-management-list.component.html',
  styleUrls: ['./candidate-management-list.component.scss']
})
export class CandidateManagementListComponent implements OnInit {

  candidates: Candidate[];
  public patternLanguages: PatternLanguageModel[];

  constructor(
    private candidateService: CandidateManagementService,
    public candidateStore: CandidateManagementStore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private patternLanguageService: PatternLanguageService,
    private p: PrivilegeService,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.getPatternLanguages();
  }

  getAll() {
    this.candidateService.getAllCandidates().subscribe(result => {
      this.candidates = result;
    })
  }

  getPatternLanguages() {
    this.patternLanguageService.getPatternLanguages().subscribe(result => {
      const none = new PatternLanguageModel()
      none.name = 'No Pattern Language assigned';
      none.id = null;
      this.patternLanguages = [none].concat(result);
    })
  }

  /** NAVIGATION */
  new() {
    this.router.navigate(['./create'], { relativeTo: this.activeRoute.parent });
  }

  detail(candidate: Candidate) {
    this.candidateStore.addCandidate(candidate)
    this.router.navigate(['./detail', candidate.name], { relativeTo: this.activeRoute.parent });
  }

  edit(candidate: Candidate) {
    this.candidateStore.addCandidate(candidate)
    this.router.navigate(['./edit', candidate.name], { relativeTo: this.activeRoute.parent });
  }

}

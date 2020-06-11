import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IssueManagementStore } from '../../core/issue-management/_store/issue-management-store';
import { Router, ActivatedRoute } from '@angular/router';
import { PatternLanguageService } from 'src/app/core/service/pattern-language.service';
import PatternLanguageModel from 'src/app/core/model/hal/pattern-language-model.model';
import { Issue, IssueManagementService } from 'src/app/core/issue-management';
import { Candidate, CandidateManagementStore } from 'src/app/core/candidate-management';
import { RatingModelRequest, RatingManagementService } from 'src/app/core/rating-management';
import { AuthorManagementService, AuthorModelRequest, AuthorModel, Author } from 'src/app/core/author-management';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';

@Component({
  selector: 'pp-issue-management-detail',
  templateUrl: './issue-management-detail.component.html',
  styleUrls: ['./issue-management-detail.component.scss']
})
export class IssueManagementDetailComponent implements OnInit {

  public patternLanguageSelected: string;
  public issue: Issue;
  private oldIssue: Issue;

  disabled: boolean = true;
  candidate: boolean = false;

  constructor(
    private issueManagementService: IssueManagementService,
    public issueManagementStore: IssueManagementStore,
    public candidateManagementStore: CandidateManagementStore,
    private p: PrivilegeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.issueManagementStore.issue.subscribe(_issue => {

      if (_issue && this.router.url.includes('detail')) {
        this.disabled = true;
        this.issue = _issue;

      } else if (_issue && this.router.url.includes('edit')) {
        this.issue = _issue;
        this.edit();

      } else if (!_issue && window.history.state.data) {
        this.issue = window.history.state.data as Issue;
      } else {
        this.disabled = false;
        this.issue = new Issue();
      }
    });
  }

  /** BUTTONS */
  edit() {
    this.oldIssue = Object.assign({}, this.issue);
    this.disabled = !this.disabled;
  }

  cancel() {
    if (!this.oldIssue) this.exit();
    this.issue = this.oldIssue;
    this.disabled = !this.disabled;
  }

  exit() {
    this.router.navigateByUrl('/issue')
  }

  /** CANDIDATE */
  selectLanguage() {
    this.candidate = !this.candidate;
  }

  createCandidate() {
    console.log('Create Candidate: ', this.issue, this.patternLanguageSelected);
    const candidate = new Candidate(this.issue.description, this.issue.name, this.patternLanguageSelected, this.issue.authors)
    console.log(candidate);
    this.router.navigate(['candidate/create', this.issue.name], { state: { data: candidate } });
  }

  cancelCandidate() {
    this.candidate = !this.candidate;
  }

  /** SERVICE */
  /** ISSUE */
  submit() {
    console.log('submit');
    this.issue.uri = `/issues/${this.issue.name}`
    this.issue.id ? this.update() : this.create();
  }

  create() {
    this.issueManagementService.createIssue(this.issue).subscribe(result => {
      this.issue = result
      this.disabled = true;
    })
  }

  update() {
    this.issueManagementService.updateIssue(this.issue).subscribe(result => {
      this.issue = result;
      this.disabled = true;
    })
  }

  delete() {
    this.issueManagementService.deleteIssue(this.issue).subscribe(result => {
      this.exit();
    })
  }
}
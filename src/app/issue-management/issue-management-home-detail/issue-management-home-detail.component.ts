import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue, IssueManagementService, IssueComment, Rating } from '../issue-management.service';
import { IssueCommentRatingEvent } from 'src/app/core/component/comment-list/comment-list.component';
import { IssueManagementStore } from '../../core/stores/issue-management-store';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/candidate-management/candidate-management.service';
import { PatternLanguageService } from 'src/app/core/service/pattern-language.service';
import PatternLanguageModel from 'src/app/core/model/hal/pattern-language-model.model';

@Component({
  selector: 'pp-issue-management-home-detail',
  templateUrl: './issue-management-home-detail.component.html',
  styleUrls: ['./issue-management-home-detail.component.scss']
})
export class IssueManagementHomeDetailComponent implements OnInit {

  @Input() issue: Issue;
  @Output() changed = new EventEmitter<boolean>();

  public disabled = true;
  public patternLanguages: PatternLanguageModel[];
  public patternLanguageSelected: string;

  // JavaScript passes Ojbects via reference
  private name: string;
  private description: string;
  private oldIssue: Issue;

  constructor(
    private issueManagementService: IssueManagementService,
    public issueManagementStore: IssueManagementStore,
    private router: Router,
    private patternLanguageService: PatternLanguageService,
  ) { }

  ngOnInit(): void {
    this.getPatternLanguages();
  }

  getPatternLanguages() {
    this.patternLanguageService.getPatternLanguages().subscribe(result => {
      console.log(result);
      this.patternLanguages = result;
    })
  }

  edit() {
    console.log('Edit', this.issue)
    this.oldIssue = Object.assign({}, this.issue);
    // this.name = this.issue.name;
    // this.description = this.issue.description;
    this.disabled = !this.disabled;
  }

  cancel() {
    this.issue = this.oldIssue;
    this.disabled = !this.disabled;
    // this.issue.name = this.name;
    // this.issue.description = this.description;
  }

  exit() {
    console.log('Exit', this.issue)
    this.issue = null;
  }

  update() {
    this.issueManagementService.updateIssue(this.issue).subscribe(result => {
      this.changed.emit();
      this.disabled = true;
    })
  }

  delete() {
    console.log('Delete', this.issue)
    this.issueManagementService.deleteIssue(this.issue).subscribe(result => {
      this.changed.emit();
      this.disabled = true;
    })
  }

  createComment(issueComment: IssueComment) {
    console.log(issueComment);
    this.issueManagementService.createComment(this.issue, issueComment).subscribe((result: Issue) => {
      console.log('createComment: ', result);
      this.issue = result;
      this.changed.emit();
    });
  }

  updateRating(rating: Rating) {
    console.log(this.issue, rating);
    this.issueManagementService.updateRating(this.issue, rating).subscribe((result: Issue) => {
      console.log('updateRating: ', result);
      this.issue = result;
      this.changed.emit();
    });
  }

  updateCommentRating(issueCommentRatingEvent: IssueCommentRatingEvent) {
    console.log(issueCommentRatingEvent);
    this.issueManagementService.updateCommentRating(issueCommentRatingEvent.issueComment, issueCommentRatingEvent.issueCommentRating).subscribe((result: Issue) => {
      console.log('updateCommentRating: ', result);
      this.issue = result;
      this.changed.emit();
    });
  }

  createCandidate() {
    console.log('Create Candidate: ', this.patternLanguageSelected);
    const candidate = new Candidate(this.issue.description, this.issue.name, this.patternLanguageSelected)
    this.router.navigate(['candidate/create', this.issue.name], { state: { data: candidate } });
    // this.issueManagementService.createIssue2Candidate(this.issue, this.patternLanguageSelected).subscribe(candidateFromIssue => {
    //   console.log('Candidate create: ', candidateFromIssue);
    //   this.issueManagementStore.addCandidateFromIssue(candidateFromIssue);
    //   // this.router.navigate(['candidate/edit', candidateFromIssue.name]);
    //   this.router.navigate(['candidate/edit',  candidateFromIssue.name], {state: {data: candidateFromIssue }});
    // })
  }

}
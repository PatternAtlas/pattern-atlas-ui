import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue, IssueManagementService, IssueComment, Rating } from '../../issue-management.service';
import { IssueCommentRatingEvent } from 'src/app/core/component/comment-list/comment-list.component';

@Component({
  selector: 'pp-issue-management-home-detail',
  templateUrl: './issue-management-home-detail.component.html',
  styleUrls: ['./issue-management-home-detail.component.scss']
})
export class IssueManagementHomeDetailComponent implements OnInit {

  @Input() issue: Issue;
  @Output() changed = new EventEmitter<boolean>();

  public disabled = true;
  public patternLanguages = ['Lanuage 1', 'None'];
  public patternLanguageSelected = 'None';

  // JavaScript passes Ojbects via reference
  private name: string;
  private description: string;

  constructor(
    private issueManagementService: IssueManagementService,
  ) {}

  ngOnInit(): void {
  }

  edit() {
    console.log('Edit', this.issue)
    this.name = this.issue.name;
    this.description = this.issue.description;
    this.disabled = !this.disabled;
  }

  cancel() {
    this.disabled = true;
    this.issue.name = this.name;
    this.issue.description = this.description;
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
    console.log('Create Candidate: ');
  }

}
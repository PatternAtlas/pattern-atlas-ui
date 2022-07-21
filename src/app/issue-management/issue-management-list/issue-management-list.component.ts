import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IssueManagementService, Issue, IssueManagementStore } from 'src/app/core/issue-management';
import { Router, ActivatedRoute } from '@angular/router';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { PAComment, RatingEventModel, RatingModelRequest } from 'src/app/core/shared';

@Component({
  selector: 'pp-issue-management-list',
  templateUrl: './issue-management-list.component.html',
  styleUrls: ['./issue-management-list.component.scss']
})
export class IssueManagementListComponent implements OnInit {

  data: Issue[];
  activeIssue: Issue = new Issue();

  constructor(
    private issueManagementService: IssueManagementService,
    public issueManagementStore: IssueManagementStore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private p: PrivilegeService,
    public cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.issueManagementService.getAllIssues().subscribe(result => {
      this.data = result;
    })
  }

  /* LIST */
  opened(issue: Issue) {
    this.activeIssue = issue;
  }

  closed(issue: Issue) {
    // IF open issue gets closed again -> comments list hide
    if (this.activeIssue.id === issue.id) this.activeIssue = new Issue();
  }

  /* NAVIGATION */
  new() {
    this.router.navigate(['./create'], { relativeTo: this.activeRoute.parent });
  }

  detail(issue: Issue) {
    this.issueManagementStore.addIssue(issue);
    this.router.navigate(['./detail', issue.name], { relativeTo: this.activeRoute.parent });
  }

  edit(issue: Issue) {
    this.issueManagementStore.addIssue(issue);
    this.router.navigate(['./edit', issue.name], { relativeTo: this.activeRoute.parent });
  }

  /* BACK-END*/
  // RATING
  updateRating(ratingRequest: RatingModelRequest) {
    this.issueManagementService.updateRatingIssue(this.activeIssue, ratingRequest).subscribe(result => {
      this.updateData(result);
    });
  }

  // COMMENTS
  createComment(comment: PAComment) {
    this.issueManagementService.createComment(this.activeIssue, comment).subscribe(result => {
      this.updateData(result);
    });
  }

  updateComment(comment: PAComment) {
    this.issueManagementService.updateComment(this.activeIssue, comment).subscribe(result => {
      this.updateData(result);
    });
  }

  deleteComment(comment: PAComment) {
    this.issueManagementService.deleteComment(this.activeIssue, comment).subscribe(result => {
      this.updateData(result);
    });
  }

  updateRatingComment(ratingRequest: RatingEventModel) {
    this.issueManagementService.updateRatingIssueComment(this.activeIssue, ratingRequest.entity, ratingRequest.rating).subscribe(result => {
      this.updateData(result);
    })
  }

  /* HELPER */
  updateData(issue: Issue) {
    let index = this.data.findIndex(_issue => _issue.id === issue.id);
    if (index > -1) this.data[index] = issue;
  }
}

import { Component, OnInit } from '@angular/core';
import { IssueManagementService, Issue, IssueManagementStore } from 'src/app/core/issue-management';
import { Router, ActivatedRoute } from '@angular/router';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { Context } from 'src/app/core/shared';

@Component({
  selector: 'pp-issue-management-list',
  templateUrl: './issue-management-list.component.html',
  styleUrls: ['./issue-management-list.component.scss']
})
export class IssueManagementListComponent implements OnInit {

  data: Issue[];
  activeIssue: Issue = new Issue();

  constructor(
    private issueManagmentService: IssueManagementService,
    public issueManagementStore: IssueManagementStore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private p: PrivilegeService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.issueManagmentService.getAllIssues().subscribe(result => {
      console.log(result);
      this.data = result;
    })
  }

  /** LIST */
  opened(issue: Issue) {
    this.activeIssue = issue;
  }

  closed(issue: Issue) {
    // IF open issue gets closed again -> comments list hide
    if (this.activeIssue.id === issue.id) this.activeIssue = new Issue();
  }

  /** NAVIGATION */
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
}

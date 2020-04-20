import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue, IssueManagementService } from '../../issue-management.service';

@Component({
  selector: 'pp-issue-management-home-detail',
  templateUrl: './issue-management-home-detail.component.html',
  styleUrls: ['./issue-management-home-detail.component.scss']
})
export class IssueManagementHomeDetailComponent implements OnInit {

  @Input() issue: Issue;
  @Output() changed = new EventEmitter<boolean>();

  public disabled = true;

  // JavaScript passes Ojbects via reference
  private name: string;
  private description: string;

  constructor(
    private issueManagementService: IssueManagementService,
  ) {
  }

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

}
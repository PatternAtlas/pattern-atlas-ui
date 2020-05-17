import { Component, OnInit } from '@angular/core';
import { Issue, IssueManagementService } from '../issue-management.service';
import { IssueCreateDialogComponent } from '../issue-create-dialog/issue-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pp-issue-management-list',
  templateUrl: './issue-management-list.component.html',
  styleUrls: ['./issue-management-list.component.scss']
})
export class IssueManagementListComponent implements OnInit {

  data: Issue[];
  issueDetail: Issue;

  constructor(
    private issueManagmentService: IssueManagementService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  toggleDetail(issueDetail: Issue) {
    this.issueDetail = issueDetail;
  }

  getAll() {
    this.issueManagmentService.getAllIssues().subscribe(result => {
      console.log(result);
      this.data = result;
    })
  }

  new(): void {
    console.log('New Issue');
    const dialogRef = this.dialog.open(IssueCreateDialogComponent, {
      width: '500px',
      data: { name: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.issueManagmentService.createIssue(result).subscribe(result => {
          console.log('Created Issue: ', result);
         this.getAll();
        })
      }
    });
  }

  change() {
    console.log(event);
    this.getAll();
  }

}
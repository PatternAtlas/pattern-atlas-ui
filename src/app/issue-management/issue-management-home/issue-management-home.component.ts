import { Component, OnInit } from '@angular/core';
import { Issue, IssueManagementService } from '../issue-management.service';
import { IssueCreateDialogComponent } from '../issue-create-dialog/issue-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pp-issue-management-home',
  templateUrl: './issue-management-home.component.html',
  styleUrls: ['./issue-management-home.component.scss']
})
export class IssueManagementHomeComponent implements OnInit {

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
      result.forEach(val => this.data.push(val));
      result.forEach(val => this.data.push(val));
      result.forEach(val => this.data.push(val));
      result.forEach(val => this.data.push(val));
      result.forEach(val => this.data.push(val));
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
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RoleModel, UserService, UserRole, PrivilegeModel, RoleModelRequest } from 'src/app/core/user-management';
import { IssueManagementService, Issue, IssueManagementStore } from 'src/app/core/issue-management';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pp-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorManagementListComponent implements OnInit {

  dataSource: PrivilegeModel[] = [];
  roles: RoleModel[];
  displayedColumns: string[] = ['PRIVILEGE'];
  issue: Issue;

  constructor(
    private userService: UserService,
    public issueManagementStore: IssueManagementStore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.issueManagementStore.issue.subscribe(_issue => {
      if (_issue) {
        this.issue = _issue;

        this.userService.getAllPrivilegesFromEntity(this.issue.id).subscribe(privileges => {
          this.dataSource = privileges;
        });
        this.userService.getAllRolesFromEntity(this.issue.id).subscribe(result => {
          this.roles = result;
          this.roles.forEach(role => this.displayedColumns.push(role.name));
        });
      }
    });
  }

  change(checkbox: MatCheckboxChange, privilege: PrivilegeModel, role: RoleModel) {
    this.userService.updateUserRole(role, privilege, new RoleModelRequest(checkbox.checked)).subscribe(result => {
      if (result) {
        const index = this.roles.indexOf(role);
        if (index > -1) this.roles.splice(index, 1, result);
      }
    });
  }

  trackByFn(index, item) {
    return item.id; // or item.id
  }

  trimId(name: string) {
    return name.substring(0, name.length - 37); // Length of UUIDs: 36 + 1 for last underscore
  }

}

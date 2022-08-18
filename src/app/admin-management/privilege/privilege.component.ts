import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { RoleModel, UserService, PrivilegeModel, RoleModelRequest } from 'src/app/core/user-management';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../core/component/confirm-dialog/confirm-dialog.component';

export type PrivilegeType = 'platform' | 'author';

@Component({
  selector: 'pp-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss'],
})
export class PrivilegeComponent implements OnInit {

  @Input() privilegeType: PrivilegeType;

  displayedColumns: string[] = ['PRIVILEGE'];
  dataSource: PrivilegeModel[] = [];
  roles: RoleModel[];


  constructor(
    private userService: UserService,
    private ref: ChangeDetectorRef,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.privilegeType == 'platform') {
      this.userService.getAllPlatformPrivileges().subscribe(result => {
        this.dataSource = result;
      });
      this.userService.getAllPlatformRoles().subscribe(result => {
        this.roles = result;
        this.roles.forEach(role => this.displayedColumns.push(role.name));
      });
    } else if (this.privilegeType == 'author') {
      this.userService.getAllDefaultAuthorPrivileges().subscribe(result => {
        this.dataSource = result;
      });
      this.userService.getAllAuthorRoles().subscribe(result => {
        this.roles = result;
        this.roles.forEach(role => this.displayedColumns.push(role.name));
      });
    }
  }

  updateLocalCopyOfRoles(role: RoleModel, updatedRole?: RoleModel) {
    if (updatedRole) {
      const index = this.roles.indexOf(role);
      if (index > -1) this.roles.splice(index, 1, updatedRole);
    }
  }

  change(checkbox: MatCheckboxChange, privilege: PrivilegeModel, role: RoleModel) {
    if (this.privilegeType == 'platform') {
      this.userService.updateUserRole(role, privilege, new RoleModelRequest(checkbox.checked)).subscribe(result => {
        this.updateLocalCopyOfRoles(role, result)
      })
    } else if (this.privilegeType == 'author') {
      this.matDialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Update existing roles?',
          text: 'Do you also want to update all existing resource specific roles and privileges for ' + role.name + ' and ' + privilege.name + '?',
          noButton: true
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          // "Yes" button was clicked: update existing privileges
          this.userService.updateUserRole(role, privilege, new RoleModelRequest(checkbox.checked)).subscribe(result => {
            this.updateLocalCopyOfRoles(role, result)
          })
          this.userService.updateAllResourceSpecificUserRoles(role, privilege, new RoleModelRequest(checkbox.checked)).subscribe();
        } else if (result == null) {
          // "Cancel" button was clicked: revert changes to updated privilege
          checkbox.source.checked = !checkbox.checked;  // revert the changed checked state
        }
        // Otherwise result == false - "No" button was clicked: do not update existing privileges but save change
      });
    }
  }

  trackByFn(index, item) {
    return item.id; // or item.id
  }
}

import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { RoleModel, UserService, UserRole, PrivilegeModel, RoleModelRequest } from 'src/app/core/user-management';
import { Privilege } from 'src/app/core/user-management/_models/privilege.enum';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'pp-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivilegeComponent implements OnInit {

  privileges: string[] = [];

  displayedColumns: string[] = ['PRIVILEGE'];
  dataSource: PrivilegeModel[] = [];
  roles: RoleModel[];


  constructor(
    private userService: UserService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.getAllPrivileges().subscribe(result => {
      this.dataSource = result;
      this.ref.detectChanges();
      // this.ref.markForCheck();
    });
    this.userService.getAllRoles().subscribe(result => {
      this.roles = result;
      this.roles.forEach(role => this.displayedColumns.push(role.name));
      this.ref.detectChanges();
      // this.ref.markForCheck();
    });
  }

  change(checkbox: MatCheckboxChange, privilege: PrivilegeModel, role: RoleModel) {
    this.userService.updateUserRole(role, privilege, new RoleModelRequest(checkbox.checked)).subscribe(result => {
      if (result) {
        const index = this.roles.indexOf(role);
        if (index > -1) this.roles.splice(index, 1, result);
      }
    })
  }

  trackByFn(index, item) {
    return item.id; // or item.id
  }
}

import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { RoleModel, UserService, PrivilegeModel, RoleModelRequest } from 'src/app/core/user-management';
import { MatCheckboxChange } from '@angular/material/checkbox';

export enum PrivilegeType {
  platform,
  author
}

@Component({
  selector: 'pp-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivilegeComponent implements OnInit {

  @Input() privilegeType: PrivilegeType;

  displayedColumns: string[] = ['PRIVILEGE'];
  dataSource: PrivilegeModel[] = [];
  roles: RoleModel[];


  constructor(
    private userService: UserService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.privilegeType == PrivilegeType.platform) {
      this.userService.getAllPlatformPrivileges().subscribe(result => {
        this.dataSource = result;
        this.ref.detectChanges();
        // this.ref.markForCheck();
      });
      this.userService.getAllPlatformRoles().subscribe(result => {
        this.roles = result;
        this.roles.forEach(role => this.displayedColumns.push(role.name));
        this.ref.detectChanges();
        // this.ref.markForCheck();
      });
    } else if (this.privilegeType == PrivilegeType.author) {
      this.userService.getAllDefaultAuthorPrivileges().subscribe(result => {
        this.dataSource = result;
        this.ref.detectChanges();
        // this.ref.markForCheck();
      });
      this.userService.getAllAuthorRoles().subscribe(result => {
        this.roles = result;
        this.roles.forEach(role => this.displayedColumns.push(role.name));
        this.ref.detectChanges();
        // this.ref.markForCheck();
      });
    }
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

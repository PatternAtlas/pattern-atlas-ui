import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, PAUser, UserStore, UserRole } from 'src/app/core/user-management';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'pp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource: PAUser[];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminStore: UserStore,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.userService.getAllUsers().subscribe(result => {
      console.log(result);
      this.dataSource = result;
    })
  }

  newUser() {
    let confirmDialog = this.dialog.open(UserDetailComponent, {
      data: new PAUser(UserRole.MEMBER)
    });

    confirmDialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log(result);
        this.getAll();
      }
    });
  }

  editUser(user: PAUser) {
    let confirmDialog = this.dialog.open(UserDetailComponent, {
      data: user
    });

    confirmDialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log(result);
        this.getAll();
      }
    });
  }

  deleteUser(user: PAUser) {
    console.log('delete user: ', user);
    this.userService.deleteUser(user).subscribe(result => {
      console.log(result);
    })
  }

}

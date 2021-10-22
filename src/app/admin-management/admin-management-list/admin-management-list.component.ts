import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PAUser, UserService, UserStore } from 'src/app/core/user-management';

@Component({
  selector: 'pp-admin-management-list',
  templateUrl: './admin-management-list.component.html',
  styleUrls: ['./admin-management-list.component.scss']
})
export class AdminManagementListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'roles', 'actions'];
  dataSource: PAUser[];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminStore: UserStore,
  ) {
  }

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
    console.log('New user');
    this.router.navigate(['admin/create']);
  }

  editUser(user: PAUser) {
    console.log('edit user: ', user);
    this.adminStore.addUser(user);
    this.router.navigate(['admin/edit', user.id]);
  }

  deleteUser(user: PAUser) {
    console.log('delete user: ', user);
    this.userService.deleteUser(user).subscribe(result => {
      console.log(result);
    })
  }

}

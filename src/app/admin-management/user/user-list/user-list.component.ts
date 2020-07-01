import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, PAUser, UserStore } from 'src/app/core/user-management';

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
    console.log('New user');
    this.adminStore.resetUser();
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

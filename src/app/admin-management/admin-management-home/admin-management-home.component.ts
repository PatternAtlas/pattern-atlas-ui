import { Component, OnInit } from '@angular/core';
import { AdminManagementService, PAUser } from '../admin-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminManagementHomeStore } from '../admin-management-home-helper/admin-management-home-store';

@Component({
  selector: 'pp-admin-management-home',
  templateUrl: './admin-management-home.component.html',
  styleUrls: ['./admin-management-home.component.scss']
})
export class AdminManagementHomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'roles', 'actions'];
  dataSource: PAUser[];

  constructor(
    private adminService: AdminManagementService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminStore: AdminManagementHomeStore,
  ) { }

  ngOnInit(): void {
   this.getAll()
  }

  getAll() {
    this.adminService.getAllUsers().subscribe(result => {
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
    this.adminService.deleteUser(user).subscribe(result => {
      console.log(result);
    })
  }

}

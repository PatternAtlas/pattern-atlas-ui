import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user-management';

@Component({
  selector: 'pp-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.scss']
})
export class UserManagementListComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) {
  }

  private data: any;

  ngOnInit(): void {
    this.userService.getUserWithToken().subscribe(result => {
      console.log(result)
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'pp-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.scss']
})
export class UserManagementListComponent implements OnInit {

  constructor(
    private userManagementService: UserManagementService
  ) { }

  private data: any;

  ngOnInit(): void {
    this.userManagementService.getUser().subscribe(result => {
      console.log(result)
    });
  }

}

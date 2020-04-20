import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'pp-user-management-home',
  templateUrl: './user-management-home.component.html',
  styleUrls: ['./user-management-home.component.scss']
})
export class UserManagementHomeComponent implements OnInit {

  constructor(
    private userManagementService: UserManagementService
  ) { }

  private data: any;

  ngOnInit(): void {
    this.userManagementService.getUser().subscribe(result => {
      console.log(result)
    })
  }

}

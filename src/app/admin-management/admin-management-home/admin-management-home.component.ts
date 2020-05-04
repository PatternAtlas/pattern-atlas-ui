import { Component, OnInit } from '@angular/core';
import { AdminManagementService } from '../admin-management.service';

@Component({
  selector: 'pp-admin-management-home',
  templateUrl: './admin-management-home.component.html',
  styleUrls: ['./admin-management-home.component.scss']
})
export class AdminManagementHomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'mail', 'roles'];
  dataSource: any[];

  constructor(
    private adminService: AdminManagementService,
  ) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(result => {
      console.log(result);
      this.dataSource = result;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';

@Component({
  selector: 'pp-developer-management-list',
  templateUrl: './developer-management-list.component.html',
  styleUrls: ['./developer-management-list.component.scss']
})
export class DeveloperManagementListComponent implements OnInit {

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.auth.refreshToken();
  }

}

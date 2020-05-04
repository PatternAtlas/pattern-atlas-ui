import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';

@Component({
  selector: 'pp-developer-management-home',
  templateUrl: './developer-management-home.component.html',
  styleUrls: ['./developer-management-home.component.scss']
})
export class DeveloperManagementHomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  refreshToken() {
    this.authenticationService.refreshToken();
  }

}

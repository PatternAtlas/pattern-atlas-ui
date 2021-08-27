import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './_services/authentication.service';
import { PrivilegeService } from './_services/privilege.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    PrivilegeService
  ]
})
export class AuthenticationModule {
}

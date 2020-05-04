import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './_services/authentication.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }

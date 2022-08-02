import { Component, OnInit } from '@angular/core';
import { UserService, PAUser } from 'src/app/core/user-management';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatePassword } from 'src/app/admin-management/user/user-detail/user-detail.component';
import { Issue } from 'src/app/core/issue-management';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'pp-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user: PAUser;
  oldUser: PAUser;
  passwordForm: FormGroup;

  disabled = true;
  password = false;

  oldPasswordHide = true;
  passwordHide = true;
  confirmPasswordHide = true;

  accountManagementUrl = null;

  constructor(
    private userManagementService: UserService,
    private userFormBuilder: FormBuilder,
    private auth: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.userFormBuilder.group({
      oldPassword: [null],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, {
      validator: ValidatePassword
    }
    );

    this.auth.user.subscribe(_user => {
      if (_user) {
        this.userManagementService.getUser(_user.id).subscribe(result => {
          this.user = result;
        })
      } else {
        console.error('This should not work');
      }
    })

    this.accountManagementUrl = environment['accountManagementUrl']
  }
  /* PASSWORD */
  editPassword() {
    this.password = !this.password;
  }

  updatePassword() {
    this.user.oldPassword = this.passwordForm.get('oldPassword').value;
    this.user.password = this.passwordForm.get('password').value;
    this.userManagementService.updateUser(this.user).subscribe(result => {
      this.cancelPassword();
    });
  }

  cancelPassword() {
    this.password = !this.password;
  }

  /* USER INFO */

  submit() {
    this.userManagementService.updateUser(this.user).subscribe(result => {
      this.user = result;
      this.disabled = true;
    })
  }

  edit() {
    this.oldUser = Object.assign({}, this.user);
    this.disabled = !this.disabled;
  }

  reset() {
    this.user = this.oldUser;
    this.disabled = !this.disabled;
  }

  delete() {
    console.log('delete');
  }

  detailIssue(issue: Issue) {
    this.router.navigate(['issue/detail', issue.name], { state: { data: issue } });
  }
}

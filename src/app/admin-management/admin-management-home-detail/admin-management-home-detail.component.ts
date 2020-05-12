import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { PAUser, AdminManagementService } from '../admin-management.service';
import { AdminManagementHomeStore } from '../admin-management-helper/admin-management-store';
import { UserRole } from 'src/app/app-routing.module';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'pp-admin-management-home-detail',
  templateUrl: './admin-management-home-detail.component.html',
  styleUrls: ['./admin-management-home-detail.component.scss']
})
export class AdminManagementHomeDetailComponent implements OnInit {

  user: PAUser;
  userForm: FormGroup;

  roles: UserRole[] = [UserRole.MEMBER, UserRole.AUTHOR, UserRole.EXPERT, UserRole.LIBRARIAN, UserRole.ADMIN];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userFormBuilder: FormBuilder,
    private adminStore: AdminManagementHomeStore,
    private adminService: AdminManagementService,
  ) { }

  ngOnInit(): void {

    this.adminStore.user.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = {} as PAUser;
        this.user.roles = [UserRole.MEMBER];
      }
      this.createForm()
    })
  }

  createForm() {
    this.userForm = this.userFormBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      userRoles: [this.user.roles],
      password: ['', Validators.required],
      confirmPassword: ['']
    },
      {
        validator: ValidatePassword
      });
  }

  checkPasswords(control: AbstractControl) {
    console.log(control);
    let pass = this.userForm.get('password').value
    let confirmPass = this.userForm.get('confirmPassword').value;
    // this.userForm.get('confirmPassword').setErrors({'incorrect': true});

    return pass === confirmPass ? null : { 'incorrect': true }
  }

  onSubmit() {
    console.log('submit');
    this.user.name = this.userForm.get('name').value;
    this.user.email = this.userForm.get('email').value;
    this.user.roles = this.userForm.get('userRoles').value;
    this.user.password = this.userForm.get('password').value;
    if (this.user.id) {
      this.adminService.updateUser(this.user).subscribe(result => {
        console.log('updateUser: ', result);
      })
    } else {
      this.adminService.createUser(this.user).subscribe(result => {
        console.log(result);
      })
    }
  }

  reset() {
    console.log('resetForm');
    this.createForm()
  }

  exit() {
    this.router.navigateByUrl('admin');
  }

}

export function ValidatePassword(formGroup: FormGroup) {
  console.log(formGroup);
  let pass = formGroup.get('password').value
  let confirmPass = formGroup.get('confirmPassword').value;
  // formGroup.get('confirmPassword').setErrors({'incorrect': true});
  pass === confirmPass ? formGroup.get('confirmPassword').setErrors(null) : formGroup.get('confirmPassword').setErrors({ 'incorrect': true });
  return true;
}


import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { UserStore, UserService, UserRole, PAUser } from 'src/app/core/user-management';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'pp-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: PAUser;
  userForm: FormGroup;

  roles: UserRole[] = [UserRole.MEMBER, UserRole.EXPERT, UserRole.LIBRARIAN, UserRole.ADMIN];

  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PAUser,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userFormBuilder: FormBuilder,
    private userStore: UserStore,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {

    this.user = this.data;
    this.createForm()

  }

  createForm() {
    this.userForm = this.userFormBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.email]],
      userRole: [this.user.role],
      password: [null],
      confirmPassword: [null]
    },
    {
      validator: ValidatePassword
    });
  }

  onSubmit() {
    this.user.name = this.userForm.get('name').value;
    this.user.email = this.userForm.get('email').value;
    this.user.role = this.userForm.get('userRole').value;
    this.user.password = this.userForm.get('password').value;

    let result: Observable<unknown>;

    if (this.user.id) {
      result = this.userService.updateUser(this.user);
    } else {
      result = this.userService.createUser(this.user);
    }
    result.subscribe(result => {
      this.dialogRef.close(true);
    });
  }

  reset() {
    this.createForm()
  }

  exit() {
    this.dialogRef.close();
  }

}

export function ValidatePassword(formGroup: FormGroup) {
  let pass = formGroup.get('password').value
  let confirmPass = formGroup.get('confirmPassword').value;
  pass === confirmPass ? formGroup.get('confirmPassword').setErrors(null) : formGroup.get('confirmPassword').setErrors({ incorrect: true });
  return true;
}


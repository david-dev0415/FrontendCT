import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  userName: any;

  // Form shape
  shapePasswords: FormGroup;

  showPasswordMessageMatches: boolean = true;

  //Icons text
  iconTextCurrentPassword: string;
  iconTextNewPassword: string;
  iconTextConfirmPassword: string;

  // Get the password field type
  currentPasswordType: string;
  newPasswordType: string;
  confirmPasswordType: string;
  passwordType: string;

  constructor(private userService: UserService, private router: Router) {
    this.iconTextCurrentPassword = "visibility";
    this.iconTextNewPassword = "visibility";
    this.iconTextConfirmPassword = "visibility";

    this.currentPasswordType = "password";
    this.newPasswordType = "password";
    this.confirmPasswordType = "password";
    this.passwordType = "password";

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })

    this.formValidator();
  }

  ngOnInit() {

  }

  showPassword(password: any) {
    this.iconChange(password.id);
  }

  iconChange(passwordId: string) {
    switch (passwordId) {
      case "inputCurrentPassword":
        (this.currentPasswordType == "password") ? this.currentPasswordType = "text" : this.currentPasswordType = "password";
        (this.iconTextCurrentPassword == "visibility_off") ? this.iconTextCurrentPassword = "visibility" : this.iconTextCurrentPassword = "visibility_off";
        break;
      case "inputNewPassword":
        (this.newPasswordType == "password") ? this.newPasswordType = "text" : this.newPasswordType = "password";
        (this.iconTextNewPassword == "visibility_off") ? this.iconTextNewPassword = "visibility" : this.iconTextNewPassword = "visibility_off";
        break;
      default:
        (this.confirmPasswordType == "password") ? this.confirmPasswordType = "text" : this.confirmPasswordType = "password";
        (this.iconTextConfirmPassword == "visibility_off") ? this.iconTextConfirmPassword = "visibility" : this.iconTextConfirmPassword = "visibility_off";
        break;
    }
  }

  onSubmit() {
    if (!this.shapePasswords.valid) {
      return;
    }



    let userClaims = this.userService.getUserClaims();
    userClaims.then(value => {
      if (value != null && value.hasOwnProperty("UserName")) {
        let data = null;
        this.userName = value['userName'];
        data = {
          "UserName": this.userName,
          "Password": this.shapePasswords.controls['newPasswordControl'].value,
          "newPassword": this.shapePasswords.controls['newConfirmPasswordControl'].value
        };
        this.userService.editPassword(data).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        )
      }
    }).catch(err => {
      console.log(err);
    })



    // this.userService.editPassword(data)
    // console.log(this.shapePasswords.value);
  }

  formValidator() {
    let shape = this.shapePasswords = new FormGroup({
      'currentPasswordControl': new FormControl('', [Validators.required]),
      'newPasswordControl': new FormControl('', [Validators.required]),
      'newConfirmPasswordControl': new FormControl('', [Validators.required])
    });

    let groupPassword = {
      "newPassword": shape.get('newPasswordControl'),
      "currentPassword": shape.get('newConfirmPasswordControl')
    };

    this.veriyPasswordEquality(groupPassword);
    return shape;
  }

  veriyPasswordEquality(groupPassword: any) {
    let newPassword = groupPassword.newPassword.value,
      confirmPassword = groupPassword.currentPassword.value;
    return newPassword === confirmPassword ? null : { notSame: true }
  }

  showPasswordMessageMatch(newPassword: string, confirmNewPassword: string) {
    if (newPassword.length > 0 && confirmNewPassword.length > 0) {
      if (newPassword === confirmNewPassword) {
        return true;
      }
    }
  }

}

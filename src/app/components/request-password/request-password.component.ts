import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  // showPassword;
  iconText: string;
  passwordType: string;

  constructor() {
    this.iconText = "visibility_off";
    this.passwordType = "password";
  }

  ngOnInit() {
  }

  showPassword() {
    if (this.iconText == "visibility") {
      this.passwordType = "password";
      this.iconText = "visibility_off";
    }

    if (this.iconText == "visibility_off") {
      this.passwordType = "text";
      this.iconText = "visibility";
    }

    // if (this.iconText == "visibility_off") {
    //   this.iconText = "visibility";
    //   this.passwordType = "password";
    // }
  }
}

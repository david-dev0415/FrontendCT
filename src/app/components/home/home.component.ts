import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userClaims: any;
  shapePasswords: FormGroup;
  display = 'none';

  //Icons text
  iconTextCurrentPassword: string;
  iconTextNewPassword: string;
  iconTextConfirmPassword: string;

  // Get the password field type
  currentPasswordType: string;
  newPasswordType: string;
  confirmPasswordType: string;
  passwordType: string;

  // loginCount: number;

  constructor(private router: Router, private userService: UserService, private toastrService: ToastrService) {
    this.userClaims = '';
    this.iconTextCurrentPassword = "visibility_off";
    this.iconTextNewPassword = "visibility_off";
    this.iconTextConfirmPassword = "visibility_off";

    this.currentPasswordType = "password";
    this.newPasswordType = "password";
    this.confirmPasswordType = "password";
    this.passwordType = "password";

    this.getClaims().then(data => {
      this.userClaims = data;

      // Modal: Modificar contraseña      
      if (data['DefaultPassword'] == "1") {
        this.openModal();       
      } 

      if (localStorage.getItem("DefaultPassword") == "0") {
        this.onCloseHandled();       
      }
     
    }).catch(err => {
      console.log(err);
      this.router.navigateByUrl('sign-in');
    });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })

    this.formValidator();

    if (this.userService.roleMatch(['Author'])) {
      // do the operation 
    }
  }

  onSubmit() {
    if (this.shapePasswords.invalid)
      return;

    // Captura de datos
    let data = {
      "UserName": this.userClaims['UserName'],
      "CurrentPassword": this.shapePasswords.controls['currentPasswordControl'].value,
      "newPassword": this.shapePasswords.controls['newPasswordControl'].value,
      "DefaultPassword": this.userClaims['DefaultPassword']
    };

    this.userService.editPassword(data).subscribe(
      res => {
        if (res.hasOwnProperty("Succeeded")) {
          this.toastrService.success('La contraseña fue modificada con éxito.', 'Solicitud correcta');
          setTimeout(() => {
            localStorage.clear();            
            this.router.navigate(['/sign-in']);
            // this.onCloseHandled();
          }, 1000);
          // $( "#success-btn" ).click(function() {
          //   $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
          // });
        } else {
          this.toastrService.warning('La contraseña actual que usted diligenció es incorrecta.', 'Ups!, lo sentimos');
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  async getClaims() {
    try {
      const values = await this.userService.getUserClaims();
      return values;
    }
    catch (err) {
      console.log(err);
    }
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
        (this.newPasswordType == "password") ? this.newPasswordType = "text" : this.newPasswordType = "password";
        (this.iconTextNewPassword == "visibility_off") ? this.iconTextNewPassword = "visibility" : this.iconTextNewPassword = "visibility_off";
        (this.confirmPasswordType == "password") ? this.confirmPasswordType = "text" : this.confirmPasswordType = "password";
        (this.iconTextConfirmPassword == "visibility_off") ? this.iconTextConfirmPassword = "visibility" : this.iconTextConfirmPassword = "visibility_off";
        break;
    }
  }

  showPassword(password: any) {
    this.iconChange(password.id);
  }

  formValidator() {
    let shape = this.shapePasswords = new FormGroup({
      'newPasswordControl': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'currentPasswordControl': new FormControl('', [Validators.required]),      
      'newConfirmPasswordControl': new FormControl('', [Validators.required, , Validators.minLength(6)])
    });

    let groupPassword = {
      "newPassword": shape.get('newPasswordControl'),
      "currentPassword": shape.get('newConfirmPasswordControl')
    };

    this.veriyPasswordEquality(groupPassword);
    return shape;
  }

  showPasswordMessageMatch(newPassword: string, confirmNewPassword: string) {
    if (newPassword.length > 0 && confirmNewPassword.length > 0) {
      if (newPassword === confirmNewPassword) {
        return true;
      }
    }
  }

  veriyPasswordEquality(groupPassword: any) {
    let newPassword = groupPassword.newPassword.value,
      confirmPassword = groupPassword.currentPassword.value;
    return newPassword === confirmPassword ? null : { notSame: true }
  }

  ngOnInit() {
  }

  onCloseHandled() {    
    localStorage.setItem("DefaultPassword", "0");
    this.display = 'none';    
  }

  openModal() {
    this.display = 'block';   
  }


}

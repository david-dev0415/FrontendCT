import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private email;
  private name;
  private lastName;
  private userName: any;
  passwordRequired = false;
  passwordError = false;
  passwordModel: string = "";
  show: boolean = false;
  shape: FormGroup;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private toastService: ToastrService) {
    this.showData();
    this.formValidator();
  }

  ngOnInit() {
  }


  formValidator(values?: any): FormGroup {
    let data = new Array(values);

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element != undefined) {
        this.name = element['FirstName'];
        this.lastName = element['LastName'];
        this.userName = element['UserName'];
        this.email = element['Email'];
      }
    }

    return this.shape = new FormGroup({
      'name': new FormControl(this.name, [Validators.required]),
      'lastname': new FormControl(this.lastName, [Validators.required]),
      'identificationNumber': new FormControl(this.userName, [Validators.required]),
      'mail': new FormControl(this.email, [
        Validators.required,
        Validators.email
      ])
    });
  }

  clearPasswordField() {
    $("#inputPassword").val('');
  }

  showPassword() {
    this.show = !this.show;
  }

  showData() {
    let userClaims = this.userService.getUserClaims(),
      data = null;
    userClaims.then(values => {
      // if (values != null)
      //   this.formValidator(values);
      if (values != null && values.hasOwnProperty("UserName")) {
        this.userName = values['UserName'];
        this.userService.getAccount(this.userName).subscribe(
          res => {
            this.formValidator(res);
          },
          err => {
            console.log(err);
          }
        )
      }
    }).catch(error => {
      this.router.navigate(['/sign-in']);
    });
  }

  onSubmit(password?: any) {
    if (this.passwordModel == "" && password.value.length > 0) {
      this.userService.checkPassword(this.userName, password.value).toPromise().then(check => {
        if (!check) {
          this.passwordError = true;
        } else {
          this.userService.editUser(this.shape.value, password.value).subscribe(
            res => {
              if (res != null) {
                this.toastService.success(`Su usuario ${this.userName} fue modificado con éxito.`, 'Solicitud correcta');
                setTimeout(() => {
                  this.router.navigate(['/home']);                  
                }, 2000);
              }
            },
            err => {
              console.log(err);
              this.toastService.error('Ocurrió un error al enviar la solicitud', 'Ups!, lo sentimos');
            }
          );
        }
  
      }).catch(err => {
        console.log(err);
      });
    } else {
      
    }
  }

}

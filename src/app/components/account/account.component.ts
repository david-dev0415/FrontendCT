import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
// import { IAccountInterface } from './IAccount.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{

  private email;
  private name;
  private lastName;
  private userName;

  show: boolean = false;
  shape: FormGroup;

  constructor(private userService: UserService) {
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

  showPassword() {
    this.show = !this.show;
  }

  showData() {
    let userClaims = this.userService.getUserClaims(),
      data = null;
    // Crear mejor solución para no repetir código al momento de llamar al método formValidator
    userClaims.then(values => {
      if (values != null)
        this.formValidator(values);
    }).catch(error => {
      console.error(error);
    });
  }

  onSubmit() {
    console.log(this.shape);
  }
  

}

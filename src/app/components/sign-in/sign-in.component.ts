import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Input() identificationNumber: string;

  isLoginError: boolean = false;
  shape: FormGroup;

  constructor(private userService: UserService, private router: Router) { 
    this.formValidator();
  }

  ngOnInit() {
    if (localStorage.getItem('userToken') != null) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.userService.userAuthentication(this.shape.get('username').value, this.shape.get('password').value).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('userRoles', data.role);
      this.router.navigate(['/home']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        setTimeout(() => {
          this.isLoginError = false;
        }, 2000);
      });
    // console.log(this.shape.get('username').value);    
  }

  formValidator(): FormGroup {

    /**
     * # Validaciones
     * Utilizar Validators para realizar validaciones
     * 
     * */     

    return this.shape = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
      'password': new FormControl('', [Validators.required])
    });

  }
}

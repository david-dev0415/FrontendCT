import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  shape: FormGroup;

  constructor() { 
    this.formValidator();
  }

  ngOnInit() {
  }


  formValidator(): FormGroup {
    return this.shape = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'identificationNumber': new FormControl('', [Validators.required]),
      'cellPhoneNumber': new FormControl('', [Validators.required]),
      'mail': new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }
}

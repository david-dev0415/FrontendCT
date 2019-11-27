import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User;
  shape: FormGroup;
  roles: any[];
  role: any;

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.formValidator();    
    // this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit() {
    this.resetForm();
    try {
      this.userService.getAllRoles().subscribe(
        (data: any) => {
          data.forEach(obj => obj.selected = true);
          if (data != null) {
            console.log(data)
          }

          this.roles = data;
        }
      );
    } catch (error) {
      this.toastr.error(`Error ${error}`);
    }  
  }

  OnSubmit() {
    // var x = this.roles.filter(x => x.selected).map(y => y.Name);               
    let roles = [this.shape.get('Role').value];
    alert(1)
    this.userService.registerUser(this.shape.value, roles)
      .subscribe((data: any) => {        
        if (data.Succeeded == true) {
          this.resetForm(this.shape);
          this.toastr.success('El registro del usuario fue exitoso!');
        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
  }

  resetForm(form?: FormGroup) {
    if (form != null)
      form.reset();
      this.user = {
        UserName: '',
        Password: '',
        Email: '',
        FirstName: '',
        LastName: '',
        Role: ''
      }
    if (this.roles)
      this.roles.map(x => x.selected = false);
  }

  formValidator(): FormGroup {

    /**
     * # Validaciones
     * Utilizar Validators para realizar validaciones
     * 
     * */
    return this.shape = new FormGroup({
      'UserName': new FormControl('', Validators.required),
      'Password': new FormControl('',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ),
      'Email': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]
      ),
      'FirstName': new FormControl('', Validators.required),
      'LastName': new FormControl('', Validators.required),
      'Role': new FormControl('', Validators.required)    
    });
  }


}

import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontendReports';
  
  userClaims: any;

  constructor(private userService: UserService, private router: Router) {
    // this.userService.getUserClaims().subscribe((data: any) => {
    //   this.userClaims = data;
    // });
  
    // if(this.userService.roleMatch(['Author'])) {
    //   //do the operation
    // }    
    this.userService.getUserClaims().then(data => {      
      this.userClaims = data;    
    }).catch(err => {
      // console.log(err);
      // this.router.navigate(['sign-in']);
    })    
  }
}

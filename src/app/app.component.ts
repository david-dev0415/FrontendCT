import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontendReports';
  
  userClaims: any;

  constructor(private userService: UserService) {
    // this.userService.getUserClaims().subscribe((data: any) => {
    //   this.userClaims = data;
    // });
  
    // if(this.userService.roleMatch(['Author'])) {
    //   //do the operation
    // }    

    this.userService.getUserClaims().then(data => {      
      this.userClaims = data;    
    }).catch(err => {
      console.log(err);
    })    
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userClaims: any;

  constructor(private router: Router, private userService: UserService) { }

  // ngOnInit() {
  //   this.userService.getUserClaims().subscribe((data: any) => {
  //     this.userClaims = data;
  //   });  

  //   if(this.userService.roleMatch(['Author'])) {
  //     // do the operation
  //   }    
  // }

  ngOnInit() {
    this.userService.getUserClaims().then(data => {
      this.userClaims = data;
    })

    if (this.userService.roleMatch(['Author'])) {
      // do the operation
    }
  }


}

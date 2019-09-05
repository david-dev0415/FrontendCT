import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userClaims: any;
  dataLog: any;
  username: any;

  constructor(private userService: UserService, private router: Router) {
    this.userService.getUserClaims().then(data => {
      this.userClaims = data;
      this.username = this.userClaims.UserName;
    }).catch(err => {
      console.log(err);
    });

    if (this.userService.roleMatch(['Author'])) {
      //do the operation
    }

  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/sign-in']);
  }
}

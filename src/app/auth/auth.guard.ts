import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs-observable';
import { UserService } from '../shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('userToken') != null) {
      let roles = next.data["roles"] as Array<string>;
      if (roles) {
        var match = this.userService.roleMatch(roles);
        if (match) return true;
        else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
      else
        return true;
    } else {
      this.userService.getUserClaims().then(data => {
        if (data == null || data == "" || data['Code'] == "401")
          localStorage.clear();
          this.router.navigate(['/sign-in']);
      }).catch(err => {
          localStorage.clear();
        this.router.navigateByUrl('sign-in');
      });

      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}

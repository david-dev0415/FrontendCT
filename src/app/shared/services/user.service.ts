import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  private readonly rootUrl = environment.rootUrl;
  private readonly reqHeaderAuth: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'False' });
  private readonly reqHeaderNoAuth: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });

  constructor(private http: HttpClient, private router: Router) { }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  registerUser(user, roles) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles: roles
    }
    let reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/User/Register', body, { headers: reqHeader });
  }

  editUser(data: any, password: string) {
    const body = {
      UserName: data.identificationNumber,
      Password: password,
      Email: data.mail,
      FirstName: data.name,
      LastName: data.lastname
    }     
    return this.http.put(this.rootUrl + '/api/User/Edit', body);
  }

  editPassword(data: any) {
    const body = {
      UserName: data.UserName,
      CurrentPassword: data.CurrentPassword,
      newPassword: data.newPassword,
      DefaultPassword: data.DefaultPassword
    }
    return this.http.put(this.rootUrl + '/api/User/PutPassword', body);
  }

  getAccount(userName: string) {
    return this.http.get(this.rootUrl + `/api/User/Get/userName${userName}`, { headers: this.reqHeaderAuth });
  }

  userAuthentication(userName: string, password: string) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    return this.http.post(this.rootUrl + '/token', data, { headers: this.reqHeaderNoAuth });
  }

  checkPassword(username: any, password: string) {
    var body = {
      UserName: username,
      Password: password,
      Email: null,
      FirstName: null,
      LastName: null
    }
    // let httpHeaders = new HttpHeaders({''});
    var result = this.http.post(this.rootUrl + '/api/User/CheckPassword', body);    
    return result;
  }

  getUserClaims() {
    try {
      var claims = this.http.get(this.rootUrl + '/api/GetUserClaims').toPromise();
      return claims;
    } catch (Exception) {
      console.log(Exception);
      this.router.navigateByUrl('/forbidden');
    }
  }

  getAllRoles() {
    return this.http.get(this.rootUrl + '/api/GetAllRoles', { headers: this.reqHeaderNoAuth });
  }

  roleMatch(allowedRoles: string[]): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    if (userRoles != null) {
      allowedRoles.forEach(element => {
        if (userRoles.indexOf(element) > -1) {
          isMatch = true;
          return false;
        }
      });
      return isMatch;
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../user.model';
import { environment } from '../../../environments/environment.prod';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

  private readonly rootUrl = environment.rootUrl;
  private readonly reqHeader: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });

  constructor(private http: HttpClient) { }

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

  registerUser(user: User, roles: string[]) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles: roles
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/User/Register', body, { headers: reqHeader });
  }

  getAccount(userName: string) {
    return this.http.get(this.rootUrl + `/api/User/Get/userName${userName}`, { headers: this.reqHeader });
  }

  userAuthentication(userName: string, password: string) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: this.reqHeader });
  }

  getUserClaims() {
    try {
      var claims = this.http.get(this.rootUrl + '/api/GetUserClaims').toPromise();
      return claims;
    } catch (Exception) {
      console.log(Exception);
    }

  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rootUrl + '/api/GetAllRoles', { headers: reqHeader });
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

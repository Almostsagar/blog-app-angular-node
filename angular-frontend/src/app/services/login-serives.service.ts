import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};
@Injectable({
  providedIn: 'root',
})
export class LoginSerivesService {
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', {
      email,
      password
    }, httpOptions);
  }
  logout(){
    // return this.http.post('http://localhost:3000/logout',Headers);
  }
  sup( firstname: any,
    lastname: any,
    email: any,
    password: any,
    cnfpassword: any,
    role: any): Observable<any> {
    return this.http.post('http://localhost:3000/users/add', {
      firstname,
          lastname,
          email,
          password,
          cnfpassword,
          role,
    }, httpOptions);
  }
}

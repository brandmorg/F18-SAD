import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private customersUrl = 'http://localhost:8080/api/users';
  private resetURL = 'http://localhost:8080/api/resetPassword';
  private emailURL = 'http://localhost:8080/api/emailSend';
  private loginUrl = 'http://localhost:8080/api/loginVerify';
  private sessionURL = 'http://localhost:8080/api/checkSession';
  constructor(
    private http: HttpClient
  ) { }
  sendData (username, password): Observable<any> {
    return this.http.post(this.loginUrl, {userName: username, userPassword: password}, httpOptions);
  }
  resetPasswordSend (username): Observable<any> {
    return this.http.post(this.resetURL, {username: username}, httpOptions);
  }
  sendEmail (username): Observable<any> {
    return this.http.post(this.emailURL, {userName: username}, httpOptions);
  }
  getSession (): Observable<any> {
    return this.http.get(this.sessionURL, httpOptions);
  }
}


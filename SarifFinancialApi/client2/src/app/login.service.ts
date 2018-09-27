import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private customersUrl = 'http://localhost:8080/api/users';
  private loginUrl = 'http://localhost:8080/api/loginVerify';
  constructor(
    private http: HttpClient
  ) { }
  sendData (username, password): Observable<any> {
    return this.http.post(this.loginUrl, {userName: username, userPassword: password}, httpOptions);
  }
}


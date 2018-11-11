import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": '*', 
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
   })
};

@Injectable({
  providedIn: 'root'
})
export class UserLogService {
  private log = 'http://localhost:8080/api/log';
  constructor(
    private http: HttpClient
  ) { }



  create(username, actionType): Observable<any> {
    return this.http.post(this.log, {userName: username, actionType: actionType}, httpOptions)
  }

  createAccountLog(username, actionType, newData): Observable<any> {
    return this.http.post(this.log, {userName: username, actionType: actionType, newData: newData}, httpOptions)
  }
  updateAccountLog(username, actionType, prevData, newData): Observable<any> {
    return this.http.post(this.log, {userName: username, actionType: actionType, prevData: prevData, newData: newData}, httpOptions)
  }

  findAll(): Observable<any> {
    return this.http.get(this.log, httpOptions);
  }

  findByType(actionType: string): Observable<any> {
    return this.http.get(`${this.log}/${actionType}`, httpOptions);
  }
}
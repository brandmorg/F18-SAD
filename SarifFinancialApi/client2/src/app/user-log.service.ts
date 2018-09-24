import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  findAll(): Observable<any> {
    return this.http.get(this.log, httpOptions);
  }
}

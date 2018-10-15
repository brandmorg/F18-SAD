import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

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
export class UserService {
  private usersUrl = 'http://localhost:8080/api/users';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  // getUser(userId: number): Observable<User> {
  //   const url = `${this.usersUrl}/${userId}`;
  //   return this.http.get<User>(url);
  // }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}`, httpOptions)
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  deleteUser(user: User | number): Observable<User> {
    const userId = typeof user === 'number' ? user : user.userId;
    const url = `${this.usersUrl}/${userId}`;

    return this.http.delete<User>(url, httpOptions);
  }

  updateUser(user): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.put(this.usersUrl, body, httpOptions);
  }

  
}

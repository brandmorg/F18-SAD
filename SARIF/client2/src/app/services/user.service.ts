import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of,  } from 'rxjs';
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
  private usersSortUrl = 'http://localhost:8080/api/usersSort';
  private compareUserNameURL = 'http://localhost:8080/api/userNameCheck';
  private compareEmailURL = 'http://localhost:8080/api/passwordCheck';
  private getActiveURL = 'http://localhost:8080/api/getActive';
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, httpOptions);
  }

  findAllSort(column, direction, columnSearch, criteria): Observable<User[]> {
    return this.http.post<User[]>(this.usersSortUrl, {column: column, direction: direction, columnSearch: columnSearch,
    criteria: criteria}, httpOptions);
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  // getUser(userId: number): Observable<User> {
  //   const url = `${this.usersUrl}/${userId}`;
  //   return this.http.get<User>(url);
  // }

  getUser(id: number): Observable<any>{
    return this.http.get(`${this.usersUrl}/${id}`, httpOptions);
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

  compareUsername(username): Observable<any>{
    return this.http.post<User>(this.compareUserNameURL, {username: username}, httpOptions);
  }

  compareEmail(email): Observable<any>{
    return this.http.post<User>(this.compareEmailURL, {email: email}, httpOptions);
  }
  //check if user is active
}

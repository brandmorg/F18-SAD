import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoA } from '../chart-of-accounts';
import {User} from '../user';

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
export class CoAService {
  private coaUrl = 'http://localhost:8080/api/chartOfAccounts';  // URL to web api
  private findAccountNameUrl = 'http://localhost:8080/api/chartOfAccounts/account';
  private chartSortUrl = 'http://localhost:8080/api/chartSort';
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<CoA[]> {
    return this.http.get<CoA[]>(this.coaUrl, httpOptions);
  }

  findAllSort(column, direction, columnSearch, criteria): Observable<CoA[]> {
    return this.http.post<CoA[]>(this.chartSortUrl, {column: column, direction: direction, columnSearch: columnSearch,
      criteria: criteria}, httpOptions);
  }

  addAccount(coa: CoA): Observable<CoA> {
    return this.http.post<CoA>(this.coaUrl, coa, httpOptions);
  }

  getAccount(account: number): Observable<any> {
    return this.http.get(`${this.coaUrl}/${account}`, httpOptions);
  }

  updateAccount(account): Observable<any> {
    const body = JSON.stringify(account);
    return this.http.put(this.coaUrl, body, httpOptions);
  }
}

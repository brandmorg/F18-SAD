import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoA } from '../chart-of-accounts';

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
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<CoA[]> {
    return this.http.get<CoA[]>(this.coaUrl, httpOptions);
  }

  addAccount(coa: CoA): Observable<CoA> {
    return this.http.post<CoA>(this.coaUrl, coa, httpOptions);
  }
}

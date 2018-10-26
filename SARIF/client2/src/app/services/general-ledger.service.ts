import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {GeneralLedger} from '../generalLedger'
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
export class GeneralLedgerService {
  private ledgerURL = 'http://localhost:8080/api/generalLedger';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<GeneralLedger[]> {
    return this.http.get<GeneralLedger[]>(this.ledgerURL, httpOptions);
  }

  addLedger(ledger: GeneralLedger): Observable<GeneralLedger> {
    return this.http.post<GeneralLedger>(this.ledgerURL, ledger, httpOptions);
  }
  getLedger(id: number): Observable<any>{
    return this.http.get(`${this.ledgerURL}/${id}`, httpOptions);
  }
}

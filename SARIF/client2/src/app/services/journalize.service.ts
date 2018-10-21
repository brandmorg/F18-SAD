import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Journal } from '../journal';
import { JournalAccount } from '../journalAccount';
import {Observable} from 'rxjs';
import {User} from '../user';
import {CoA} from '../chart-of-accounts';

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
export class JournalizeService {
  private journalUrl = 'http://localhost:8080/api/journal';
  private journalAccountUrl = 'http://localhost:8080/api/journalAccount';

  //'/api/journal'
  //'/api/journalAccount'
  constructor(
    private http: HttpClient
  ) { }

 //operations for Journal
  findAll(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.journalUrl, httpOptions);
  }
  getJournal(id: number): Observable<any>{
    return this.http.get(`${this.journalUrl}/${id}`, httpOptions);
  }
  addJournal(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(this.journalUrl, journal, httpOptions);
  }
  updateJournal(journal): Observable<any> {
    const body = JSON.stringify(journal);
    return this.http.put(this.journalUrl, body, httpOptions);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private loginToggle = new BehaviorSubject(1);
  currentToggle = this.loginToggle.asObservable();
  constructor() { }
  changeToggle(num: number) {
    this.loginToggle.next(num);
  }
}

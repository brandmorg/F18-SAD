import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private loginToggle = new BehaviorSubject(1);
  currentToggle = this.loginToggle.asObservable();

  accountName = '';

  accountRef = '';

  trialBalanceType = '';


  constructor() { }
  changeToggle(num: number) {
    this.loginToggle.next(num);
  }
  setAccount(account: string){
    this.accountName = account;
  }
  getAccount(){
    return this.accountName;
  }
  setReference(ref: string){
    this.accountRef = ref;
  }
  getReference(){
    return this.accountRef;
  }

  setTrialBalance(str: string){
    this.trialBalanceType = str;
  }

  getTrialBalance(){
    return this.trialBalanceType;
  }


}

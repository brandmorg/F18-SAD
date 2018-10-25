import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {CoA} from '../chart-of-accounts';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.css']
})
export class TrialBalanceComponent implements OnInit {
  accounts = [];
  debitTotal = 0;
  creditTotal = 0;

  constructor(
    private cserv: CoAService,
  ) { }

  ngOnInit() {
    this.debitTotal = 0;
    this.creditTotal = 0;
    this.viewAccounts();
    console.log('hello');

  }

  async viewAccounts() {
    let result = await this.cserv.findAllSort('caId','ASC', 'All', null).toPromise();
    this.accounts = result;
    this.totalDebit();
    this.totalCredit();
  }

  totalDebit(){
    for(let acc of this.accounts){
      console.log(acc.currentBalance);
      if(acc.normalSide == 'Debit'){
        this.debitTotal = +this.debitTotal + +acc.currentBalance;
      }
    }
  }
  totalCredit(){
    for(let acc of this.accounts){
      console.log(acc.currentBalance);
      if(acc.normalSide == 'Credit'){
        this.creditTotal = +this.creditTotal + +acc.currentBalance;
      }
    }

  }

}

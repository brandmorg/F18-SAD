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
  accountsArranged = [];
  debitTotal = 0;
  creditTotal = 0;

  assetslist = [];
  liabilitiesList = [];
  equitList = [];
  revenueList = [];
  expensesList = [];

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
    //get list of chart of accounts
    let result = await this.cserv.findAllSort('caId','ASC', 'All', null).toPromise();
    this.accounts = result;
    //arranging accounts by type
    for(let acc of this.accounts){
      if(acc.accountType == 'Assets'){
        this.assetslist.push(acc);
      }
      else if(acc.accountType == 'Liability'){
        this.liabilitiesList.push(acc);
      }
      else if(acc.accountType == 'Equity'){
        this.equitList.push(acc);
      }
      else if(acc.accountType == 'Revenue'){
        this.revenueList.push(acc);
      }
      else{
        this.expensesList.push(acc);
      }
    }
    //put arranged lists into one list

    for(let asset of this.assetslist){
      this.accountsArranged.push(asset);
    }
    for(let liability of this.liabilitiesList){
      this.accountsArranged.push(liability);
    }
    for(let equity of this.equitList){
      this.accountsArranged.push(equity);
    }
    for(let revenue of this.revenueList){
      this.accountsArranged.push(revenue);
    }
    for(let expense of this.expensesList){
      this.accountsArranged.push(expense);
    }




    this.totalDebit();
    this.totalCredit();
  }

  totalDebit(){
    for(let acc of this.accountsArranged){
      console.log(acc.currentBalance);
      if(acc.normalSide == 'Debit'){
        this.debitTotal = +this.debitTotal + +acc.currentBalance;
      }
    }
  }
  totalCredit(){
    for(let acc of this.accountsArranged){
      console.log(acc.currentBalance);
      if(acc.normalSide == 'Credit'){
        this.creditTotal = +this.creditTotal + +acc.currentBalance;
      }
    }

  }

}

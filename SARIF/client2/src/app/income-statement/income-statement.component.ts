import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {SharedDataService} from '../services/shared-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.css']
})
export class IncomeStatementComponent implements OnInit {
  currentDate: Date;
  accounts = [];
  revenueAccounts = [];
  expenseAccounts = [];

  //totals
  totalRevenue = 0;
  totalExpense = 0;

  constructor(
    private cserv: CoAService,
    private data: SharedDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.viewAccounts();
  }
  async viewAccounts() {
    //get list of chart of accounts
    let result = await this.cserv.findAllSort('caId', 'ASC', 'All', null).toPromise();
    this.accounts = result;
    for(let acc of this.accounts){
      if(acc.accountType == 'Revenue'){
        this.revenueAccounts.push(acc);
      }
      else if(acc.accountType == 'Expenses' ){
        this.expenseAccounts.push(acc);
      }else{
        console.log('neither')
      }
    }

    for(let acc of this.revenueAccounts){
      this.totalRevenue = +this.totalRevenue + +acc.currentBalance;
    }

    for(let acc of this.expenseAccounts){
      this.totalExpense = +this.totalExpense + +acc.currentBalance;
    }
  }

}

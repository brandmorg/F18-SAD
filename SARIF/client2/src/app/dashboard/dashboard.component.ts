import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {SharedDataService} from '../services/shared-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  accounts = [];
  assetslist = [];
  liabilityList = [];
  equityList = [];
  currentAssetsList = [];
  currentLiabilitiesList = [];
  revenueAccounts = [];
  expenseAccounts = [];


  //calulation variables
  currentRatio = 0;
  currentAssets = 0;
  currentLiabilites = 0;
  quickRatio = 0;
  inventory = 0;
  returnOnTotalAssets = 0;
  returnOnEquity = 0;
  totalRevenue = 0;
  totalExpense = 0;
  totalAssets = 0;
  totalEquity = 0;
  totalLiabilities = 0;
  netIncome = 0;

  constructor(
    private cserv: CoAService,
    private data: SharedDataService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.viewAccounts();
  }

  async viewAccounts() {
    //get list of chart of accounts
    let result = await this.cserv.findAllSort('caId','ASC', 'All', null).toPromise();
    this.accounts = result;
    console.log(this.accounts);

    for(let acc of this.accounts) {
      if (acc.accountType == 'Assets') {
        this.assetslist.push(acc);
        if (acc.accountSubType == 'Current Assets') {
          this.currentAssetsList.push(acc);
        }
      }
      else if (acc.accountType == 'Liability') {
        this.liabilityList.push(acc);
        if (acc.accountSubType == 'Current Liabilities') {
          this.currentLiabilitiesList.push(acc);

        }
      }
      else if(acc.accountType == 'Revenue'){
        this.revenueAccounts.push(acc);
      }
      else if(acc.accountType == 'Expenses' ){
        this.expenseAccounts.push(acc);
      }
      else if(acc.accountType == 'Equity' ){
        this.equityList.push(acc);
      }
      else{
        console.log('neither')
      }
    }
    console.log(this.assetslist);
    console.log(this.currentAssetsList);
    //get total current Assets
    for(let acc of this.currentAssetsList){
      this.currentAssets = +this.currentAssets + +acc.currentBalance;
    }
    //get total current Liabilities
    for(let acc of this.currentLiabilitiesList){
      this.currentLiabilites = +this.currentLiabilites + +acc.currentBalance;
    }

    for(let acc of this.revenueAccounts){
      this.totalRevenue = +this.totalRevenue + +acc.currentBalance;
    }

    for(let acc of this.expenseAccounts){
      this.totalExpense = +this.totalExpense + +acc.currentBalance;
    }

    for(let acc of this.assetslist){
      this.totalAssets = +this.totalAssets + +acc.currentBalance;
    }
    for(let acc of this.equityList){
      this.totalEquity = +this.totalEquity + +acc.currentBalance;
    }
    this.netIncome = +this.totalRevenue - +this.totalExpense;

    console.log(this.currentAssets);
    console.log(this.currentLiabilites);
    //calculate current ratio
    this.currentRatio = +this.currentAssets / +this.currentLiabilites;
    console.log('current ratio: '+ this.currentRatio);
    //calculate quick ratio
    this.quickRatio = (+this.currentAssets - +this.inventory) / +this.currentLiabilites;
    console.log('quick ratio: '+ this.quickRatio);
    //calculate Return on Total Assets
    this.returnOnTotalAssets = +this.netIncome / +this.totalAssets;

    this.returnOnTotalAssets = parseFloat((+this.returnOnTotalAssets * 100).toFixed(2));
    console.log('return on total assets: '+ this.returnOnTotalAssets);
    //calculate Return on Equity
    this.returnOnEquity = +this.netIncome / +this.totalEquity;

    this.returnOnEquity = parseFloat((+this.returnOnEquity * 100).toFixed(2));
    console.log('return on equity: '+ this.returnOnEquity);


  }

}

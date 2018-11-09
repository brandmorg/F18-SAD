import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {SharedDataService} from '../services/shared-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {

  accounts = [];

  currentAssets = [];
  property_plant_equip = [];
  currentLiabilities = [];
  stockholdersEquity = [];
  currentDate: Date;

  totalCurrentAssets = 0;
  totalPropertynum = 0;
  totalLiabilitnum = 0;

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
      if(acc.accountSubType == 'Current Assets'){
        this.currentAssets.push(acc);
      }
      else if(acc.accountSubType == 'Current Liabilities'){
        this.currentLiabilities.push(acc);
      }
      else if(acc.accountSubType =='Property, Plant, and Equipment'){
        this.property_plant_equip.push(acc);
      }
      else if(acc.accountSubType == "Stocholders' Equity") {
        this.stockholdersEquity.push(acc);
      }
      else {
        console.log('neither');
      }
    }
    this.totalCurrAssets();
    this.totalProperty();
    this.totalLiabilities();
  }

  totalCurrAssets(){
    for(let acc of this.currentAssets){
      this.totalCurrentAssets = +this.totalCurrentAssets + +acc.currentBalance
    }
  }
  totalProperty(){
    for(let acc of this.property_plant_equip){
      this.totalPropertynum = +this.totalPropertynum + +acc.currentBalance
    }
  }
  totalLiabilities(){
    for(let acc of this.currentLiabilities){
      this.totalLiabilitnum = +this.totalLiabilitnum + +acc.currentBalance
    }
  }

}

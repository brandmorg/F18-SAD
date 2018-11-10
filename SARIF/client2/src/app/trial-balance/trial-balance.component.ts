import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {CoA} from '../chart-of-accounts';
import {SharedDataService} from '../services/shared-data.service';
import {Router} from '@angular/router';

declare var jsPDF: any;

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.css']
})
export class TrialBalanceComponent implements OnInit {

  trialTitle = '';

  accounts = [];
  accountsArranged = [];
  debitTotal = 0;
  creditTotal = 0;
  currentDate: Date;

  assetslist = [];
  liabilitiesList = [];
  equitList = [];
  revenueList = [];
  expensesList = [];

  constructor(
    private cserv: CoAService,
    private data: SharedDataService,
    private router: Router,
  ) { }

  ngOnInit(){
    this.trialTitle = this.data.getTrialBalance();
    this.currentDate = new Date();
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
        if(acc.currentBalance < 0){
          this.creditTotal = +this.creditTotal - +acc.currentBalance;
        }
        else {
          this.debitTotal = +this.debitTotal + +acc.currentBalance;
        }
      }
    }
  }
  totalCredit(){
    for(let acc of this.accountsArranged){
      console.log(acc.currentBalance);
      if(acc.normalSide == 'Credit'){
        if(acc.currentBalance < 0){
          this.debitTotal = +this.debitTotal - +acc.currentBalance;
        }
        else {
          this.creditTotal = +this.creditTotal + +acc.currentBalance;
        }
      }
    }

  }

  //route to account ledger
  viewLedger(accountName){
    this.data.setAccount(accountName);
    this.router.navigate(['UserPage/ledger', accountName]);
  }

  convertPDF(){
    let columns = ['Account', 'Number', 'Debit', 'Credit'];
    var doc = new jsPDF('p', 'pt');
    var rows = [];
    for(let acc of this.accountsArranged){


      if(acc.normalSide == 'Debit') {
       let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = [acc.accountName, acc.accountNumber ,num, ' '];
        rows.push(account);
      }
      else{
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = [acc.accountName, acc.accountNumber, ' ', num];
        rows.push(account);
      }
    }
    rows.push([' ', ' ', this.debitTotal, this.creditTotal])
    doc.text(50, 40, this.data.getTrialBalance());

    doc.autoTable(columns, rows, {startY: 60, columnStyles: {
        0: {columnWidth: 350}, 2: {halign: 'right'}, 3: {halign: 'right'}, }});
    doc.save(this.data.getTrialBalance() + '.pdf');
  }

}

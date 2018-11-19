import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {SharedDataService} from '../services/shared-data.service';
import {Router} from '@angular/router';

declare var jsPDF: any;

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

  loss = '';

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
      if(acc.accountType == 'Revenue' && acc.currentBalance != 0){
        this.revenueAccounts.push(acc);
      }
      else if(acc.accountType == 'Expenses' && acc.currentBalance != 0){
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

    if(this.totalRevenue > this.totalExpense){
      this.loss = '(Loss)';
    }
  }

  viewLedger(accountName){
    this.data.setAccount(accountName);
    this.router.navigate(['UserPage/ledger', accountName]);
  }

  convertPDF(){
    let columns = [' ', ' '];
    var doc = new jsPDF('p', 'pt');
    var rows = [];
    rows.push(['Revenues', ' ']);
    for(let acc of this.revenueAccounts){

        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+acc.accountName,num,];
        rows.push(account);
    }
    let num = parseFloat(''+Math.round(this.totalRevenue * 100) / 100).toFixed(2);
    rows.push(['Total Revenues', num]);
    rows.push([' ', ' ']);
    rows.push(['Expenses', ' ']);
    for(let acc of this.expenseAccounts){

      let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
      let account = ['   '+acc.accountName,num,];
      rows.push(account);
    }
    let num2 = parseFloat(''+Math.round(this.totalExpense * 100) / 100).toFixed(2);
    rows.push(['Total Expenses', num2]);
    rows.push([' ', ' ']);
    let num3 = +this.totalRevenue - +this.totalExpense;
    let num4 = parseFloat(''+Math.round(num3 * 100) / 100).toFixed(2);
    rows.push(['Net Income', num4]);





    doc.setFontSize(12);
    doc.text(240, 40, 'Income Statement');
    doc.text(210, 60, 'For the Year Ended ' +this.currentDate.getMonth() +'/'+ this.currentDate.getDate() +'/'+ this.currentDate.getFullYear());

    doc.autoTable(columns, rows, {startY: 68, columnStyles: {
        0: {columnWidth: 350}, 1: {halign: 'right'} }});
    doc.save('Income Statement.pdf');
  }

}

import { Component, OnInit } from '@angular/core';

import {CoAService} from '../services/coa.service';
import {SharedDataService} from '../services/shared-data.service';
import {Router} from '@angular/router';

declare var jsPDF: any;

@Component({
  selector: 'app-retained-earnings',
  templateUrl: './retained-earnings.component.html',
  styleUrls: ['./retained-earnings.component.css']
})
export class RetainedEarningsComponent implements OnInit {


  currentDate: Date;
  accounts = [];
  revenueAccounts = [];
  expenseAccounts = [];

  //totals
  totalRevenue = 0;
  totalExpense = 0;
  netIncome = 0;

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
    this.netIncome = +this.totalRevenue - +this.totalExpense
  }

  convertPDF(){
    let columns = [' ', ' '];
    var doc = new jsPDF('p', 'pt');
    var rows = [];
    let num = parseFloat(''+Math.round(this.netIncome * 100) / 100).toFixed(2);
    rows.push(['Beg Retained Earnings', '$0.00']);
    rows.push(['Add: Net Income', num]);
    rows.push(['Less: Dividends', "0.00"]);
    let num2 = parseFloat(''+Math.round((this.netIncome - 0) * 100) / 100).toFixed(2);
    rows.push(['End Retained Earnings', num2]);



    doc.setFontSize(12);
    doc.text(210, 40, 'Statement of Retained Earnings');
    doc.text(210, 60, 'For the Year Ended ' +this.currentDate.getMonth() +'/'+ this.currentDate.getDate() +'/'+ this.currentDate.getFullYear());


    doc.autoTable(columns, rows, {startY: 68, columnStyles: {
        0: {columnWidth: 350}, 1: {halign: 'right'}}});
    doc.save('Statement of Retained Earnings.pdf');
  }


}


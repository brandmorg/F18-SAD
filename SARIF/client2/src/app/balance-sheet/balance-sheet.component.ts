import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {SharedDataService} from '../services/shared-data.service';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';

declare var jsPDF: any;

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
  otherLiabilities = [];
  stockholdersEquity = [];
  revenueAccounts = [];
  expenseAccounts = [];
  currentDate: Date;

  totalCurrentAssets = 0;
  totalPropertynum = 0;
  totalLiabilitnum = 0;
  totalEquitynum = 0;
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
      if(acc.accountSubType == 'Current Assets' && acc.currentBalance != 0){
        this.currentAssets.push(acc);
      }
      else if(acc.accountType == 'Liability' && acc.accountSubType == 'Current Liabilities' && acc.currentBalance != 0){
        this.currentLiabilities.push(acc);
      }
      else if(acc.accountType == 'Liability' && acc.accountSubType != 'Current Liabilities' && acc.currentBalance != 0){
        this.otherLiabilities.push(acc);
      }
      else if(acc.accountSubType =='Property, Plant, and Equipment' && acc.currentBalance != 0){
        this.property_plant_equip.push(acc);
      }
      else if(acc.accountSubType == "Stocholders' Equity" && acc.currentBalance != 0) {
        this.stockholdersEquity.push(acc);
      }
      else {
        console.log('neither');
      }
    }

   //calculate retained earnings
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
    for(let acc of this.accounts){
      if(acc.accountName == 'Retained Earnings'){
        acc.currentBalance = +this.totalRevenue - +this.totalExpense;
        this.stockholdersEquity.push(acc);
      }

    }
    this.totalCurrAssets();
    this.totalProperty();
    this.totalLiabilities();
    this.totalEquity();
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
    for(let acc of this.otherLiabilities){
      this.totalLiabilitnum = +this.totalLiabilitnum + +acc.currentBalance
    }
  }
  totalEquity(){
    for(let acc of this.stockholdersEquity){
      this.totalEquitynum = +this.totalEquitynum + +acc.currentBalance
    }
  }

  convertNumNegative(num: number){
    if(num < 0){
      return Math.abs(num);
    }
    else {
      return num
    }
  }

  viewLedger(accountName){
    this.data.setAccount(accountName);
    this.router.navigate(['UserPage/ledger', accountName]);
  }

  convertPDF(){
    let columns = [' ', ' ', ' ', ' '];
    var doc = new jsPDF('p', 'pt');
    var rows = [];
    rows.push(['Assets', ' ', ' ']);
    rows.push(['Current Assets', ' ', ' ']);
    for(let acc of this.currentAssets){
      if(acc.normalSide == 'Debit') {
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+ acc.accountName,num, ' '];
        rows.push(account);
      }
      else{
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+ acc.accountName, ' ', num];
        rows.push(account);
      }
    }
    let num8 = parseFloat(''+Math.round(this.totalCurrentAssets * 100) / 100).toFixed(2);
    rows.push(['Current Total Assets', ' ', num8]);
    rows.push(['Property, Plant, & Equipment', ' ', ' ']);
    for(let acc of this.property_plant_equip){
      if(acc.normalSide == 'Debit') {
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+ acc.accountName,num, ' '];
        rows.push(account);
      }
      else{
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+ acc.accountName, ' ', num];
        rows.push(account);
      }
    }
    let num5 = parseFloat(''+Math.round(this.totalPropertynum * 100) / 100).toFixed(2);
    rows.push(['Property, Plant, & Equipment, net', ' ', num5]);
    let num6 = +this.totalCurrentAssets + +this.totalPropertynum;
    let num7 = parseFloat(''+Math.round(num6 * 100) / 100).toFixed(2);
    rows.push(['Total Assets', ' ', num7]);
    rows.push(['Liabilities & Stockholders Equity', ' ', ' ']);
    rows.push(['Liabilities',' ', ' ']);
    rows.push(['Current Liabilities',' ', ' ']);
    for(let acc of this.currentLiabilities){
      if(acc.normalSide == 'Debit') {
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+ acc.accountName,num, ' '];
        rows.push(account);
      }
      else{
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+ acc.accountName, ' ', num];
        rows.push(account);
      }
    }
    for(let acc of this.otherLiabilities){
      if(acc.normalSide == 'Debit') {
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = [acc.accountName,num, ' '];
        rows.push(account);
      }
      else{
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = [acc.accountName, ' ', num];
        rows.push(account);
      }
    }
    let num4 = parseFloat(''+Math.round(this.totalLiabilitnum * 100) / 100).toFixed(2);
    rows.push(['Total Liabilities',' ', num4]);
    rows.push(['Stockholders Equity', ' ', ' ']);
    for(let acc of this.stockholdersEquity){
      if(acc.normalSide == 'Debit') {
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+ acc.accountName,num, ' '];
        rows.push(account);
      }
      else{
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = ['   '+ acc.accountName, ' ', num];
        rows.push(account);
      }
    }
    let num2 = parseFloat(''+Math.round(this.totalEquitynum * 100) / 100).toFixed(2);
    let num22 =  +this.totalEquitynum + this.totalLiabilitnum
    let num3 = parseFloat(''+Math.round(num22 * 100) / 100).toFixed(2);
    rows.push(['Total Stockholders Equity', ' ', num2]);
    rows.push(['Total Liabilites & Stockholders Equity', ' ', num3]);

    doc.setFontSize(12);
    doc.text(240, 40, 'Balance Sheet');
    doc.text(240, 60, 'At ' +this.currentDate.getMonth() +'/'+ this.currentDate.getDate() +'/'+ this.currentDate.getFullYear());

    doc.autoTable(columns, rows, {startY: 68, columnStyles: {
        0: {columnWidth: 350}, 1: {halign: 'right'}, 2: {halign: 'right'}, }});
    doc.save('Balance Sheet.pdf');
  }

}

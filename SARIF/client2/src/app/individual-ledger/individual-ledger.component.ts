import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {SharedDataService } from '../services/shared-data.service';
import { GeneralLedgerService } from '../services/general-ledger.service';
import {CoAService} from '../services/coa.service';
import {CoA} from '../chart-of-accounts';
import { GeneralLedger } from '../generalLedger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-ledger',
  templateUrl: './individual-ledger.component.html',
  styleUrls: ['./individual-ledger.component.css']
})
export class IndividualLedgerComponent implements OnInit {
  account = 'temp';
  currentCoA = new CoA();
  accountList = []; //entire list of approved accounts
  accountList2 = []; //list of specified accounts
  accountListDebitFirst = [];
  isStartDebit = 0;
  total = 0;
  displayTotal = 0;





  constructor(
    private data: SharedDataService,
    private cserv: CoAService,
    private ledgerServ: GeneralLedgerService,
    private coaService: CoAService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isStartDebit = 0;
    this.viewLedger();
      this.getAccount();

  }

  async getAccount(){
    this.accountList = [];
    this.accountList2 = [];
    this.account = this.data.getAccount();
    let result = await this.cserv.getByName(this.account).toPromise();
    this.currentCoA = result;
    console.log(this.currentCoA);
    this.total = this.currentCoA.originalBalance;
    this.displayTotal = this.total;
  }
  async viewLedger() {
    this.ledgerServ.findAll().subscribe( (result) => {
      this.accountList = result;
      for(let acc1 of this.accountList){
        if(acc1.AccountName == this.account){
          this.accountList2.push(acc1);
        }
      }
      console.log(this.accountList2);
      //this.getDebitFirst();
    });

  }
  //this forces first balance to be negative for Credit side accounts, will keep for later
  getDebitFirst(){
    if(this.accountList2[0].CreditAmount != null){
      for(let acc of this.accountList2){
        if(acc.DebitAmount != null){
          let genled = acc;
          this.accountList2.splice(this.accountList2.indexOf(acc), 1);
          this.accountList2.unshift(genled);
          break;
        }
      }
    }
  }
  viewJournal(ref){
    this.data.setReference(ref);
    this.router.navigate(['UserPage/journal_info']);
  }

  calculateTotal(accountID): number{
    let num = 0;
    for(let account of this.accountList2){
      if(account.NormalSide == 'Debit') {

        if (account.DebitAmount != null) {
          if (account.glId != accountID) {
            num = +num + +account.DebitAmount;
          }
          else {
            num = +num + +account.DebitAmount;
            return num;
          }
        }
        else {
          if (account.glId != accountID) {
            num = +num - +account.CreditAmount;
          }
          else {
            num = +num - +account.CreditAmount;
            return num;
          }
        }
      }
      else{
        if (account.DebitAmount != null) {
          if (account.glId != accountID) {
            num = +num - +account.DebitAmount;
          }
          else {
            num = +num - +account.DebitAmount;
            return num;
          }
        }
        else {
          if (account.glId != accountID) {
            num = +num + +account.CreditAmount;
          }
          else {
            num = +num + +account.CreditAmount;
            return num;
          }
        }
      }
    }
  }


}

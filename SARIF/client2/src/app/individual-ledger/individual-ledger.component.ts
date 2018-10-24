import { Component, OnInit } from '@angular/core';
import {SharedDataService } from '../services/shared-data.service';
import { GeneralLedgerService } from '../services/general-ledger.service';

@Component({
  selector: 'app-individual-ledger',
  templateUrl: './individual-ledger.component.html',
  styleUrls: ['./individual-ledger.component.css']
})
export class IndividualLedgerComponent implements OnInit {
  account = 'temp';
  accountList = []; //entire list of approved accounts
  accountList2 = []; //list of specified accounts

  constructor(
    private data: SharedDataService,
    private ledgerServ: GeneralLedgerService
  ) { }

  ngOnInit() {
    this.getAccount();
    this.viewLedger();
  }
  async getAccount(){
    this.accountList = [];
    this.accountList2 = [];
    this.account = this.data.getAccount();
  }
  async viewLedger() {
    let list = await this.ledgerServ.findAll().toPromise();
    this.accountList = list;
    for(let acc1 of this.accountList){
      if(acc1.AccountName == this.account){
        this.accountList2.push(acc1);
      }
    }
  }


}

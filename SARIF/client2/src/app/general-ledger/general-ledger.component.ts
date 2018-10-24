import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css']
})
export class GeneralLedgerComponent implements OnInit {
  accounts = [];

  constructor(
    private router: Router,
    private coaService: CoAService,
    private data: SharedDataService
  ) { }

  ngOnInit() {
    this.viewAccounts();
  }

  viewAccounts() {
    this.coaService.findAll().subscribe(
      (account) => {
        this.accounts = account;
      });
  }

  viewLedger(accountName){
    this.data.setAccount(accountName);
    this.router.navigate(['UserPage/ledger', accountName]);
  }
  stuff(){

  }

}

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

  //current page
  currPage = 1;
  perPage = 10;


  constructor(
    private router: Router,
    private coaService: CoAService,
    private data: SharedDataService
  ) { }

  ngOnInit() {
    //this.viewAccounts();
    this.viewAccountsSort('caId','ASC', 'All', null);
  }

  viewAccounts() {
    this.coaService.findAll().subscribe(
      (account) => {
        this.accounts = account;
      });
  }

  viewAccountsSort(column: string, direction: string, columnSearch: string, criteria: string) {
    this.coaService.findAllSort(column, direction, columnSearch, criteria).subscribe(
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

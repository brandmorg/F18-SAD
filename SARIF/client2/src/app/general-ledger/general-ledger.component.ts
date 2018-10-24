import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';

@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css']
})
export class GeneralLedgerComponent implements OnInit {
  accounts = [];

  constructor(
    private coaService: CoAService,
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
  stuff(){

  }

}

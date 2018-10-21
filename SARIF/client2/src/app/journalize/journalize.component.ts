import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service';
import { JournalizeService} from '../services/journalize.service';
import { Journal } from '../journal';
import { JournalAccount } from '../journalAccount';
import { CoA } from '../chart-of-accounts';
import {CoAService} from '../services/coa.service';
import {NgForm} from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-journalize',
  templateUrl: './journalize.component.html',
  styleUrls: ['./journalize.component.css']
})
export class JournalizeComponent implements OnInit {
  @ViewChild('addJournalForm') public journalForm: NgForm;

  journalNew = new Journal();
  journals = []; //list of journal entries

  journalAccountsDebit = []; //list of Debit journal accounts
  journalAccountsCredit = []; //list of Debit journal accounts

  accounts = [];//list of total accounts
  debitAccounts = [];
  creditAccounts = [];

  criteria= '';

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateField: false
  };

  model: any = {date: {year: 2018, month: 10, day: 9}};


  constructor(
    private coaService: CoAService,
    private journalServ: JournalizeService,
    private comp: AppComponent,
  ) { }

  ngOnInit() {
    this.getAccounts();
    this.viewJournals();
  }

  viewJournals() {
    this.journalServ.findAll().subscribe(
      (journal) => {
        this.journals = journal;
      }
    );
  }
  async getAccounts() {
    this.debitAccounts = [];
    this.creditAccounts = [];
    let result = await this.coaService.findAll().toPromise();
    this.accounts = result;
    console.log("Hello");
    for(let account of this.accounts){
      if(account.normalSide == 'Debit'){
        this.debitAccounts.push(account.accountName);
        console.log("Debit: " + account.accountName)
      }
      else{
        this.creditAccounts.push(account.accountName);
        console.log("Credit: " + account.accountName)
      }
    }
  }


  openCreateJournal() {
    this.loadAccountInput();
    let modal = document.getElementById("createJournalEntry");
    modal.style.display = "block";
  }
 //creates new starting array for inputs in create form
  loadAccountInput(){
    this.journalAccountsDebit[0] = new JournalAccount();
    this.journalAccountsCredit[0] = new JournalAccount();
  }

  close() {
    let modal = document.getElementById("createJournalEntry");
    modal.style.display = "none";
    this.journalForm.reset();

  }

  async submit(){
    this.journalNew.Date = new Date();
    this.journalNew.Date.setFullYear(this.model.date.year, this.model.date.month -1, this.model.date.day);
    this.journalNew.CreatedBy = this.comp.getUserName();
    this.journalNew.Reference = this.makeRandomRef();
    console.log(this.journalNew.Date);
    let response = await this.journalServ.addJournal(this.journalNew).toPromise();
    this.viewJournals();
    console.log(response);
    this.close();
  }
  //create a random set of characters for reference
  makeRandomRef(){
    let text = "";
    let poss = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 7; i++)
      text += poss.charAt(Math.floor(Math.random() * poss.length));

    return text;
  }



  stuff(){

  }

}

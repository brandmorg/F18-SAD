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
  @ViewChild('journalAccountAddTable') public accountsTable: NgForm;

  journalNew = new Journal();
  journals = []; //list of journal entries

  journalAccountsDebit = []; //list of Debit journal accounts
  journalAccountsCredit = []; //list of Debit journal accounts

  accounts = [];//list of total accounts
  debitAccounts = [];
  creditAccounts = [];
  totalDebit: number = 0.00;
  totalCredit: number = 0.00;

  criteria= '';

  //error variables
  fieldsFilled = 0;
  fieldsFilled2 = 0;
  totalsmatch = 1;
  repeatDebitAccount = 1;
  repeatCreditAccount = 1;

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
  getDebitTotal(){
    this.totalsmatch = 1;
    this.totalDebit = 0.00;
    for(let account of this.journalAccountsDebit){
      if(isNaN(account.DebitAmount) || account.DebitAmount == null){

      }
      else{

        this.totalDebit  = +this.totalDebit + +account.DebitAmount;

      }
    }
  }
  getCreditTotal(){
    this.totalsmatch = 1;
    this.totalCredit = 0.00;
    for(let account of this.journalAccountsCredit){
      if(isNaN(account.CreditAmount) || account.CreditAmount == null){

      }
      else{
        this.totalCredit  = +this.totalCredit + +account.CreditAmount;

      }
    }
  }

  checkBothInputs(): number{
    if(this.checkInputExist() == 1 && this.checkInputExist2() == 1){
      return 1;
    }
    else{
      return 0;
    }
  }

  checkInputExist(): number{
    for(let account of this.journalAccountsDebit){
      if(account.AccountName ==undefined || account.DebitAmount==undefined || account.DebitAmount== 0 || isNaN(account.DebitAmount)){
        this.fieldsFilled = 0;
        break;

      }
      else{
        this.fieldsFilled = 1;
      }

    }
    return this.fieldsFilled;

  }
  checkInputExist2(): number{
    for(let account of this.journalAccountsCredit){
      if(account.AccountName ==undefined || account.CreditAmount==undefined || account.CreditAmount== 0 || isNaN(account.CreditAmount)){
       this.fieldsFilled2 = 0;
       break;
      }
      else{
        this.fieldsFilled2 = 1;
      }
    }
    return this.fieldsFilled2
  }

  addDebitInput(){
    let debit = new JournalAccount();
    this.journalAccountsDebit.push(debit);
    console.log(this.journalAccountsDebit[0].AccountName);
    this.checkInputExist();
  }

  addCreditInput(){
    let credit = new JournalAccount();
    this.journalAccountsCredit.push(credit);
    this.checkInputExist2();

  }


  openCreateJournal() {
    this.totalsmatch = 1;
    this.journalAccountsDebit = []; //reset journal accounts
    this.journalAccountsCredit = []; //reset journal accounts
    this.totalDebit = 0;
    this.totalCredit = 0;
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

  removeDebit(index){
    this.checkRepeatDebitAccount();
    if (index > -1) {
      this.journalAccountsDebit.splice(index, 1);
    }

  }
  removeCredit(index){
    this.checkRepeatCreditAccount();
    if (index > -1) {
      this.journalAccountsCredit.splice(index, 1);
    }
  }


  checkRepeatDebitAccount(){
    console.log('repeat');
    for(let acc1 of this.journalAccountsDebit){
      for(let acc2 of this.journalAccountsDebit){
        if(this.journalAccountsDebit.indexOf(acc1) == this.journalAccountsDebit.indexOf(acc2)){
          this.repeatDebitAccount = 1;
        }
        else if(acc1.AccountName == acc2.AccountName){
          this.repeatDebitAccount = 0;
          console.log('Duplicate');
          break;
        }
        else{
          this.repeatDebitAccount = 1;
        }
      }
    }


  }
  checkRepeatCreditAccount(){
    console.log('repeat');
    for(let acc1 of this.journalAccountsCredit){
      for(let acc2 of this.journalAccountsCredit){
        if(this.journalAccountsCredit.indexOf(acc1) == this.journalAccountsCredit.indexOf(acc2)){
          this.repeatCreditAccount = 1;
        }
        else if(acc1.AccountName == acc2.AccountName){
          this.repeatCreditAccount = 0;
          console.log('Duplicate');
          break;
        }
        else{
          this.repeatCreditAccount = 1;
        }
      }
    }

  }


  async submit(){
    if(this.totalDebit != this.totalCredit){
      this.totalsmatch = 0;
    }
    else {
      this.journalNew.Date = new Date();
      this.journalNew.Date.setFullYear(this.model.date.year, this.model.date.month - 1, this.model.date.day);
      this.journalNew.CreatedBy = this.comp.getUserName();
      this.journalNew.Reference = this.makeRandomRef();
      console.log(this.journalNew.Date);
      let response = await this.journalServ.addJournal(this.journalNew).toPromise();
      this.viewJournals();
      console.log(response);
      this.close();
    }
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

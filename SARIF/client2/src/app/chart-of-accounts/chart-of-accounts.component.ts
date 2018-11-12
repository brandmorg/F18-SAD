import { Component, OnInit, ViewChild } from '@angular/core';
import { CoA } from '../chart-of-accounts';
import { AppComponent } from '../app.component';
import { CoAService } from '../services/coa.service';
import { UserLogService } from '../services/user-log.service';
import {NgForm} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})
export class ChartOfAccountsComponent implements OnInit {
  @ViewChild('addAccountForm') public accountForm: NgForm;
  @ViewChild('editAccountForm') public editForm: NgForm;
  CoA = new CoA();
  editCoA = new CoA();
  accounts = [];
  accountData = new CoA();
  prevData = new CoA();
  accountId: number;
  temp = [];
//input data for search and sort
  column = 'caId';  //sort column
  columnSearch = 'all'; //column that will be searched
  criteria = ''; //search query

  accountCheck = new CoA();

  //variables to indicate conditions are met
  accountNameExist = 1;
  accountNumberExist = 1;
  numberHasDecimal = 1;

  //set user access
  access = 0;

  //number of accounts listed on a page at a time
  quantity = 10;
  //current page
  currPage = 1;

//currencyMask
  private currencyMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    //thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: null,
    requireDecimal: false,
    precision: 2,
    allowNegative: false,
    allowLeadingZeroes: false
  });


  constructor(
    private coaService: CoAService,
    private logData: UserLogService,
    private comp: AppComponent,
  ) { }

  ngOnInit() {
    this.onOpened();
    this.viewAccountsSort('caId','ASC', 'All', null);
    //this.viewAccounts();


    //Closes modal when user clicks outside of modal
    window.onclick = function (event) {
      let createAccountModal = document.getElementById("createAccountModal");
      if (event.target == createAccountModal) {
        createAccountModal.style.display = "none";
      }
      let editAccountModal = document.getElementById("editAccountModal");
      if (event.target == editAccountModal) {
        editAccountModal.style.display = "none";
      }
    };
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

  //sets user access
  onOpened() {
    if(this.comp.getRole() === 'admin'){
      this.access = 1;
    }
    else if(this.comp.getRole() === 'manager') {
      this.access = 2;
    }
    else{
      this.access = 3;
    }
  }

  //Opens modal
  createAccount() {
    this.numberHasDecimal = 1;
    let modal = document.getElementById("createAccountModal");
    modal.style.display = "block";
  }

  submit() {
    this.CoA.createdBy = this.comp.getUserName();
    //Check to see if account number is a number
    if (isNaN(this.CoA.accountNumber)) {
      return;
    }
    ;
    //Check to see if account balance is a number
    if (isNaN(this.CoA.originalBalance)) {
      return;
    }
    ;
    //Set asset and revenue account types to normal side debit
    if (this.CoA.accountType == "Assets" || this.CoA.accountType == "Expenses") {
      this.CoA.normalSide = "Debit";
    }
    else {
      this.CoA.normalSide = "Credit";
    }
    //current balance may be set to 0 but this is not confirmed
    //Set the current balance to 0
    this.CoA.currentBalance = 0;

    this.editCoA = this.CoA;

    //Check to see if another account exists with same number or name
    if (this.numberHasDecimal == 2) {
      console.log('cannot continue');
    }
    else {
      this.coaService.findAll().subscribe(
        (account) => {
          this.temp = account;
          for (var i = 0; i < this.temp.length; i++) {
            //Check for account name
            if (this.temp[i].accountName == this.CoA.accountName) {
              return;
            }
            //Check for account number
            if (this.temp[i].accountNumber == this.CoA.accountNumber) {
              return;
            }
          }
          //If account name and number not found, create the account
          this.CoA.accountName = this.CoA.accountName.charAt(0).toLocaleUpperCase() + this.CoA.accountName.substr(1);
          this.CoA.accountName = this.CoA.accountName.replace(/^\s+|\s+$/g, "");
          this.coaService.addAccount(this.CoA)
            .subscribe(() => {
              let accountDataString = JSON.stringify(this.CoA);
              this.logData.createAccountLog(this.comp.getUserName(), "Account created", accountDataString).subscribe();
              //Close modal
              let modal = document.getElementById("createAccountModal");
              modal.style.display = "none";
              this.accountForm.reset();
              this.viewAccountsSort(this.column, 'ASC', this.columnSearch, this.criteria);
            });
        });
    }
  }

  //Closes modal after clicking on cancel in modal
  close() {
    let modal = document.getElementById("createAccountModal");
    modal.style.display = "none";
    this.accountForm.reset();

  }
  close2(){
    let editModal = document.getElementById("editAccountModal");
    editModal.style.display = "none";
    this.editForm.reset();
  }


  //Get account info to edit and load modal
  getAccount(id: number) {
    this.numberHasDecimal = 1;
    this.accountId = +id;
    this.coaService.getAccount(this.accountId)
      .subscribe((account) => {
        this.accountData = account;
        this.editCoA = account;
      });
    let modal = document.getElementById("editAccountModal");
    modal.style.display = "block";
  }

  submitEdit() {
    var prevDataString = "";
    this.coaService.getByName(this.editCoA.accountName)
    .subscribe((account) => {
      this.prevData = account;
      prevDataString = JSON.stringify(account);
    })
    console.log(this.prevData);
    
    if ((this.editCoA.accountNumber != null) && isNaN(this.editCoA.accountNumber)) {
      return window.alert("Enter a number for account number");
    };
    if ((this.editCoA.originalBalance != null) && isNaN(this.editCoA.originalBalance)) {
      return window.alert("Enter a number for the balance");
    }

    //Set the account Id correctly to chosen account
    this.editCoA.caId = this.accountId;

    console.log('previous balance' +this.accountData.currentBalance);
    //Set asset and revenue account types to normal side debit
    if (this.editCoA.accountType == "Assets" || this.editCoA.accountType == "Expenses") {
      this.editCoA.normalSide = "Debit";
    }
    else {
      this.editCoA.normalSide = "Credit";
    }
    //--Code here isnt correct
        //Reset current balance to new orignal balance
        //this.editCoA.currentBalance = this.editCoA.originalBalance;

    //Check to see if another account exists with same number or name
    //If account name and number not found, create the account
    this.editCoA.currentBalance = this.accountData.currentBalance;
    if(this.numberHasDecimal == 2) {
      console.log('decimal required');
    }
    else {
      this.editCoA.accountName = this.editCoA.accountName.charAt(0).toLocaleUpperCase() + this.editCoA.accountName.substr(1);
      this.editCoA.accountName = this.editCoA.accountName.replace(/^\s+|\s+$/g, "");
      console.log('edit made');
      this.coaService.updateAccount(this.editCoA)
        .subscribe(() => {
          var newDataString = JSON.stringify(this.editCoA);
          this.logData.updateAccountLog(this.comp.getUserName(), 'Account updated', prevDataString, newDataString).subscribe();
          let modal = document.getElementById("editAccountModal");
          modal.style.display = "none";
          this.viewAccountsSort(this.column, 'ASC', this.columnSearch, this.criteria);
        });
    }
  }

  async compareAccountNameUpdate(event){
    this.editCoA.accountName = event;
    await this.getOriginalAccountID(this.editCoA.caId);
    if(this.editCoA.accountName == this.accountCheck.accountName){
      this.accountNameExist = 1;
      console.log("worked");
    }
    else {
      this.coaService.compareAccountName(this.editCoA.accountName).subscribe(response => {
        console.log("button changed");
        this.accountNameExist = response;
        console.log(this.accountNameExist);
      });
    }
  }

  async compareAccountNumberUpdate(event){
    if(isNaN(event) || event == "") {
      console.log("not a number");
      this.accountNumberExist = 3;
    }else {
      this.editCoA.accountNumber = event;
      await this.getOriginalAccountID(this.editCoA.caId);
      if (this.editCoA.accountNumber == this.accountCheck.accountNumber) {
        this.accountNumberExist = 1;
        console.log("worked");
      }
      else {
        this.coaService.compareAccountNumber(this.editCoA.accountNumber).subscribe(response => {
          console.log("button changed");
          this.accountNumberExist = response;
          console.log(this.accountNumberExist);
        });
      }
    }
  }

  //gets original account info to compare for update page
  async getOriginalAccountID(id: number) {
    this.accountId = id;
    let response = await this.coaService.getAccount(this.accountId).toPromise();
    this.accountCheck = response;
  }


  resetUpdate() {
    this.coaService.getAccount(this.editCoA.caId)
      .subscribe(user => {
          this.editCoA = user;
          this.accountCheck = user;
        }
      );
  }

  isNegativeNumber(accountNumber) {
    return (accountNumber < 0);
  }
}


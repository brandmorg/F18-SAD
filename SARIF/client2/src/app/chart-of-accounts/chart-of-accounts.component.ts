import { Component, OnInit } from '@angular/core';
import { CoA } from '../chart-of-accounts';
import { AppComponent } from '../app.component';
import { CoAService } from '../services/coa.service';
import { UserLogService } from '../services/user-log.service';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})
export class ChartOfAccountsComponent implements OnInit {
  CoA = new CoA();
  editCoA = new CoA();
  accounts = [];
  accountData = [];
  accountId: number;
  temp = [];
  x: boolean;

  constructor(
    private coaService: CoAService,
    private logData: UserLogService,
    private comp: AppComponent,
  ) { }

  ngOnInit() {
    this.coaService.findAll().subscribe(
      (account) => {
        this.accounts = account;
      }
    )


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
    }

  }

  //Opens modal
  createAccount() {
    let modal = document.getElementById("createAccountModal");
    modal.style.display = "block";
  }

  submit() {
    //Check to see if account number is a number
    if (isNaN(this.CoA.accountNumber)) {
      return window.alert("Enter a number for account number");
    };
    //Check to see if account balance is a number
    if (isNaN(this.CoA.originalBalance)) {
      return window.alert("Enter a number for the balance");
    };
    //Set asset and revenue account types to normal side debit
    if (this.CoA.accountType == "Assets" || this.CoA.accountType == "Revenue") {
      this.CoA.normalSide = "Debit";
    }
    else {
      this.CoA.normalSide = "Credit";
    }

    //Set the current balance to the original balance
    this.CoA.currentBalance = this.CoA.originalBalance;
    this.editCoA = this.CoA;
    //Check to see if another account exists with same number or name
    this.coaService.findAll().subscribe(
      (account) => {
        this.temp = account;
        this.x = false;
        for (var i = 0; i < this.temp.length; i++) {
          //Check for account name
          if (this.temp[i].accountName == this.CoA.accountName) {
            return window.alert("Account with same account name found. Enter different account name.");
          }
          //Check for account number
          if (this.temp[i].accountNumber == this.CoA.accountNumber) {
            return window.alert("Account with the same account number found. Enter a different account number.")
          }
        }
        //If account name and number not found, create the account
        this.coaService.addAccount(this.CoA)
          .subscribe(() => {
            this.logData.create(this.comp.getUserName(), 'Created account ' + this.CoA.accountName).subscribe();
            window.alert("Account Created");
            //Close modal
            let modal = document.getElementById("createAccountModal");
            modal.style.display = "none";
            location.reload();
            return;
          });
      })
  }

  //Closes modal after clicking on cancel in modal
  close() {
    let modal = document.getElementById("createAccountModal");
    modal.style.display = "none";
    let editModal = document.getElementById("editAccountModal");
    editModal.style.display = "none";
  }

  //Get account info to edit and load modal
  getAccount(id: number) {
    this.accountId = +id;
    this.coaService.getAccount(this.accountId)
      .subscribe((account) => {
        this.accountData = account;
      });
    let modal = document.getElementById("editAccountModal");
    modal.style.display = "block";
  }

  submitEdit() {
    if ((this.editCoA.accountNumber != null) && isNaN(this.editCoA.accountNumber)) {
      return window.alert("Enter a number for account number");
    };
    if ((this.editCoA.originalBalance != null) && isNaN(this.editCoA.originalBalance)) {
      return window.alert("Enter a number for the balance");
    }

    //Set the account Id correctly to chosen account
    this.editCoA.caId = this.accountId;

    //Set asset and revenue account types to normal side debit
    if (this.editCoA.accountType == "Assets" || this.editCoA.accountType == "Revenue") {
      this.editCoA.normalSide = "Debit";
    }
    else {
      this.editCoA.normalSide = "Credit";
    }
    //Reset current balance to new orignal balance
    this.editCoA.currentBalance = this.editCoA.originalBalance;

    //Check to see if another account exists with same number or name
    this.coaService.findAll().subscribe(
      (account) => {
        this.temp = account;
        for (var i = 0; i < this.temp.length; i++) {
          //Check for account name
          if (this.temp[i].accountName == this.editCoA.accountName) {
            console.log("account name found");
            return window.alert("Account with same account name found. Enter different account name.");
          }
          //Check for account number
          if (this.temp[i].accountNumber == this.editCoA.accountNumber) {
            console.log("account number found");
            return window.alert("Account with the same account number found. Enter a different account number.")
          }
        }
        //If account name and number not found, create the account
        console.log('not found');
        this.coaService.updateAccount(this.editCoA)
          .subscribe(() => {
            alert("Account updated");
            console.log(this.editCoA);
            this.logData.create(this.comp.getUserName(), 'Updated account ' + this.editCoA.accountName).subscribe();
            let modal = document.getElementById("editAccountModal");
            modal.style.display = "none";
            location.reload();
            return;
          });
      })
  }
  // search() {
  //   this.coaService.findAll().subscribe(
  //     (account) => {
  //       this.temp = account;
  //       for (var i = 0; i < this.temp.length; i++) {
  //         //Check for account name
  //         if (this.temp[i].accountName == this.search) {
  //           console.log("account name found");
  //           return window.alert("Account with same account name found. Enter different account name.");
  //         }
  //         //Check for account number
  //         if (this.temp[i].accountNumber == this.search) {
  //           console.log("account number found");
  //           return window.alert("Account with the same account number found. Enter a different account number.")
  //         }
  //       }
  //     })
  // }
  sort(n) {
    var table, rows, switching, shouldSwitch, x, y, switchCount = 0;
    table = document.getElementById("Table");
    switching = true;
    // Set the sorting direction to ascending:
    let dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;

      for (var i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchCount++;
      } else {
        if (switchCount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  isNegativeNumber(accountNumber) {
    return (accountNumber < 0);
  }
}

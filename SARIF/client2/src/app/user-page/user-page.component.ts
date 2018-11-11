import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import {AppComponent} from '../app.component';
import { UserLogService } from '../services/user-log.service';
import { UserService } from '../services/user.service';
import {SharedDataService} from '../services/shared-data.service';

@Component({
  providers: [AppComponent],
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  indicator = '';
  access = 1;
  logs = [];
  currentpage = 0;

  dropdownToggle = false;

  constructor(
    private router: Router,
              private loginService: LoginService,
              private comp: AppComponent,
              private logData: UserLogService,
              private userData: UserService,
              private data: SharedDataService,
    ) { }

  ngOnInit() {
    this.onOpened();
  }
  onOpened() {
      this.indicator = this.comp.getUserName();
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

  logOut() {
    this.logData.create(this.comp.getUserName(), 'User Logout').subscribe();
    this.comp.delSession();
    this.router.navigate(['loginHome']);
  }


  viewCoA(){
    this.router.navigate(['UserPage/chartOfAccounts']);
  }
  viewUserList(){
    this.router.navigate(['UserPage/userList']);
  }
  viewLog(){
    this.router.navigate(['UserPage/userLogs']);
  }
  viewHome(){
    this.router.navigate(['UserPage/home']);
  }
  viewJournal(){
    this.router.navigate(['UserPage/journal']);
  }
  viewGLedger(){
    this.router.navigate(['UserPage/generalLedger']);
  }
  viewTrialBalance() {
    this.data.setTrialBalance('Unadjusted Trial Balance');
    this.router.navigate(['UserPage/trial-balance']);
  }
  viewIncomeStatement(){
    this.router.navigate(['UserPage/income_statement']);
  }
  viewRetainedEarnings(){
    this.router.navigate(['UserPage/statement_of_retained_earnings']);
  }
  viewBalanceSheet(){
    this.router.navigate(['UserPage/balance_sheet']);
  }
  viewAdjustedTrialBalance() {
    this.data.setTrialBalance('Adjusted Trial Balance');
    this.router.navigate(['UserPage/adjusted_trial_balance']);
  }
  viewPostClosingTrialBalance() {
    this.data.setTrialBalance('Post Closing Trial Balance');
    this.router.navigate(['UserPage/post_closing_trial_balance']);
  }
  viewDashboard(){
    this.router.navigate(['UserPage/dashboard']);
  }


}

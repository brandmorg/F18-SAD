import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import {AppComponent} from '../app.component';
import { UserLogService } from '../services/user-log.service';
import { UserService } from '../services/user.service';

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

  constructor(private router: Router,
    private loginService: LoginService,
    private comp: AppComponent,
    private logData: UserLogService,
    private userData: UserService,
    ) { }

  ngOnInit() {
    this.onOpened();
  }
  onOpened() {
      this.indicator = this.comp.getUserName();
      if (this.comp.getRole() === 'admin') {
        this.access = 1;
      } else if (this.comp.getRole() === 'manager') {
        this.access = 2;
      } else {
        this.access = 3;
      }
  }

  logOut() {
    this.logData.create(this.comp.getUserName(), 'User Logout').subscribe();
    this.comp.delSession();
    this.router.navigate(['']);
  }

  onLog() {
    this.logData.findAll().subscribe(
      (userLog) => {
        document.getElementById('logTable').hidden = false; // Unhide table after onLog click
        document.getElementById('showUsersTable').hidden = true;
        this.logs = userLog;
      }
    );
  }

  viewCoA() {
    this.currentpage = 1;
  }
  viewUserList() {
    this.currentpage = 2;
  }
  viewLog() {
    this.currentpage = 3;
  }

  viewJournalEntries() {
    this.currentpage = 4;
  }
}

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
  users = [];
  logs = [];
  editUser = [];

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
    this.router.navigate(['']);
  }

  onLog() {
    this.logData.findAll().subscribe(
      (userLog) => {
        document.getElementById("logTable").hidden = false; //Unhide table after onLog click
        document.getElementById("showUsersTable").hidden = true;
        this.logs = userLog;
      }
    )
  }

  viewUsers() {
    this.userData.findAll().subscribe(
      (user) => {
        document.getElementById("logTable").hidden = true; //Unhide table after onLog click
        document.getElementById("showUsersTable").hidden = false;
        this.users = user;
      }
    )
  }

  getUser(id: string) {
    // let id = document.getElementById("userId").;
    let userId = +id;
    this.userData.getUser(userId).subscribe(
      (getEditUser) => {
        this.editUser = getEditUser;
        document.getElementById("editUser").hidden = false; //Unhide table after onLog click
        document.getElementById("showUsersTable").hidden = true;
        this.router.navigate(['user/' + userId]);
      }
    )
  }

  createUser() {
    this.router.navigate(['AddUser']);
  }

  chartOfAccounts() {
    this.router.navigate(['AddAccount'])
  }

  sort(n) {
    var table, rows, switching, shouldSwitch, x, y, switchCount = 0;
    table = document.getElementById("usersTable");
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
}
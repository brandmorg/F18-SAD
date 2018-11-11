import { Component, OnInit } from '@angular/core';
import {UserLogService} from '../services/user-log.service';
import { CoA } from '../chart-of-accounts';
import { Logs } from '../logs';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {
  logs = [];
  newAccountData = new CoA();
  createAccountData = new Logs();
  newAccountData1 = [];

  constructor(
    private logData: UserLogService,
  ) { }

  ngOnInit() {
    this.onLog();
  }

  onLog() {
    this.logData.findAll().subscribe(
      (userLog) => {
        this.logs = userLog;
        this.getNewAccount(userLog);
      }
    );
  }

  getNewAccount(log: any) {
    for (var i = 31; i < 35; i++) {
      var data = JSON.parse(JSON.stringify(log))[i]["newData"];
      console.log(data)
      var innerData = JSON.parse(JSON.stringify(data));
      console.log(innerData);
      this.newAccountData.accountName = data;
      //console.log(this.newAccountData);
    }
  }

}

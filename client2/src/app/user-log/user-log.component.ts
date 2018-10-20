import { Component, OnInit } from '@angular/core';
import {UserLogService} from '../services/user-log.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {
  logs = [];

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
      }
    );
  }

}

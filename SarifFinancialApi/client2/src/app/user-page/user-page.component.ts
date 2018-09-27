import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogService } from '../user-log.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users = [];

  constructor(
    private router: Router,
    private logData: UserLogService
  ) { }

  ngOnInit() {
  }

  onLog() {
    this.logData.findAll().subscribe(
      (user) => {
        document.getElementById("logTable").hidden = false; //Unhide table after onLog click
        this.users = user;
      }
    )
  }
}

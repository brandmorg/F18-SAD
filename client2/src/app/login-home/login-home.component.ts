import { Component, OnInit } from '@angular/core';
import {SharedDataService } from '../services/shared-data.service';
import { LoginComponent } from '../login/login.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css'],
})
export class LoginHomeComponent implements OnInit {
  toggle: number;

  constructor( private data: SharedDataService,
  ) {}

  ngOnInit() {
    this.data.currentToggle.subscribe(num => this.toggle = num);
  }
}

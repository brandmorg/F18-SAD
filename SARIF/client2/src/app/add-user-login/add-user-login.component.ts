import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { UserLogService } from '../services/user-log.service';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';
import {SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-add-user-login',
  templateUrl: './add-user-login.component.html',
  styleUrls: ['./add-user-login.component.css']
})
export class AddUserLoginComponent implements OnInit {

  user = new User();
  submitted = false;

  constructor(
    private userService: UserService,
    private location: Location,
    private logData: UserLogService,
    private comp: AppComponent,
    private data: SharedDataService
  ) { }

  ngOnInit() {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  addUser() {
    this.submitted = true;
    this.save();
  }

  goBack(): void {
    this.data.changeToggle(1);
  }

  private save(): void {
    this.user.userName = "[pending]";
    this.user.userPassword = "[pending]";
    this.user.userRole = "accountant";
    this.user.securityQ = "[pending]";
    this.user.securityA = "[pending]";
    this.user.active = 0;
    this.userService.addUser(this.user)
      .subscribe(() => {
        this.logData.create(this.comp.getUserName(), 'Created user ' + this.user.firstName).subscribe();
      });
  }

}

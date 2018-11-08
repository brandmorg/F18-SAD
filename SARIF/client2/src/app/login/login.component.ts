import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogService } from '../services/user-log.service';
import { LoginService } from '../services/login.service';
import { AppComponent } from '../app.component';
import { LoginHomeComponent} from '../login-home/login-home.component';
import { User } from '../user';
import {SharedDataService } from '../services/shared-data.service';

@Component({
  providers: [AppComponent, LoginHomeComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: string;
  username: string;
  notLogged: Boolean = true;
  invalidIndicator = '';
  user: User;
  isActive = 1;


  constructor(
    private router: Router,
    private loginService: LoginService,
    private comp: AppComponent,
    private logData: UserLogService,
    private home: LoginHomeComponent,
    private data: SharedDataService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.sendData(this.username, this.password).subscribe(
      user => {
        this.user = user;
        console.log('Login success, userType = ', this.user.userName);

        if (this.user.userId > 0) {
          this.router.navigate(['UserPage']);
          this.logData.create(this.username, 'User successful login').subscribe();
          this.comp.setSession(this.user.userId, this.user.userName, this.user.userRole, this.user.firstName, this.user.lastName);
          this.isActive = 1;
        }
        else if (this.user.userId === -2) {
          this.isActive = 2;
        }
        else {
          this.invalidIndicator = 'Login failed';
          this.isActive = 1;
          this.notLogged = false;
        }
      }
    );
  }
  // error goes away when changes are put into input
  resetError() {
    this.isActive = 1;
  }

  toggler() {
    this.data.changeToggle(2);

  }

  toggleReset() {
    this.data.changeToggle(3);

  }

}


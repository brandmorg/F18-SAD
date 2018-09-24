import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserLogService } from '../user-log.service';
import { User } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: string;
  username: string;
  invalidIndicator = '';

  constructor(
    private router: Router, private loginService: LoginService,
    private logData: UserLogService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.sendData(this.username, this.password).subscribe(
      (number: number) => {
        console.log('Login success, userType = ', this.username);
        if (number > 0) {
          this.router.navigate(['UserPage', {username: this.username, password: this.password}]);
          //Only log after successful login by user
          this.logData.create(this.username, 'login').subscribe();
        } else {
          this.invalidIndicator = 'Loggin failed';
        }
      }
    );
  }
}


import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  username: string;
  username2: string;
  answer: string;
  resetPage = 1;
  usernameExist = 0;
  answerCorrect = 0;
  response: {exists: number, question: string, answer: string};
  emailResult = '';

  constructor(
    private loginService: LoginService,
    private data: SharedDataService
  ) { }

  ngOnInit() {
  }

  onContinue(){
    this.loginService.resetPasswordSend(this.username).subscribe(response =>{
      this.response = response;
      this.username2 = this.username;
      if(this.response.exists === 0){
        this.usernameExist = 1;
        console.log('error');
      }
      else{
        this.resetPage = 2;
        console.log('enable button');
      }
    });
  }

  sendEmail(){
    this.loginService.sendEmail(this.username).subscribe( response => {
      console.log(response);
      this.emailResult = response;
      this.resetPage = 3;
    });
  }

  onContinue2(){
    if(this.answer !== this.response.answer){
      this.answerCorrect = 1;
    }
    else{
      console.log("password accepted");
    }

  }

  goBack(): void {
    this.data.changeToggle(1);
  }
  goBack2(): void {
    this.resetPage = 1;
  }

}

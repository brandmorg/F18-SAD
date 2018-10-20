import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to Sarif Financial';

selectedFile = null;
  onFileSelector(event) {
     this.selectedFile = event.target.file[0];
  }
  onUpload() {

  }
  constructor(private _cookieService: CookieService,
              private localSt: LocalStorageService, private sessionSt: SessionStorageService) {}

setCookies() {
    this._cookieService.put('test', 'testing cookie');
}
getCookie() {
    alert(this._cookieService.get('test'));
}
delCookies() {
    this._cookieService.remove('test');
}

setSession(id, userName, userRole) {
    this.sessionSt.store('userName', userName);
    this.sessionSt.store('id', id);
    this.sessionSt.store('userRole', userRole);
}
getSession() {
    alert(this.sessionSt.retrieve('logged-in'));
}
getUserName() {
    return this.sessionSt.retrieve('userName');
}
getRole() {
    return this.sessionSt.retrieve('userRole');
  }
delSession() {
    this.sessionSt.clear('userName');
    this.sessionSt.clear('id');
    this.sessionSt.clear('userRole');
}


findAccount(found) {
    this.sessionSt.store('accountName', found);
}
getAccount() {
    return this.sessionSt.retrieve('accountName');
}
delAccount() {
    this.sessionSt.clear('accountName');
}
}

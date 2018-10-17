import {Component, OnInit, ViewChild} from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { UserLogService } from '../services/user-log.service';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';
import {SharedDataService } from '../services/shared-data.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  @ViewChild('addUserForm') public userForm: NgForm;
  @ViewChild('editUserForm') public editForm: NgForm;
  user = new User();
  user2 = new User();
  users = [];
  editUser = [];
  active = [];
  usernameExist = 1;
  emailExist = 1;
  passwordAcceptable = 0;
  passwordError = 0;
  access = 1;
  //for editing users
  userID: number;
  userInfo2 = new User();
  userActive = "sss";
  userActive2 = " ";
  column = 'userID';

  constructor(
    private router: Router,
    private location: Location,
    private logData: UserLogService,
    private comp: AppComponent,
    private data: SharedDataService,
    private userData: UserService,
  ) {
  }
  ngOnInit() {
    this.viewUsersSort('userId', 'ASC');
    this.userAccess();
    }

  viewUsers() {
    this.userData.findAll().subscribe(
      (user) => {
        this.users = user;
      }
    );
  }
  viewUsersSort(column: string, direction: string) {
    this.userData.findAllSort(column, direction).subscribe(
      (user) => {
        this.users = user;
      }
    );
  }

  createUser() {
    let modal = document.getElementById("new_user");
    modal.style.display = "block";
  }

  close() {
    let modal = document.getElementById("new_user");
    modal.style.display = "none";
    this.userForm.reset();

   // this.userInfo = null;
  }

  close2() {
    let editModal = document.getElementById("updateUserModal");
    editModal.style.display = "none";
    this.emailExist = 1;
    this.usernameExist = 1;
    this.passwordError = 0;
    this.passwordAcceptable = 1;
    this.resetUpdate();
  }
  //check if the Username already exists


  compareUserName(event){
    this.user.userName = event;
    this.userData.compareUsername(this.user.userName).subscribe( response => {
      console.log("button changed");
      this.usernameExist = response;
      console.log(this.usernameExist);
    });
  }

  compareUserNameUpdate(event){
    this.user2.userName = event;
    this.getOriginalUserID(this.user2.userId);
      if(this.user2.userName == this.userInfo2.userName){
        this.usernameExist = 1;
        console.log("worked");
      }
      else {
        this.userData.compareUsername(this.user2.userName).subscribe(response => {
          console.log("button changed");
          this.usernameExist = response;
          console.log(this.usernameExist);
        });
      }
  }

//check if the Email already exists
  compareEmail(event){
    this.user.email = event;
    this.userData.compareEmail(this.user.email).subscribe( response => {
      this.emailExist = response;
      console.log(this.emailExist);
    });
  }

  compareEmailUpdate(event){
    this.user2.email = event;
    this.getOriginalUserID(this.user2.userId);
    if(this.user2.email == this.userInfo2.email){
      this.emailExist = 1;
    }
    else {
      this.userData.compareEmail(this.user2.email).subscribe(response => {
        this.emailExist = response;
        console.log(this.userInfo2.email);
        console.log(response);
      });
    }
  }

  submit(): void {
    if(this.passwordAcceptable != 1){
      this.passwordError = 1;
    } else if (this.usernameExist !== 1 || this.emailExist !==1 ){
      console.log("cannot continue");
    } else {
      this.userData.addUser(this.user)
        .subscribe(() => {
          this.viewUsersSort(this.column,'ASC');
          this.close();
          this.userForm.reset();


        });
    }
  }
//submit an edit
  submitEdit(){
    if (this.passwordAcceptable !== 1){
      console.log("no1");
      this.passwordError = 1;
    } else if (this.usernameExist !== 1 || this.emailExist !==1 ){
        console.log("no");
    }
    else {
      if(this.userActive2 === "active"){
        this.user2.active = 1;
      }
      else{
        this.user2.active = 0;
      }
      this.user2.userId = this.userInfo2.userId;
      this.userData.updateUser(this.user2)
        .subscribe(() => {
          this.viewUsersSort(this.column,'ASC');
          this.close2();
          this.passwordError = 0;
          this.passwordAcceptable = 1;
        });
    }
  }

  checkPassword(event){
    this.user.userPassword = event;

    let length = this.user.userPassword.length;
    let result = this.user.userPassword.match(/[0-9]+/g);
    let result2 = this.user.userPassword.match(/[%, #, $, *, &,+]+/g);
    console.log(result);

    if (this.user.userPassword.length >= 8 && result != null && result2 != null){
        console.log('password is good');
        this.passwordAcceptable = 1;
        this.passwordError = 0;

    }
    else{
      console.log('password is weak');
      console.log(length);
      this.passwordAcceptable = 0;
      this.passwordError = 0;
    }
  }

  checkPasswordUpdate(event){
    this.user2.userPassword = event;

    let length = this.user2.userPassword.length;
    let result = this.user2.userPassword.match(/[0-9]+/g);
    let result2 = this.user2.userPassword.match(/[%, #, $, *, &,+]+/g);
    console.log(result);

    if (this.user2.userPassword.length >= 8 && result != null && result2 != null){
      console.log('password is good');
      this.passwordAcceptable = 1;
      this.passwordError = 0;

    }
    else{
      console.log('password is weak');
      console.log(length);
      this.passwordAcceptable = 0;
      this.passwordError = 0;
    }
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
    );
  }

  userAccess(){
    if(this.comp.getRole() === 'admin') {
      this.access = 0;
    }
    else {
      this.access = 1;
    }
  }

  resetUpdate() {
    this.userData.getUser(this.user2.userId)
      .subscribe(user => {
          this.user2 = user;
          this.userInfo2 = user;


          console.log(this.userInfo2.userName);
          console.log(this.user2.userName);

          if(this.user2.active == 0){
            this.userActive = "inactive";
          }
          else{
            this.userActive = "active";
          }
        }
      );
  }

  getOriginalUserID(id: number) {
    this.userID = id;
    this.userData.getUser(this.userID)
      .subscribe(user => {
          this.userInfo2 = user;
        }
      );
  }


  //Get account info to edit and load modal
  getUserInfo(id: number) {
    this.userID = id;
    this.userData.getUser(this.userID)
      .subscribe(user => {
        this.user2 = user;
        this.userInfo2 = user;
        this.passwordError = 0;
        this.passwordAcceptable = 1;

        console.log(this.userInfo2.userName);
        console.log(this.user2.userName);

        if(this.user2.active == 0){
          this.userActive = "inactive";
        }
        else{
          this.userActive = "active";
        }
        let modal = document.getElementById('updateUserModal');
        modal.style.display = 'block';
      }
      );

  }
}


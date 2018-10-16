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
  submitted = false;
  usernameExist = 0;
  emailExist = 0;
  passwordAcceptable = 0;
  passwordError = 0;
  access = 1;
  //for editing users
  userID: number;
  userInfo = new User();
  userActive = "sss";
  userActive2 = " ";
  submitOverride = 1;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location,
    private logData: UserLogService,
    private comp: AppComponent,
    private data: SharedDataService,
    private userData: UserService,
  ) { }
  ngOnInit() {
    this.viewUsers();
    this.userAccess();
    }

  viewUsers() {
    this.userData.findAll().subscribe(
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
    if (this.user2.userName == this.userInfo.userName) {
      this.usernameExist = 1;
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
    this.user.email = event;
    if(this.user2.email == this.userInfo.email){
      this.emailExist = 1;
    }
    else {
      this.userData.compareEmail(this.user.email).subscribe(response => {
        this.emailExist = response;
        console.log(this.emailExist);
      });
    }
  }

  submit(): void {
    if(this.passwordAcceptable != 1){
      this.passwordError = 1;
    } else if (this.usernameExist !== 1 || this.emailExist !==1 ){
      console.log("cannot continue");
    } else {
      this.userService.addUser(this.user)
        .subscribe(() => {
          this.viewUsers();
          this.close();
          this.userForm.reset();

        });
    }
  }

  submitEdit(): void {
    if(this.passwordAcceptable != 1){
      this.passwordError = 1;
    } else if (this.usernameExist !== 1 || this.emailExist !==1 ){
      console.log("cannot continue");
    } else {
      if(this.userActive2 === "active"){
        this.user2.active = 1;
      }
      else{
        this.user2.active = 0;
      }
      this.user2.userId = this.userInfo.userId;
      this.userService.updateUser(this.user2)
        .subscribe(() => {
          this.viewUsers();
          this.close2();
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

  sort(n) {
    var table, rows, switching, shouldSwitch, x, y, switchCount = 0;
    table = document.getElementById("usersTable");
    switching = true;
    // Set the sorting direction to ascending:
    let dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;

      for (var i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchCount++;
      } else {
        if (switchCount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  resetUpdate() {
    this.user2.userName = this.userInfo.userName;
    this.user2.firstName = this.userInfo.firstName;
    this.user2.lastName = this.userInfo.lastName;
    this.user2.userPassword = this.userInfo.userPassword;
    this.user2.email = this.userInfo.email;
    this.user2.securityQ = this.userInfo.securityQ;
    this.user2.securityA = this.userInfo.securityA;
    if(this.userInfo.active == 0){
      this.userActive2 = "inactive"
    }
    else{
      this.userActive2 = "active";
    }
    this.user2.userRole = this.userInfo.userRole;
    this.emailExist = 1;
    this.usernameExist = 1;




  }


  //Get account info to edit and load modal
  getUserInfo(id: number) {
    this.userID = +id;
    this.userData.getUser(this.userID)
      .subscribe((user) => {
        this.userInfo = user;
        this.resetUpdate();
        this.user2 = this.userInfo;
        this.submitOverride = 0;
        if(this.userInfo.active == 0){
          this.userActive = "inactive";
        }
        else{
          this.userActive = "active";
        }
      });
    let modal = document.getElementById('updateUserModal');
    modal.style.display = 'block';


  }
}

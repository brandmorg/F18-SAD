import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserPageComponent } from '../user-page/user-page.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { LoginHomeComponent } from '../login-home/login-home.component';
import { ChartOfAccountsComponent } from '../chart-of-accounts/chart-of-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: LoginHomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'UserPage',
    component: UserPageComponent
  },
  {
    path: 'AddUser',
    component: AddUserComponent
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent
  },
  {
    path: 'AddAccount',
    component: ChartOfAccountsComponent
  },
  {
    path: 'addUser',
    component: AddUserComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginHomeComponent,
  UserPageComponent,
  UserDetailsComponent,
  ChartOfAccountsComponent,
  AddUserComponent,
];

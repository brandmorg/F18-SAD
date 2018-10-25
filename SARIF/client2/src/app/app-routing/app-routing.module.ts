import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserPageComponent } from '../user-page/user-page.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { LoginHomeComponent } from '../login-home/login-home.component';
import { ChartOfAccountsComponent } from '../chart-of-accounts/chart-of-accounts.component';
import { HomeScreenComponent } from '../home-screen/home-screen.component';
import { UserLogComponent } from '../user-log/user-log.component';
import { JournalizeComponent } from '../journalize/journalize.component';
import { TrialBalanceComponent } from '../trial-balance/trial-balance.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/loginHome',
    pathMatch: 'full'
  },
  {
    path: 'loginHome',
    component: LoginHomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'UserPage',
    component: UserPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeScreenComponent
      },
      {
        path: 'userList',
        component: AddUserComponent
      },
      {
        path: 'chartOfAccounts',
        component: ChartOfAccountsComponent
      },
      {
        path: 'userLogs',
        component: UserLogComponent
      },
      {
        path: 'journal',
        component: JournalizeComponent
      },
      {
        path: 'trialBalance',
        component: TrialBalanceComponent
      }
      ]
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent
  },
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
  HomeScreenComponent,
  UserLogComponent
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserPageComponent } from '../user-page/user-page.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { LoginHomeComponent } from '../login-home/login-home.component';
import { ChartOfAccountsComponent } from '../chart-of-accounts/chart-of-accounts.component';
import { HomeScreenComponent } from '../home-screen/home-screen.component';
import { UserLogComponent } from '../user-log/user-log.component';
import { JournalizeComponent } from '../journalize/journalize.component';
import { GeneralLedgerComponent } from '../general-ledger/general-ledger.component';
import { IndividualLedgerComponent } from '../individual-ledger/individual-ledger.component';
import { TrialBalanceComponent } from '../trial-balance/trial-balance.component';
import { IndividualJournalComponent } from '../individual-journal/individual-journal.component';
import { IncomeStatementComponent } from '../income-statement/income-statement.component';
import { RetainedEarningsComponent } from '../retained-earnings/retained-earnings.component';
import { BalanceSheetComponent } from '../balance-sheet/balance-sheet.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


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
        path: 'generalLedger',
        component: GeneralLedgerComponent
      },
      {
        path: 'ledger',
        component: IndividualLedgerComponent
      },
      {
        path: 'ledger/:term',
        component: IndividualLedgerComponent
      },
      {
        path: 'journal_info',
        component: IndividualJournalComponent
      },
      {
        path: 'journal_info/:term',
        component: IndividualJournalComponent
      },
      {
        path: 'trial-balance',
        component: TrialBalanceComponent
      },
      {
        path: 'income_statement',
        component: IncomeStatementComponent
      },
      {
        path: 'statement_of_retained_earnings',
        component: RetainedEarningsComponent
      },
      {
        path: 'balance_sheet',
        component: BalanceSheetComponent
      },
      {
        path: 'adjusted_trial_balance',
        component: TrialBalanceComponent
      },
      {
        path: 'post_closing_trial_balance',
        component: TrialBalanceComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
      ]
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
  ChartOfAccountsComponent,
  AddUserComponent,
  HomeScreenComponent,
  UserLogComponent
];

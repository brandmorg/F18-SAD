import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Ng2Webstorage } from 'ngx-webstorage';
import { MyDatePickerModule } from 'mydatepicker';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginHomeComponent } from './login-home/login-home.component';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserLogComponent } from './user-log/user-log.component';
import { AddUserLoginComponent } from './add-user-login/add-user-login.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { JournalizeComponent } from './journalize/journalize.component';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';
import { IndividualLedgerComponent } from './individual-ledger/individual-ledger.component';
import { TextMaskModule } from 'angular2-text-mask';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';
import { IndividualJournalComponent } from './individual-journal/individual-journal.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeStatementComponent } from './income-statement/income-statement.component';
import { RetainedEarningsComponent } from './retained-earnings/retained-earnings.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    UserPageComponent,
    AddUserComponent,
    LoginHomeComponent,
    ChartOfAccountsComponent,
    ResetPasswordComponent,
    UserLogComponent,
    AddUserLoginComponent,
    HomeScreenComponent,
    JournalizeComponent,
    GeneralLedgerComponent,
    IndividualLedgerComponent,
    TrialBalanceComponent,
    IndividualJournalComponent,
    DashboardComponent,
    IncomeStatementComponent,
    RetainedEarningsComponent,
    BalanceSheetComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    Ng2Webstorage,
    HttpClientModule,
    MyDatePickerModule,
    TextMaskModule,
    NgxPaginationModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

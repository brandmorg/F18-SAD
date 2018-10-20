import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  welcome = '';

  constructor(private comp: AppComponent,) { }

  ngOnInit() {
    this.welcome = 'Welcome ' + this.comp.getFirstName();
  }

}

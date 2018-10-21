import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service';
import { JournalizeService} from '../services/journalize.service';
import { Journal } from '../journal';
import { JournalAccount } from '../journalAccount';
import { CoA } from '../chart-of-accounts';
import {CoAService} from '../services/coa.service';
import {NgForm} from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-journalize',
  templateUrl: './journalize.component.html',
  styleUrls: ['./journalize.component.css']
})
export class JournalizeComponent implements OnInit {
  @ViewChild('addJournalForm') public journalForm: NgForm;

  journalNew = new Journal();
  journals = []; //list of journal entries
  journalAccounts = []; //list of journal accounts
  debitAccounts = [];
  credtAccounts = [];

  criteria= '';

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateField: false
  };

  model: any = {date: {year: 2018, month: 10, day: 9}};


  constructor(
    private coaService: CoAService,
    private journalServ: JournalizeService,
    private comp: AppComponent,
  ) { }

  ngOnInit() {
    this.viewJournals();
  }

  viewJournals() {
    this.journalServ.findAll().subscribe(
      (journal) => {
        this.journals = journal;
      }
    );
  }

  openCreateJournal() {
    let modal = document.getElementById("createJournalEntry");
    modal.style.display = "block";
  }

  close() {
    let modal = document.getElementById("createJournalEntry");
    modal.style.display = "none";
    this.journalForm.reset();

  }

  async submit(){
    this.journalNew.Date = new Date();
    this.journalNew.Date.setFullYear(this.model.date.year, this.model.date.month -1, this.model.date.day);
    this.journalNew.CreatedBy = this.comp.getUserName();
    this.journalNew.Reference = this.makeRandomRef();
    console.log(this.journalNew.Date);
    let response = await this.journalServ.addJournal(this.journalNew).toPromise();
    this.viewJournals();
    console.log(response);
    this.close();
  }

  makeRandomRef(){
    let text = "";
    let poss = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 7; i++)
      text += poss.charAt(Math.floor(Math.random() * poss.length));

    return text;
  }



  stuff(){

  }

}

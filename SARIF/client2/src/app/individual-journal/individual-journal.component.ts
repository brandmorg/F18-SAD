import { Component, OnInit } from '@angular/core';
import {JournalizeService} from '../services/journalize.service';
import {SharedDataService} from '../services/shared-data.service';
import { Journal } from '../journal';
import {JournalAccount} from '../journalAccount';
import {Router} from '@angular/router';

@Component({
  selector: 'app-individual-journal',
  templateUrl: './individual-journal.component.html',
  styleUrls: ['./individual-journal.component.css']
})
export class IndividualJournalComponent implements OnInit {

   thisJournal: Journal;
 
   private journals = [];

  constructor(
    private journalServ: JournalizeService,
    private data: SharedDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.viewJournals();
  }

  viewJournals() {
    this.journalServ.findAll().subscribe(
      (journal) => {
        this.journals = journal;
        let temp = this.data.getReference();
        for(let journ of this.journals){
          if(temp == journ.Reference){
            this.thisJournal = journ;
            break
          }
        }
        console.log(this.journals);
      }
    );
  }

  viewGenJournal(){
    this.router.navigate(['UserPage/journal']);
  }


  getNumberDebits(journalAcc: JournalAccount[]): number{
    let num = 0;
    for(let j of journalAcc){
      if(j.DebitAmount !=null){
        num++;
      }
    }
    return num;

  }

}


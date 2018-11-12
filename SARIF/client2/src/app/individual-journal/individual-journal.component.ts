import { Component, OnInit } from '@angular/core';
import {JournalizeService} from '../services/journalize.service';
import {SharedDataService} from '../services/shared-data.service';
import { Journal } from '../journal';
import {JournalAccount} from '../journalAccount';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  })
};

@Component({
  selector: 'app-individual-journal',
  templateUrl: './individual-journal.component.html',
  styleUrls: ['./individual-journal.component.css']
})
export class IndividualJournalComponent implements OnInit {
  documentInfo = '';
  private fileRetrieve = 'http://localhost:8080/api/retreiveJournalFiles';
   thisJournal: any;
  private journals = [];

  constructor(
    private journalServ: JournalizeService,
    private data: SharedDataService,
    private router: Router,
    private http: HttpClient,
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

  getJournalFile(event: number){
    this.http.post<any>(this.fileRetrieve, {jID: event}, httpOptions).subscribe( result => {
      console.log(result.FileData.data);
      var res = result.FileData.data;
      for(let r of res){
        if(r == 10){
          this.documentInfo = this.documentInfo + '\n';
        }
        else {
          let res2 = String.fromCharCode(r);
          this.documentInfo = this.documentInfo + res2;
        }
      }
      console.log(this.documentInfo);

    });
    var modal = document.getElementById('viewSource');
    modal.style.display = "block";
  }
  closeFile() {
    this.documentInfo = '';
    let modal = document.getElementById("viewSource");
    modal.style.display = "none";
  }

}


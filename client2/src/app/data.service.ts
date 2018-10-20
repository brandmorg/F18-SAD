import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map} from 'rxjs/operators';

@Injectable()
export class DataService {

  uri = 'http://localhost:3000'

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get(`${this.uri}/users`);
  }

}

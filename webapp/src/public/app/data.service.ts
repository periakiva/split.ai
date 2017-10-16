import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  names: string[];
  items: any;

  constructor(private http: Http) { }

  sendData(names: string[], file: File) {
    return this.http.post('/api/submitForm', {
      file,
      names,
    }).map(res => res.json());
  }



}

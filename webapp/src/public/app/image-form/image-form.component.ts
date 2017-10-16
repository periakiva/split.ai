import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { DataService } from '../data.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {

  file: File;
  names: string[];

  constructor(private http: Http, private router: Router, private dataService: DataService) {
    this.names = [];
  }

  ngOnInit() { }

  addNewName(name: string) {
    this.names.push(name);
  }

  removeName(index: number) {
    this.names.splice(index, 1);
  }

  uploadReceipt() {
    console.log('uploading receipt');

    console.log({
      'file': this.file,
      names: this.names
    });

    this.dataService.sendData(this.names, this.file).subscribe(
      data => {
        console.log(data);
        this.dataService.names = data['names'];
        this.dataService.items = data['items'];
        this.router.navigateByUrl('/binning');
      },
      error => {
        console.error(error);
      }
    );
  }

  setFile(event) {
    console.log(event.srcElement.files);
    this.file = event.srcElement.files[0];
    // this.uploadReceipt();
  }

}


import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { GeneralService} from '../../core/service/data/general.service';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.scss']
  })
 
  export class ArchiveComponent implements OnInit {
    array = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.myFunc();
  }

  myFunc() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getArchiveNotesList', token).subscribe(res => {
      console.log(res);
      this.array = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        this.array.push(res['data']['data'][i]);
      }
    }, error => {
      console.log(error);
    })
  }

  get(event) {
    if (event) {
      this.myFunc();
    }
  }
  }
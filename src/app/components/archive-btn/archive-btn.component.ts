import { Component, OnInit,Input } from '@angular/core';
import { HttpService} from '../../service/http/http.service'
import { MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-archive-btn',
  templateUrl: './archive-btn.component.html',
  styleUrls: ['./archive-btn.component.css']
})
export class ArchiveBtnComponent implements OnInit {
  body={
  "isArchived":true,
  "noteIdList":[]
  }
  records={};
  constructor(private httpService: HttpService,
  public snackBar: MatSnackBar) { }
  @Input() noteDetails;
  
  ngOnInit() {
  }
  
  archive(id) {
  var token = localStorage.getItem('token');
  this.body={
  "isArchived": true,
  "noteIdList": [this.noteDetails.id]
  }
  this.records = this.httpService.httpArchiveNote('notes/archiveNotes',this.body, token).subscribe(result => {
  this.snackBar.open('Note archived', 'Successfully', {
  duration: 3000,
  });
  
  }, error => {
  console.log(error);
  console.log(this.noteDetails.id);
  this.snackBar.open('Note archiving', 'Failed', {
  duration: 3000,
  });
  });
  }
  }
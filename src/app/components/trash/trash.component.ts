import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../service/http/http.service'


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})

export class TrashComponent implements OnInit {
  records = {};
  notes = [];
  delete={};
  

  body={
    "isDeleted":true,
    "noteIdList":[]
  }
  @Input() noteDetails;

 

  constructor(private httpService: HttpService) { }
  @Input() notesArray;
  @Output() deleteForever=new EventEmitter()
  ngOnInit() {
    this.getDelNotes();
    
    
  }
  getDelNotes() {

    var token = localStorage.getItem('token');
    this.records = this.httpService.httpGetNotes('notes/getTrashNotesList', token).subscribe(result => {
      console.log(result);
      for (var i = result['data']['data'].length - 1; i > 0; i--) {

        this.notes.push(result['data']['data'][i])

      }
      console.log(this.notes);
      this.deleteForever.emit()

    }, error => {
      console.log(error);
    });
  }
  delForever(id){
    this.body={
      "isDeleted": false,
      "noteIdList": [id]
      }
       var token=localStorage.getItem('token');
    this.httpService.httpPostdeleteForever('notes/deleteForeverNotes',this.body,token).subscribe(res=>{
      console.log(res);
      this.deleteForever.emit();
      
    },error=>{
       console.log(error);

    })

    } 
    restore(id){
      this.body={
        "isDeleted":false,
        "noteIdList":[id]
      }
      var token=localStorage.getItem('token');
      this.httpService.httpPostdeleteForever('notes/trashNotes',this.body,token).subscribe(res=>{
        console.log(res);
        this.deleteForever.emit();

      },error=>{
        console.log('error')
      })

    }
    
    
  }



import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {  HttpService} from '../../service/http/http.service'
import { MatSnackBar } from '@angular/material';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-more-btn',
  templateUrl: './more-btn.component.html',
  styleUrls: ['./more-btn.component.css']
})

export class MoreBtnComponent implements OnInit {
  title;
  note;
  id;
  notes=[];
  records={};
  labelBody={};
  body={
    "isDeleted":true,
    "noteIdList":[]
  }
  @Input() noteDetails;



  constructor(private httpService: HttpService,public snackBar: MatSnackBar) { }
  @Output() notesDelete=new EventEmitter();

  ngOnInit() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(res => {
      console.log("labels= ", res);
     
      // this.notes = (res['data'].details);
      for (var i = 0; i < res['data'].details.length; i++) {
        if (res['data']['details'][i].isDeleted == false) {
          this.notes.push(res['data']['details'][i])
        }
      }
     
    }, error => {
      console.log(error);
    })
    console.log("noteslabels=>",this.notes);
    
    

  }
  delete()       {
    var token = localStorage.getItem('token');
    console.log("delete");
    
    this.body={
    "isDeleted": true,
    "noteIdList": [this.noteDetails.id]
    }
    this.records = this.httpService.httpDeleteNote('notes/trashNotes',this.body, token).subscribe(result => {
    this.snackBar.open('Note deleted', 'Successfully', {
    duration: 3000,
    });
    console.log(this.noteDetails.id);
    this.notesDelete.emit();
    
    }, error => {
    console.log(error);
    this.snackBar.open('Note deletion', 'Failed', {
    duration: 3000,
    });
    });
    }
    addLabel(labelId){
      this.labelBody={
        "noteId":this.noteDetails.id,
        "lableId":labelId
      }
      this.httpService.httpAddNote('notes/'+this.noteDetails.id+'/addLabelToNotes/'+labelId+'/add',this.labelBody,localStorage.getItem('token')).subscribe(result=>{
        console.log(result);
        this.notesDelete.emit();
      },error=>{
        console.log(error);
        
      })
    }
    // removeLabel(labelId){
    //   this.labelBody={
    //     "noteId":this.noteDetails.id,
    //     "lableId":labelId
    //   }
    //   this.httpService.httpAddNote('notes/'+this.noteDetails.id+'/addLabelToNotes/'+labelId+'/remove',this.labelBody,localStorage.getItem('token')).subscribe(result=>{
    //     console.log(result);
    //   },error=>{
    //     console.log(error);
        
    //   })

    // }
   

}

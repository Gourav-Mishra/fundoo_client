import { Component, OnInit } from '@angular/core';
import{ HttpService} from '../../core/service/http/http.service'
import { Note} from '../../core/model/note'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
 private show=true;
 private records={};
 private notes:Note[]=[];
 private notesPin=[];
 private interval;


 constructor(private httpService:HttpService) { }

  ngOnInit() {
    this.getpin();
    this.getNotes();
    

  }
close(){
  if(!this.show){
    this.show=!this.show
  }
}
addNewEntry(){
if(event){
      this.getNotes();
      this.getpin();
      
}
}
  getNotes(){
    var token=localStorage.getItem('token');
    this.records= this.httpService.httpGetNotes('notes/getNotesList',token).subscribe(result =>{
    this.notes=[];
    var myData:Note[]=result['data']['data'];
      for(var i=myData.length-1;i>0;i--){
        if(myData[i].isDeleted==false && myData[i].isArchived==false && myData[i].isPined==false ){
         this.notes.push(myData[i])
        }
      }
     
       console.log(this.notes);
     },error=>{
       console.log(error);
     });

  }
  getpin(){
    var token=localStorage.getItem('token');
    this.records= this.httpService.httpGetNotes('notes/getNotesList',token).subscribe(result =>{
    this.notesPin=[];
    var myPin:Note[]=result['data']['data'];
      for(var i=0;i<myPin.length-1;i++){
        if(myPin[i].isDeleted==false && myPin[i].isArchived==false && myPin[i].isPined==true){
         this.notesPin.push(myPin[i])
        }
      }
    
       
     },error=>{
       
     });

  }
  
}

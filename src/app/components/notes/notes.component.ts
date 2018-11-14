import { Component, OnInit } from '@angular/core';
import{ HttpService} from '../../core/service/http/http.service'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
 show=true;
 records={};
  notes=[];
  notesPin=[];
  interval;


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
      for(var i=result['data']['data'].length-1;i>0;i--){
        if(result['data']['data'][i].isDeleted==false && result['data']['data'][i].isArchived==false &&result['data']['data'][i].isPined==false ){
         this.notes.push(result['data']['data'][i])
        }
       

      }
      // this.notes=result['data']['data'].reverse();
       console.log(this.notes);
     },error=>{
       console.log(error);
     });

  }
  getpin(){
    var token=localStorage.getItem('token');
    this.records= this.httpService.httpGetNotes('notes/getNotesList',token).subscribe(result =>{
    this.notesPin=[];
      for(var i=0;i<result['data']['data'].length-1;i++){
        if(result['data']['data'][i].isDeleted==false && result['data']['data'][i].isArchived==false && result['data']['data'][i].isPined==true){
         this.notesPin.push(result['data']['data'][i])
        }
      
        
       

      }
      // this.notes=result['data']['data'].reverse();
       
     },error=>{
       
     });

  }
  
}

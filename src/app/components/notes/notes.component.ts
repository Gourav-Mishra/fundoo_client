import { Component, OnInit } from '@angular/core';
import{ HttpService} from '../../service/http/http.service'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
 show=true;
 records={};
  notes=[];
  interval;


 constructor(private httpService:HttpService) { }

  ngOnInit() {
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
}
}
  getNotes(){
    var token=localStorage.getItem('token');
    this.records= this.httpService.httpGetNotes('notes/getNotesList',token).subscribe(result =>{
    this.notes=[];
      for(var i=result['data']['data'].length-1;i>0;i--){
        if(result['data']['data'][i].isDeleted==false){
         this.notes.push(result['data']['data'][i])
        }
       

      }
      // this.notes=result['data']['data'].reverse();
       console.log(this.notes);
     },error=>{
       console.log(error);
     });

  }
  
}

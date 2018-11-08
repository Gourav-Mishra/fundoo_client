import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  show=true;
  visible=true;;
  notes=[]
  record={};
  public title;
  public note;
  parentColor
body={
"title":"",
"description":""
}
@Output() onNewEntryAdded=new EventEmitter();
 
   constructor(private  httpService:HttpService,
    public snacBar:MatSnackBar) { }
 
   ngOnInit() {
 
   }
   changeMainBoxColor(event){
     if(event){
      this.parentColor=event;
      console.log(this.parentColor);
      
     }
   

   }

 close(){
   if(!this.show){
     this.show=!this.show;
     var token=localStorage.getItem('token');
     this.title=document.getElementById("title").innerHTML;
     this.note=document.getElementById("take-note").innerHTML;
     console.log(this.title);
     console.log(this.note);
     console.log('token',token);
     
     var note={
       'title':this.title,
       'description': this.note,
       'labelIdList':'',
       'checklist':'',
       "isPinned":'false',
       "color":this.parentColor
     };
     this.parentColor="#ffffff";
     this.record=this.httpService.httpAddNote('notes/addNotes',note,token).subscribe(result=>{
       this.snacBar.open("Notes Added","Sucessfull",{
         duration:3000,
       });
       this.onNewEntryAdded.emit({});
      
     },error=>{
       console.log(error);
       this.snacBar.open('notes addition ', 'Failed',{
         duration: 3000,
       })
     })

   }

 }
 array=[1,2,3];
 closeChecklist(){
   if(!this.visible){
     this.visible=!this.visible;
   }
 }
 textItem={
   'isChecked':false,
   'checkText':''
 }
//  nextLine(event){
//    if(event.keyCode==13 && this.textItem.checkText!=" "){
//      this.array.push(this.textItem.checkText);
//   }
//    this.textItem.checkText='';
//  }
 }
 
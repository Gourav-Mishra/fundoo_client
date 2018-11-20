import { Component, OnInit,Inject, Output,EventEmitter, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NoteCollectionComponent } from '../note-collection/note-collection.component';
import { HttpService } from "../../core/service/http/http.service";




export interface DialogData {
  id:string;
  title:string;
  description: string;
 
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  token=localStorage.getItem('token');
  checklist=false
  tempArray=[];
  @Output() updateNow=new EventEmitter();
  @Input() noteDetails
  labelBody={};
  body={};
  modifiedCheckList;
  status = 'open';
  itemName;
  newList: string;
  adding= false;
  addCheck=false;
  newData: { "itemName": string; "status": string; };
  constructor(
    public dialogRef: MatDialogRef<NoteCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private httpService: HttpService) {}
    
     
  ngOnInit() {
  }
  onNoClick(): void {
    if(this.checklist==false){
   
   this.body={
     "noteId":[this.data.id],
     "title": document.getElementById('title1').innerHTML,
     "description": document.getElementById('description1').innerHTML
   }
   this.httpService.httpUpdateNote('notes/updateNotes',this.body,this.token).subscribe(result=>{
     this.dialogRef.close();
     this.updateNow.emit();
   })
  }
  else{
    var apiData={
      "itemName": this.modifiedCheckList.itemName,
      "status":this.modifiedCheckList.status
  }
  var url = "/notes/" +this.data['id']+ "/checklist/" + this.modifiedCheckList.id + "/update";
  this.httpService.postNotes(url, JSON.stringify(apiData), this.token).subscribe(response => {
    this.dialogRef.close();

  },
  error => {
  })
}
}

addList(event){
  if(this.newList!=""){
    this.adding = true;
  }
 else{
    this.adding = false;
 }
  if (event.code == "Enter") {
    if(this.addCheck==true){
      this.status="close";
    }
    else{
      this.status="open"
    }
    this.newData={
      "itemName":this.newList,
      "status":this.status
    }
var url = "/notes/" + this.data['id'] + "/checklist/add";

  this.httpService.postNotes(url, this.newData, this.token)
  .subscribe(response => {
    console.log(response);
    this.newList=null;
    this.addCheck=false;
    this.adding=false;
    console.log(response['data'].details);
    
    this.tempArray.push(response['data'].details)
  })
}
}

 

  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.onNoClick();
  }
  editing(edited,event){
      
    console.log(edited);
    if(event.code=="Enter"){
    this.modifiedCheckList=edited;
    this.onNoClick();
    }
    
  }
  public removedList;
  removeList(checklist){
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    var url = "/notes/" + this.data['id']+ "/checklist/" + this.removedList.id + "/remove";

    this.httpService.postNotes(url,null,this.token).subscribe((response)=>{
      for(var i=0;i<this.tempArray.length;i++){
        if(this.tempArray[i].id==this.removedList.id){
          this.tempArray.splice(i,1)
        }
      }
    })
  }
  
  
}

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
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Output() updateNow=new EventEmitter();
  @Input() noteDetails
  labelBody={};
  body={};
  constructor(
    public dialogRef: MatDialogRef<NoteCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private httpService: HttpService) {}
    
     
  ngOnInit() {
  }
  onNoClick(id): void {
   var token=localStorage.getItem('token');
   this.body={
     "noteId":[this.data.id],
     "title": document.getElementById('title1').innerHTML,
     "description": document.getElementById('description1').innerHTML
   }
   this.httpService.httpUpdateNote('notes/updateNotes',this.body,token).subscribe(result=>{
     this.dialogRef.close();
     this.updateNow.emit();
   })
  }
  
  
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import{ HttpService} from '../../core/service/http/http.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { GeneralService } from 'src/app/core/service/general.service';


@Component({
  selector: 'app-note-collection',
  templateUrl: './note-collection.component.html',
  styleUrls: ['./note-collection.component.css']
})
export class NoteCollectionComponent implements OnInit {
  records={};
  notes=[];
  interval;
  labelBody={};
@Input() notesArray;
@Input() searchNote;
@Output() deleteParent=new EventEmitter();
@Output() changeColorAgain=new EventEmitter();

  constructor(private httpService:HttpService,public dialog: MatDialog,
    private data:GeneralService
    ) { }

  ngOnInit() {
this.viewCard();
  }
  toggle=false;
  viewCard(){
    this.data.currentMessage.subscribe(message =>{
      this.toggle=message;
    })
  }
  deleteDone($event){
this.deleteParent.emit();
  }
  changeColor($event){
    this.changeColorAgain.emit();
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '440px',
      // height:'250px',
      data:notes
      
    });

    dialogRef.afterClosed().subscribe(result => {
     this.deleteParent.emit({

     })
    });
  }

  removeLabel(id,labelId){
    this.labelBody={
      "noteId":id,
      "lableId":labelId
    }
    this.httpService.httpAddNote('notes/'+id+'/addLabelToNotes/'+labelId+'/remove',this.labelBody,localStorage.getItem('token')).subscribe(result=>{
      console.log(result);
      this.deleteParent.emit();
    },error=>{
      console.log(error);
      
    })

  }
 

}


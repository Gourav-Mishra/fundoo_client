import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { GeneralService } from 'src/app/core/service/data/general.service';


@Component({
  selector: 'app-note-collection',
  templateUrl: './note-collection.component.html',
  styleUrls: ['./note-collection.component.scss']
})
export class NoteCollectionComponent implements OnInit {
  records = {};
  notes = [];
  interval;
  labelBody = {};
  public modifiedCheckList;
  @Input() notesArray;
  @Input() searchNote;
  @Output() deleteParent = new EventEmitter();
  @Output() changeColorAgain = new EventEmitter();
  @Output() unArchiveParent = new EventEmitter();

  constructor(private httpService: HttpService, public dialog: MatDialog,
    private data: GeneralService
  ) { }
// public todayDate=new Date();
// public tomorrowDate=new Date();

  ngOnInit() {
    this.viewCard();
    // this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);

  }
  toggle = false;
  viewCard() {
    this.data.currentMessage.subscribe(message => {
      this.toggle = message;
    })
  }
  deleteDone($event) {
    this.deleteParent.emit();
  }
  changeColor($event) {
    this.changeColorAgain.emit();
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '440px',
      data: notes

    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteParent.emit({

      })
    });
  }

  removeLabel(id, labelId) {
    this.labelBody = {
      "noteId": id,
      "lableId": labelId
    }
    this.httpService.httpAddNote('notes/' + id + '/addLabelToNotes/' + labelId + '/remove', this.labelBody, localStorage.getItem('token')).subscribe(result => {
      console.log(result);
      this.deleteParent.emit();
    }, error => {
      console.log(error);

    })

  }
  public reminderBody={}
  public token=localStorage.getItem('token')
  removeReminder(id){
    this.reminderBody={
      "noteIdList":[id]
    }
    this.httpService.httpArchiveNote('notes/removeReminderNotes',this.reminderBody,this.token).subscribe(result=>{
      this.deleteParent.emit({

      })
    })


  }
  addReminder($event){
    this.deleteParent.emit({

    })

  }

unArchive(event){
this.unArchiveParent.emit(event)
}
archiveParent(event){
  this.deleteParent.emit({

  })
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
  this.updatelist(note.id);
}
updatelist(id) {
  var apiData = {
    "itemName": this.modifiedCheckList.itemName,
    "status": this.modifiedCheckList.status
  }
  var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
  this.httpService.postNotes(url, JSON.stringify(apiData), localStorage.getItem('token')).subscribe(response => {
    console.log(response);

  })
}

public todayDate= new Date();
public tomorrowDate= new Date(this.todayDate.getFullYear(),this.todayDate.getMonth(), (this.todayDate.getDate()+1))
public currDate= new Date(); 
checkReminder(date){
var showTime=new Date(date).getTime();
var currTime=this.currDate.getTime();
if(showTime<currTime){
return true
}else return false
}
}

